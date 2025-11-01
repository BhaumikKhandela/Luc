import { client } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, context: { params: Promise<{ id: string}>}) {

    try{

     //WIRE UP AI AGENT
    const body = await req.json();
    const { id } = await context.params;

    const content = JSON.parse(body.content);

    const transcribed = await client.video.update({
        where:{
            userId: id,
            source: body.filename,
        },
        data: {
            title: content.title,
            description: content.summary,
            summary: content.transcript
        }
    });

    if(transcribed){
        console.log('🟢 storing in kb');
        
       return NextResponse.json({ status: 200, message: 'Transcription stored successfully' });
    }
    } catch (error) {
        console.error('Error during transcription:', error);
        return NextResponse.json({ status: 500, message: 'Internal Server Error' });
    }

}