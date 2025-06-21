import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import React from "react";
import { Loader } from "../loader";
import { FaVideo } from "react-icons/fa6";
import {
  Bot,
  DownloadIcon,
  FileTextIcon,
  Pencil,
  StarsIcon,
} from "lucide-react";

type Props = {
  plan: "PRO" | "FREE";
  trial: boolean;
  videoId: string;
};

const AiTools = ({ plan, trial, videoId }: Props) => {
  //WIP: setup the ai hook
  return (
    <TabsContent value="Ai tools">
      {" "}
      <div className="p-5 bg-[#1D1D1D] rounded-xl flex flex-col gap-y-10">
        <div className="flex flex-col items-center gap-10">
          <div className="flex justify-evenly items-center gap-4">
            <div className="w-8/12">
              <h2 className="text-3xl font-bold">Ai Tools</h2>
              <p className="text-[#BDBDBD] ">
                Taking your video to the next <br /> step with power of AI!
              </p>
            </div>

            {plan === "PRO" ? (
              <div className="flex items-center justify-between gap-4">
                <Button className=" mt-2 text-sm">
                  <Loader state={false} color="#000">
                    Try now
                  </Loader>
                </Button>
                {/* {WIP: Pay button} */}

                <Button className="mt-2 text-sm" variant={"secondary"}>
                  <Loader state={false} color="#000">
                    Pay now
                  </Loader>
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-between gap-4">
                <Button className=" mt-2 text-sm">
                  <Loader state={false} color="#000">
                    Generate Now
                  </Loader>
                </Button>
              </div>
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
        </div>
      </div>
    </TabsContent>
  );
};

export default AiTools;
