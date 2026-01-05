import Image from "next/image";

const posts = [
  {
    id: "1",
    Title: "Meta AI",
    Decription:
      "Meta AI was published in 2023 and added to Instagram and Facebook.",
    Image: "/post-images/coding-event.jpg",
    Time: "22 Feb 2025",
  },
  {
    id: "2",
    Title: "Meta AI",
    Decription:
      "Meta AI was published in 2023 and added to Instagram and Facebook.",
    Image: "/post-images/coding-event.jpg",
    Time: "22 Feb 2025",
  },
  {
    id: "3",
    Title: "Meta AI",
    Decription:
      "Meta AI was published in 2023 and added to Instagram and Facebook.",
    Image: "/post-images/coding-event.jpg",
    Time: "22 Feb 2025",
  },
];

export default function PostList() {
  return (
    <section className="mt-16 px-6 md:px-12 font-sans">
      <h1 className="text-4xl font-bold text-center text-indigo-700 mb-12">
        Posts
      </h1>

      <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow  p-6"
          >
            {/* Image */}
            <div className="flex justify-center mb-6">
              <Image
                src={post.Image}
                alt={post.Title}
                width={120}
                height={120}
                preload
                className="rounded-lg object-cover"
              />
            </div>

            {/* Content */}
            <h2 className="text-2xl font-semibold text-indigo-700 mb-2 text-center">
              {post.Title}
            </h2>

            <p className="text-sm text-gray-500 text-center mb-4">
              📅 {post.Time}
            </p>

            <p className="text-gray-600 text-center leading-relaxed">
              {post.Decription}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
