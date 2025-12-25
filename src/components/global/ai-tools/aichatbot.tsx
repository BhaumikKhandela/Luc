"use client";
import FormGenerator from "@/components/global/form-generator";
import { Loader } from "@/components/global/loader";
import { Button } from "@/components/ui/button";
import { useAIChat } from "@/hooks/useAIChat";
import { Bot, Send, User } from "lucide-react";
import React from "react";

// Typing Animation Component
const TypingText = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = React.useState("");
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 20); // Adjust speed here (lower = faster)

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  return (
    <p className="text-white/90 text-sm leading-relaxed">
      {displayedText}
      {currentIndex < text.length && (
        <span className="inline-block w-1 h-4 bg-purple-500 ml-0.5 animate-pulse" />
      )}
    </p>
  );
};

export const AiChatbot = ({ videoId }: { videoId: string }) => {
  const { register, onFormSubmit, isPending, reset, errors, allChats } =
    useAIChat(videoId);

  const chatEndRef = React.useRef<HTMLDivElement>(null);
  const chatContainerRef = React.useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  React.useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [allChats]);

  console.log(allChats);
  return (
    <div className="p-5 bg-[#1D1D1D] rounded-xl flex flex-col gap-y-4 h-[80vh] w-full">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-white/10">
        <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
          <Bot className="text-white" size={20} />
        </div>
        <div>
          <h3 className="text-white font-semibold text-sm">AI Assistant</h3>
          <p className="text-white/50 text-xs">
            Ask me anything about this video
          </p>
        </div>
      </div>

      {/* Chat Messages */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-auto space-y-4 p-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
      >
        {allChats.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <div className="p-4 bg-white/5 rounded-full mb-4">
              <Bot className="text-white/30" size={32} />
            </div>
            <p className="text-white/50 text-sm">
              No messages yet. Start a conversation!
            </p>
          </div>
        ) : (
          allChats.map((chat, index) => (
            <div key={index} className="space-y-4">
              {/* User Message */}
              <div className="w-full flex justify-end">
                <div className="flex items-start gap-2 max-w-[80%]">
                  <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl rounded-tr-sm px-4 py-3 shadow-lg">
                    <p className="text-white text-sm leading-relaxed">
                      {chat.variables.question}
                    </p>
                  </div>
                  <div className="p-1.5 bg-white/10 rounded-full mt-1">
                    <User className="text-white" size={14} />
                  </div>
                </div>
              </div>

              {/* AI Response */}
              <div className="w-full flex justify-start">
                <div className="flex items-start gap-2 max-w-[85%]">
                  <div className="p-1.5 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mt-1">
                    <Bot className="text-white" size={14} />
                  </div>
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl rounded-tl-sm px-4 py-3 shadow-lg">
                    {chat.status === "success" &&
                    chat.data &&
                    chat.data.answer ? (
                      <TypingText text={chat.data.answer} />
                    ) : (
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 rounded-full bg-purple-500 animate-bounce [animation-delay:-0.3s]"></div>
                          <div className="w-2 h-2 rounded-full bg-purple-500 animate-bounce [animation-delay:-0.15s]"></div>
                          <div className="w-2 h-2 rounded-full bg-purple-500 animate-bounce"></div>
                        </div>
                        <span className="text-white/50 text-xs">
                          Thinking...
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
        {/* Invisible div for auto-scroll target */}
        <div ref={chatEndRef} />
      </div>

      {/* Input Form */}
      <form
        className="relative"
        onSubmit={(e) => {
          onFormSubmit(e);
          reset();
        }}
      >
        <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3 focus-within:border-purple-500/50 transition-colors">
          <FormGenerator
            register={register}
            errors={errors}
            type="text"
            inputType="textarea"
            name="question"
            placeholder="Ask anything related to this video..."
            lines={3}
          />
          <Button
            className="absolute bottom-4 right-4 p-2.5 bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-lg transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={isPending}
          >
            <Loader state={isPending}>
              <Send className="text-white" size={16} />
            </Loader>
          </Button>
        </div>
      </form>
    </div>
  );
};
