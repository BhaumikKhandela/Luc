"use client";
import FormGenerator from "@/components/global/form-generator";
import { Loader } from "@/components/global/loader";
import { Button } from "@/components/ui/button";
import { useAIChat } from "@/hooks/useAIChat";
import { Send } from "lucide-react";

export const AiChatbot = ({ videoId }: { videoId: string }) => {
  const { register, onFormSubmit, isPending, reset, errors, allChats } =
    useAIChat(videoId);

  return (
    <div className="p-5 bg-[#1D1D1D] rounded-xl flex flex-col gap-y-10 h-[80vh]">
      <div className="flex-1 overflow-auto space-y-3 p-2">
        {allChats.map((chat, index) => (
          <div key={index + 1}>
            <div className="w-full flex justify-end">
              {chat.variables.question}
            </div>

            <div className="w-full flex justify-start">
              {chat.status === "success" && chat.data && chat.data.answer ? (
                <p className="p-2">{chat.data.answer}</p>
              ) : (
                <div className="w-5 h-5 p-2 rounded-full bg-white animate-pulse"></div>
              )}
            </div>
          </div>
        ))}
      </div>
      <form
        className="relative w-full"
        onSubmit={(e) => {
          onFormSubmit(e);
          reset();
        }}
      >
        <FormGenerator
          register={register}
          errors={errors}
          type="text"
          inputType="textarea"
          name="question"
          placeholder="Ask anything related to this video."
          lines={20}
        />
        <Button
          className="p-0 bg-transparent absolute top-[1px] right-3 hover:bg-transparent"
          type="submit"
        >
          <Loader state={isPending}>
            <Send
              className="text-white/50 cursor-pointer hover:text-white/80"
              size={18}
            ></Send>
          </Loader>
        </Button>
      </form>
    </div>
  );
};
