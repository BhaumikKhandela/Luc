import { client } from "@/lib/prisma";
import { Pinecone } from "@pinecone-database/pinecone";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
});

async function getTranscript(videoId: string): Promise<string> {
    try{
    const transcript = await client.video.findUnique({
        where: {
            id: videoId
        },
        select: {
            summary: true
        }
    });
    return transcript?.summary || '';
} catch (error) {
    console.error('Error fetching transcript:', error);
    return '';
}
}

function chunkText(text: string, maxLen = 800): string[] {
 
    const sentences = text.split(/(?<=[.?!])\s+/);

    const chunks: string[] = [];
    let current = "";

    for (const sentence of sentences) {
        if ((current + sentence).trim().length > maxLen) {
            chunks.push(current.trim());
            current = sentence;
        } else {
            current += " " + sentence;
        }
    }

    if (current.trim()) chunks.push(current.trim());

    return chunks;

}

async function embedChunks(chunks: string[], videoId: string) {

    try{
    const res = await axios.post('https://api.pinecone.io/embeddings', {
        model: "llama-text-embed-v2",
        input: chunks
    },
    {
        headers: {
            'Api-Key': process.env.PINECONE_API_KEY!,
            'Content-Type': 'application/json'
        }
    });

    return res.data.data.map((d: any) => d.values);
    } catch(error) {
        console.error('An error occurred while embedding', error);
        return null;
    }
}

async function upsertToPinecone(vectors: number[][], chunks: string[], videoId: string) {
    try{
    const index = pinecone.Index(process.env.PINECONE_INDEX_NAME!);

    const records = chunks.map((chunk, i) => ({
        id: uuidv4(),
        values: vectors[i],
        metadata: {
            videoId,
            text: chunk
        }
    }));

   const result = await index.upsert(records);
   return result;
} catch(error){
    console.error('Error occurred while upserting to pinecone', error);
    return null;
}
}

export async function POST(req: NextRequest, context: { params: Promise<{id: string}>}){
    const { id } = await context.params;

    const transcript = await getTranscript(id);

    if(!transcript){
        return NextResponse.json({
            status: 404,
            message: 'Transcript not found'
        })
    }

    const chunks = chunkText(transcript);
    const embeddings = await embedChunks(chunks, id);
    if(!embeddings){
        return NextResponse.json({
            status: 500,
            message: 'Failed at embedding'
        });
    }
    const result = await upsertToPinecone(embeddings, chunks, id);

    if(!result){
        return {
            status: 500,
            message: 'Failed at upsert'
        }
    }

    return { status: 201, message: 'Embedding created successfully' }


}