import { Button } from "@/components/ui/button";
import {
  ArrowDownLeftFromSquareIcon,
  ArrowRight,
  ArrowUpRightFromSquareIcon,
} from "lucide-react";
import Link from "next/link";

export const FeaturesSection = () => {
  return (
    <section className="py-20">
      <div>
        <h2 className="text-5xl text-[#cacaca] font-bold my-2 flex justify-center">
          The Easiest screen recorder you'll ever use
        </h2>
        <div className="flex justify-center items-center py-5">
          <p className="text-lg text-center">
            Record in a few clicks. Share anywhere. Collaborate better.
          </p>
        </div>
      </div>
      <div>
        <div className="max-w-6xl mx-auto flex justify-center items-center gap-10 py-56">
          {/* Left */}
          <div className="flex gap-5 max-w-xl">
            <div className="h-5 w-5 bg-red-500 animate-pulse rounded-full my-5"></div>
            <div>
              <h3 className="text-4xl text-[#cacaca] py-5 font-bold">
                Lightning fast screen recording
              </h3>
              <p className="text-lg">
                Easily <span className="underline">record your screen</span> and
                camera.<br></br> Record on any device using Opal's desktop app.
              </p>
              <Button className="rounded-full my-5">Download now</Button>
            </div>
          </div>
          {/* Right */}
          <div className="w-1/2">
            <img src="/planning.png" className="rounded-2xl" />
          </div>
        </div>
      </div>
      <div className="">
        <div>
          <h2 className="text-5xl text-[#cacaca] font-bold my-2 flex justify-center">
            So much more than a screen recorder
          </h2>
        </div>
        <div className="max-w-6xl mx-auto flex justify-center items-center gap-10 py-56">
          <div className="w-1/2">
            <img src="/sharing.png" className="rounded-2xl" />
          </div>
          <div className="max-w-xl">
            <h3 className="text-4xl text-[#cacaca] py-5 font-bold">
              Share or embed video anywhere you work
            </h3>
            <p className="text-lg">
              From Google Workspace to Slack, Loom videos seamlessly integrate
              with hundreds of tools you use every day.
            </p>
            <div className="pt-5">
              <Link href="#" className="flex gap-2">
                <span className="font-bold text-lg">Start Sharing</span>{" "}
                <ArrowUpRightFromSquareIcon />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="max-w-6xl mx-auto flex justify-center items-center gap-10 py-56">
          {/* Left */}
          <div className=" max-w-xl">
            <div className="flex flex-col justify-center items-center">
              <h3 className="text-4xl text-[#cacaca] py-5 font-bold w-3/4">
                Engage and connect with video
              </h3>
              <p className="text-lg w-3/4">
                Easily collaborate by adding emojis, comments, tasks and CTAs to
                your video message. Empower remote teams to communicate better
                across timezones using transcripts and captions in 50+ languages
              </p>
              <div className="pt-5 flex w-3/4">
                <Link href="#" className="flex gap-2">
                  <span className="font-bold text-lg">Connect over video</span>{" "}
                  <ArrowUpRightFromSquareIcon />
                </Link>
              </div>
            </div>
          </div>
          {/* Right */}
          <div className="w-1/2">
            <img src="/coding.png" className="rounded-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
};
