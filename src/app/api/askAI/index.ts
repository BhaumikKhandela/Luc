import { Pinecone } from "@pinecone-database/pinecone";
import axios from "axios";
import { NextRequest } from "next/server";
import { Groq } from "groq-sdk";


const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
});

const groq = new Groq({
    apiKey: process.env.OPENAI_API_KEY!,
});



export async function POST( req: NextRequest) {
    try{
        
        const { videoId,messages } = await req.json();

        const question = messages[messages.length - 1].content;

        const embedRes = await axios.post('https://api.pinecone.io/embeddings', {
            model: "llama-text-embed-v2",
            input: question
        },
    {
        headers: {
            'Api-Key': process.env.PINECONE_API_KEY!,
            'Content-Type': 'application/json'
        }
    });

    const vector = embedRes.data.data[0].embedding;

    const index = pinecone.Index(process.env.PINECONE_INDEX_NAME!);
    const results = await index.query({
        vector,
        topK: 5,
        filter: { videoId: videoId },
        includeMetadata: true
    });

    const context = results.matches.map((m) => m.metadata?.text).join('\n');

    const chatMessages = [
        {role: 'system', content: 'You are a helpful assistant answering based on video transcripts.'},
        {role: 'system', content: `Context: ${context}`},
        ...messages
    ]

    const completion = await groq.chat.completions.create({
        model: 'llama-3.1-8b-instant',
        messages: chatMessages,
        stream: true
    });



    } catch (error) {

    }
}