import { chunkText, embedChunks, getTranscript, upsertToPinecone } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(req: NextResponse,
  context: { params: Promise<{ id: string }> }){
    
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