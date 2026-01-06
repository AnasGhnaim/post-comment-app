import PostList from "./components/post/postList";

export default function Home() {
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
