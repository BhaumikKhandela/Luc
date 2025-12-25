import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  return (
    <div className="my-20">
      <div className="">
        <h1 className="text-8xl text-[#cacaca] font-bold my-2 flex justify-center">
          Record.Share.<span className="italic">Done</span>
        </h1>
        <div className="flex justify-center items-center">
             <p className="text-lg text-center">
          Blazing fast, AI-powered Video Messaging that makes busy team look
          like pro.
        </p>
        </div>
       
      </div>
      <div className="flex justify-center my-10 gap-5">
        <Button size={"lg"} className="rounded-full text-lg">
          Get Started
        </Button>
         <Button size={"lg"} className="rounded-full text-lg">
          Download Opal 
        </Button>
      </div>
      <div className="w-full flex items-center justify-center">
        <img src="/herosection.png" className="w-5/6 rounded-lg"/>
      </div>
    </div>
  );
};
