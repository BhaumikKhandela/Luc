import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import React, { useState } from "react";
import { Loader } from "../loader";
import { Bot, FileTextIcon, Pencil, StarsIcon } from "lucide-react";
import PaymentButton from "../payment-button";
import { useAuth } from "@clerk/nextjs";
import { AiChatbot } from "./aichatbot";
import { useTrial } from "@/hooks/useTrial";

type Props = {
  plan: "PRO" | "FREE";
  trial: boolean;
  videoId: string;
  clerkId: string | undefined;
  author: boolean | undefined;
};

const AiTools = ({ plan, trial, videoId, clerkId, author }: Props) => {
  //WIP: setup the ai hook

  const { isPending, mutate } = useTrial();
  return (
    <TabsContent value="Ai tools">
      {" "}
      <div className="p-5 bg-[#1D1D1D] rounded-xl ">
        <div className="flex flex-col items-center gap-10">
          <div className="">
            {author && plan === "FREE" ? (
              <div className="flex items-center justify-between gap-4">
                <Button
                  className=" mt-2 text-sm"
                  onClick={() => {
                    mutate(videoId);
                  }}
                >
                  <Loader state={isPending} color="#000">
                    Try now
                  </Loader>
                </Button>
                <div className="mt-2">
                  <PaymentButton buttonName="Pay Now" />
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </div>

          {/* <div className="flex justify-between ">
          <div className="flex flex-col items-center text-center text-[#BDBDBD] gap-y-2 text-sm">
            <FaVideo width="36" height="36" />
            Generate Video
          </div>
          <div className="flex flex-col items-center text-center text-[#BDBDBD] gap-y-2 text-sm">
            <DownloadIcon size={36} className="text-[#565656]" />
            Download Video <br /> File
          </div>
        </div> */}

          {author && plan === "FREE" ? (
            <div className="border-[1px] rounded-xl  p-4 gap-4 flex flex-col bg-[#1b0f1b7f]">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold text-[#a22fe0]"> Opal Ai</h2>
                <StarsIcon color="#a22fe0" fill="#a22fe0" />
              </div>
              <div className="flex gap-2 items-start">
                <div className="p-2 rounded-full border-[#2d2d2d] border-[2px] bg-[#2b2b2b]">
                  <Pencil color="#a22fe0" />
                </div>

                <div className="flex flex-col">
                  <h3 className="font-semibold">Summary</h3>
                  <p className="text-muted-foreground text-sm">
                    Generate a description for your video using AI.
                  </p>
                </div>
              </div>
              <div className="flex gap-2 items-start">
                <div className="p-2 rounded-full border-[#2d2d2d] border-[2px] bg-[#2b2b2b]">
                  <FileTextIcon color="#a22fe0" />
                </div>
                <div className="flex flex-col">
                  <h3 className="font-semibold">Summary</h3>
                  <p className="text-muted-foreground text-sm">
                    Generate a description for your video using AI.
                  </p>
                </div>
              </div>
              <div className="flex gap-2 items-start">
                <div className="p-2 rounded-full border-[#2d2d2d] border-[2px] bg-[#2b2b2b]">
                  <Bot color="#a22fe0" />
                </div>
                <div className="flex flex-col">
                  <h3 className="font-semibold">AI Agent</h3>
                  <p className="text-muted-foreground text-sm">
                    Viewers can ask questions on your video and ai agent will
                    respond.
                  </p>
                </div>
              </div>
            </div>
          ) : plan === "FREE" ? (
            <div>AI features are not enabled yet for this video.</div>
          ) : (
            <AiChatbot videoId={videoId} />
          )}
        </div>
      </div>
    </TabsContent>
  );
};

export default AiTools;
