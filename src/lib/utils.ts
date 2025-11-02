import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { client } from "@/lib/prisma";
import { Pinecone } from "@pinecone-database/pinecone";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const truncateString = (string: string, slice?: number) => {
  return string.slice(0, slice || 30) + "...";
};


export const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
});

export async function getTranscript(videoId: string): Promise<string> {
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

export function chunkText(text: string, maxLen = 800): string[] {
 
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

export async function embedChunks(chunks: string[], videoId: string) {

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

export async function upsertToPinecone(vectors: number[][], chunks: string[], videoId: string) {
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