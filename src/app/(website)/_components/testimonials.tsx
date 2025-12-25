"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export const Testimonials = () => {
  return (
    <section className="py-24">
      <Carousel opts={{ loop: true }} className="max-w-5xl mx-auto">
        <CarouselContent>
          {testimonials.map((t, index) => (
            <CarouselItem key={index}>
              <div className="bg-blue-50 rounded-[48px] px-16 py-20 text-center relative">
                {/* Company */}
                <p className="text-blue-700 font-semibold mb-6">{t.company}</p>

                {/* Quote */}
                <blockquote className="text-3xl font-bold text-gray-900 leading-snug max-w-3xl mx-auto">
                  “{t.quote}”
                </blockquote>

                {/* Author */}
                <div className="flex items-center justify-center gap-4 mt-10">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={t.avatar} />
                    <AvatarFallback>{t.name.charAt(0)}</AvatarFallback>
                  </Avatar>

                  <div className="text-left">
                    <p className="font-semibold">{t.name}</p>
                    <p className="text-sm text-gray-600">{t.role}</p>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Controls */}
        <CarouselPrevious className="left-[-64px]" />
        <CarouselNext className="right-[-64px]" />
      </Carousel>
    </section>
  );
};
const testimonials = [
  {
    company: "Typeform",
    quote:
      "Opal amplifies my communication with the team like nothing else has. It's a communication tool that should be in every executive's toolbox.",
    name: "David Okunev",
    role: "Co-CEO, Typeform",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    company: "Slack",
    quote:
      "Using Opal has completely changed how we collaborate asynchronously. Fewer meetings, clearer communication.",
    name: "Sarah Johnson",
    role: "Product Lead, Slack",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    company: "Notion",
    quote:
      "Opal helps us explain complex ideas quickly and clearly. It's now part of our daily workflow.",
    name: "Alex Chen",
    role: "Design Manager, Notion",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
  },
];
