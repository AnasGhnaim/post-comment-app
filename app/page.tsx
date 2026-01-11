"use client";
import { useEffect } from "react";
import PostList from "./components/post/postList";
import { socket } from "@/lib/socket";
export default function Home() {
  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("Connected:", socket.id);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <div className="flex mt-10 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <h1 className="text-2xl">
          Welcome to our website where you can share and give your opinion with
          no porblem
        </h1>
      </div>
      <PostList />
    </>
  );
}
