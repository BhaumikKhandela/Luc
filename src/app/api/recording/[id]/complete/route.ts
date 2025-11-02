import { client } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, context: { params: Promise<{id: string}>}){

    try{

    const body = await req.json();

    const { id } = await context.params;

    const completeProcessing = await client.video.update({
        where:{
            userId: id,
            source: body.filename,
        },
        data:{
            processing: false
        }
    });

    if(completeProcessing){
        console.log('🟢 recording processing completed');
        return NextResponse.json({ status: 200, message: 'Recording processing completed', videoId: completeProcessing.id });
    }

    return NextResponse.json({ status: 400, message: 'Oops! something went wrong.' });

    } catch(error){
        console.error('🔴 Error completing recording processing:', error);

        return NextResponse.json({ status: 500, message: 'Internal Server Error' });
    }
}