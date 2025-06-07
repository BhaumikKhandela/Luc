import { Button } from "@/components/ui/button";
import { FaLinkedin } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";
import { BsBoxFill, BsFillBoxFill, BsTwitterX } from "react-icons/bs";
import { LuPhone } from "react-icons/lu";
import { FaWebflow } from "react-icons/fa6";
import { SlLocationPin } from "react-icons/sl";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { RiStarSFill } from "react-icons/ri";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div>
      <main className="flex min-h-screen flex-col">
        {/* Hero section */}
        <section className="bg-black h-screen  w-full text-white font-bold py-10 px-5">
          <div className="flex h-full justify-center  flex-col w-1/2 px-5">
            <h1 className="text-5xl text-start p-5 leading-relaxed">
              Capture and Share Videos Instantly with AI
            </h1>
            <p className="text-sm text-white text-start font-light p-5">
              Transform your communication with our innovative web application.
              Record, edit and share engaging video in seconds to connect with
              your prospects like never before
            </p>
            <div className="flex gap-2 p-10">
              <Button
                variant={"secondary"}
                size={"lg"}
                className="bg-white text-black hover:text-red-600 flex items-center gap-1 group transition-all duration-500 ease-in-out"
              >
                <span className="transform transition-transform duration-500 ease-in-out group-hover:-translate-x-2">
                  Record
                </span>
                <GoDotFill className="hidden group-hover:block group-hover:animate-pulse transition-all duration-500 ease-in-out" />
              </Button>
              <Button variant={"secondary"} size={"lg"}>
                Learn More
              </Button>
            </div>
          </div>
        </section>
        {/* Features section */}
        <section className="bg-white h-screen">
          <div className="w-full">
            <h2 className="flex justify-center items-center text-black text-5xl text-center font-extrabold leading-snug my-16">
              Transform your Communication with AI powered Video Recorder
            </h2>
          </div>
          <div className="flex my-40  gap-5">
            {features.map((data, index) => (
              <div key={`${index + 1}`} className="flex-1 px-2">
                <div className="w-full flex justify-center items-center">
                  {data.icon}
                </div>
                <h2 className="text-black text-2xl text-center w-full px-2 py-3 font-semibold min-h-[60px]">
                  {data.title}
                </h2>
                <p className="text-black font-light text-sm text-center w-full px-2 min-h-[80px] ">
                  {data.description}
                </p>
                <div className="w-full flex justify-center p-5">
                  <Button>Learn More {">"}</Button>
                </div>
              </div>
            ))}
          </div>
        </section>
        {/* Product Section */}
        <section className="h-screen bg-white">
          <div className="h-full w-full flex flex-col justify-center px-5 ">
            <h2 className="text-4xl w-1/2 font-extrabold leading-snug text-black text-start">
              Unlock the Power of Instant Video Communication with Our AI Driven
              Platform
            </h2>
            <p className="text-start px-2 py-10 text-lg text-black w-1/2">
              Save valuable time by recording and sharing videos in an instant.
              Enhance engagement with prospects through personalized,
              AI-enhanced content that resonates.
            </p>
            <div className="flex flex-col gap-10">
              <div className="flex gap-2">
                <BsBoxFill className="text-black " size={20}></BsBoxFill>
                <h3 className="text-black text-sm font-semibold">
                  Streamlined Video creation process saves your time.
                </h3>
              </div>
              <div className="flex gap-2">
                <BsBoxFill className="text-black" size={20}></BsBoxFill>
                <h3 className="text-black text-sm font-semibold">
                  Boost engagement with personalized video message
                </h3>
              </div>
              <div className="flex gap-2">
                <BsBoxFill className="text-black " size={20}></BsBoxFill>
                <h3 className="text-black text-sm font-semibold">
                  Levarage AI to enhance your content
                </h3>
              </div>
            </div>
          </div>
        </section>
        {/* Testimonials and Trial Offer */}
        <section className="bg-white h-screen w-full">
          <div className="h-1/2 w-full">
            <div className="w-full flex items-center justify-center">
              <div className="flex gap-x-0.5 w-fit">
                <RiStarSFill className="text-black" size={30} />
                <RiStarSFill className="text-black" size={30} />
                <RiStarSFill className="text-black" size={30} />
                <RiStarSFill className="text-black" size={30} />
                <RiStarSFill className="text-black" size={30} />
              </div>
            </div>
            <div className=" w-[800px] mx-auto text-center my-10 leading-snug ">
              <h2 className="text-black text-2xl font-bold">
                "This platform tansformed the way how I connect with my clients.
                The ease fo sharing videos has elevated my sales process
                immensely!"
              </h2>
            </div>
            <div className="flex w-full justify-center">
              <div className="p-10 flex flex-col gap-5  w-1/4  border-r-2 ml-5">
                <h3 className="text-lg font-semibold text-start text-black">
                  Jane Doe
                </h3>
                <span className="text-gray-700 text-lg">
                  Sales Manager, TechCorp
                </span>
              </div>
              <div className="p-10 flex  gap-5  w-1/4  ">
                <FaWebflow className="text-black" size={40} />
                <span className="text-gray-700 text-xl mt-1">Webflow</span>
              </div>
            </div>
          </div>
          <div className="h-1/2 w-full flex justify-center my-10">
            <div className="w-3/4 border h-fit py-5">
              <h2 className="text-black text-4xl font-bold leading-snug text-start p-5 w-1/2">
                Transform Your Outreach Today
              </h2>
              <p className="text-gray-700 text-normal font-semibold text-start p-5 w-3/4">
                Experience the power of AI-driven video sharing. Sign Up for
                your free trial now!
              </p>
              <div className="flex gap-2 p-5">
                <Button variant={"secondary"} size={"lg"}>
                  Get Started
                </Button>
                <Button
                  className="bg-white text-black hover:text-white border"
                  variant={"secondary"}
                  size={"lg"}
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>
        {/* Team Section */}
        <section className="bg-white h-screen">
          <div className="w-full h-fit py-20">
            <p className="text-black text-lg text-center py-5">Meet</p>
            <h2 className="text-black text-5xl text-center font-bold">
              Our Team
            </h2>
            <p className="text-gray-700 text-center py-5">
              Passionate individuals dedicated to innovation and excellence.
            </p>
          </div>
          <div className=" grid grid-cols-4 gap-5 py-10 px-5">
            {teamMembers.map((member, index) => (
              <div key={`${index + 1}`} className="m-2 ">
                <h3 className="text-black text-lg text-center text-semibold">
                  {member.name}
                </h3>
                <h4 className="text-gray-700 text-normal text-center">
                  {member.role}
                </h4>
                <p className="text-black text-sm text-center my-5">
                  {member.description}
                </p>
                <div className="flex justify-center items-center gap-2 text-black">
                  <a
                    href={`${member.twitterLink}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <BsTwitterX size={20}></BsTwitterX>
                  </a>
                  <a
                    href={`${member.instagramLink}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaSquareInstagram size={20} />
                  </a>
                  <a
                    href={`${member.linkedIn}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLinkedin size={20} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
        {/* Contact Section */}
        <section className="bg-white h-screen">
          <div className="grid grid-cols-3 my-60">
            {contactInfo.map((contact, index) => (
              <div key={`${index + 1}`}>
                <div className="w-full flex justify-center ">
                  {contact.icon}
                </div>
                <h3 className="text-black font-bold  text-3xl text-center p-5">
                  {contact.via}
                </h3>
                <p className="text-gray-700 text-center text-sm">
                  {contact.description}
                </p>
                <h4 className=" text-black text-center p-2">
                  <span className="underline">{contact.value}</span>
                </h4>
              </div>
            ))}
          </div>
        </section>
      </main>
      <footer className="bg-white">
        <div className="flex justify-center items-center bg-white h-screen">
          <div className="h-fit w-4/5 border-2 p-10 grid grid-cols-7 gap-5">
            {/* Logo Section */}
            <div className="col-span-1">
              <h3 className="text-black font-extrabold text-3xl">Logo</h3>
            </div>

            {/* Quick Links */}
            <div className="col-span-1 text-start ">
              <h3 className="text-black font-bold text-lg py-3">Quick Links</h3>
              <div className="flex flex-col space-y-2">
                <a
                  href="https://www.google.com"
                  className="text-sm text-gray-600 hover:text-black"
                >
                  About Us
                </a>
                <a
                  href="https://www.google.com"
                  className="text-sm text-gray-600 hover:text-black"
                >
                  Contact Us
                </a>
                <a
                  href="https://www.google.com"
                  className="text-sm text-gray-600 hover:text-black"
                >
                  Support
                </a>
                <a
                  href="https://www.google.com"
                  className="text-sm text-gray-600 hover:text-black"
                >
                  Blog
                </a>
                <a
                  href="https://www.google.com"
                  className="text-sm text-gray-600 hover:text-black"
                >
                  Career
                </a>
              </div>
            </div>

            {/* Resources */}
            <div className="col-span-1 text-start">
              <h3 className="text-black font-bold text-lg py-3">Resources</h3>
              <div className="flex flex-col space-y-2">
                <a
                  href="https://www.google.com"
                  className="text-sm text-gray-600 hover:text-black"
                >
                  FAQs
                </a>
                <a
                  href="https://www.google.com"
                  className="text-sm text-gray-600 hover:text-black"
                >
                  Webinars
                </a>
                <a
                  href="https://www.google.com"
                  className="text-sm text-gray-600 hover:text-black"
                >
                  Case Studies
                </a>
                <a
                  href="https://www.google.com"
                  className="text-sm text-gray-600 hover:text-black"
                >
                  Testimonials
                </a>
                <a
                  href="https://www.google.com"
                  className="text-sm text-gray-600 hover:text-black"
                >
                  User Guide
                </a>
              </div>
            </div>

            {/* Stay Connected */}
            <div className="col-span-1 text-start">
              <h3 className="text-black font-bold text-lg py-3">
                Stay Connected
              </h3>
              <div className="flex flex-col space-y-2">
                <a
                  href="https://www.google.com"
                  className="text-sm text-gray-600 hover:text-black"
                >
                  Follow Us
                </a>
                <a
                  href="https://www.google.com"
                  className="text-sm text-gray-600 hover:text-black"
                >
                  Newsletters
                </a>
                <a
                  href="https://www.google.com"
                  className="text-sm text-gray-600 hover:text-black"
                >
                  Social Media
                </a>
                <a
                  href="https://www.google.com"
                  className="text-sm text-gray-600 hover:text-black"
                >
                  Community
                </a>
                <a
                  href="https://www.google.com"
                  className="text-sm text-gray-600 hover:text-black"
                >
                  Events
                </a>
              </div>
            </div>
            <div className="col-span-3">
              <h3 className="text-black font-extrabold text-3xl">Join</h3>
              <p className="text-sm text-gray-700 text-start py-5">
                Join our newsletter for the latest updates and exclusive offers.
              </p>
              <div className="flex gap-2">
                <Input placeholder="Your Email"></Input>
                <Button variant={"secondary"} size={"default"}>
                  Join
                </Button>
              </div>
              <p className="text-xs text-gray-700 text-start py-5">
                By joining, you consent to our Privacy Policy and receive
                updates.
              </p>
            </div>
          </div>
        </div>

        <div className="w-full flex justify-around">
          <div className="flex gap-5">
            <span className="text-sm text-black">
              © 2025 Your Company. All rights reserved.
            </span>
            <span className="text-sm text-black underline">Privacy Policy</span>
            <span className="text-sm text-black underline">Terms of Use</span>
            <span className="text-sm text-black underline">Cookie Policy</span>
          </div>
          <div className="flex gap-5">
            <div>
              <FaFacebook className="text-black" size={20} />
            </div>
            <div>
              <FaInstagram className="text-black" size={20} />
            </div>
            <div>
              <BsTwitterX className="text-black" size={20} />
            </div>
            <div>
              <FaLinkedin className="text-black" size={20} />
            </div>
            <div>
              <FaYoutube className="text-black" size={20} />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    icon: <BsFillBoxFill size={35} className="text-black m-5" />,
    title: "Share Videos Instantly with Just a Click",
    description:
      "Create stunning videos effortlessly and engage your audience like never before.",
  },
  {
    icon: <BsFillBoxFill size={35} className="text-black m-5" />,
    title: "Comment on Specific Video Sections",
    description:
      "Engage with precise moments in a video by adding reactions or comments to specific timestamps.",
  },
  {
    icon: <BsFillBoxFill size={35} className="text-black m-5" />,
    title: "AI-Powered Title & Description Generation",
    description:
      "Leverage AI to automatically generate accurate and engaging titles and descriptions from your video content.",
  },
];

const teamMembers = [
  {
    name: "Alice Johnson",
    role: "Product Manager",
    description:
      "Alice drives product vision and ensures alignment with users' need and market market trends",
    twitterLink: "https://www.google.com/",
    instagramLink: "https://www.google.com/",
    linkedIn: "https://www.google.com/",
  },
  {
    name: "Alice Johnson",
    role: "Product Manager",
    description:
      "Alice drives product vision and ensures alignment with users' need and market market trends",
    twitterLink: "https://www.google.com/",
    instagramLink: "https://www.google.com/",
    linkedIn: "https://www.google.com/",
  },
  {
    name: "Bob Smith",
    role: "Lead Developer",
    description:
      "Alice drives product vision and ensures alignment with users' need and market market trends",
    twitterLink: "https://www.google.com/",
    instagramLink: "https://www.google.com/",
    linkedIn: "https://www.google.com/",
  },
  {
    name: "Cathy Lee",
    role: "Marketing Specialist",
    description:
      "Alice drives product vision and ensures alignment with users' need and market market trends",
    twitterLink: "https://www.google.com/",
    instagramLink: "https://www.google.com/",
    linkedIn: "https://www.google.com/",
  },
  {
    name: "Emma White",
    role: "UX Designer",
    description:
      "Alice drives product vision and ensures alignment with users' need and market market trends",
    twitterLink: "https://www.google.com/",
    instagramLink: "https://www.google.com/",
    linkedIn: "https://www.google.com/",
  },
  {
    name: "Frank Green",
    role: "Data Analyst",
    description:
      "Alice drives product vision and ensures alignment with users' need and market market trends",
    twitterLink: "https://www.google.com/",
    instagramLink: "https://www.google.com/",
    linkedIn: "https://www.google.com/",
  },
];

const contactInfo = [
  {
    icon: <MdOutlineMailOutline className="text-black" size={40} />,
    via: "Email",
    description:
      "We're here to help with any questions or support you may need.",
    value: "hello@ai",
  },
  {
    icon: <LuPhone className="text-black" size={40} />,
    via: "Phone",
    description:
      "We're here to help with any questions or support you may need.",
    value: "(+91) 8867905468",
  },
  {
    icon: <SlLocationPin className="text-black" size={40} />,
    via: "Location",
    description:
      "We're here to help with any questions or support you may need.",
    value: "New York Street 123",
  },
];
