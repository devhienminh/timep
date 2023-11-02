import Image from "next/image";
import Point from "@/components/Point";
import Rank from "@/components/Rank";
import Chat from "@/components/Chat";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Point />
      {/* <div className="divider"></div>
      <Rank />
      <div className="divider"></div>
      <Chat />*/}
      <div className="divider"></div>
      <Contact />
    </>
  );
}
