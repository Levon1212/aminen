import BlogItem from "@/components/Blog/BlogItem";
import { Metadata } from "next";
import axiosInstance from "@/libs/axios";
import { Blog } from "@/types/blog";

export const metadata: Metadata = {
  title: "Articles — Learn Armenian in English | ARMENIANINENGLISH",
  description:
    "Beginner-friendly Armenian articles: alphabet, greetings, pronunciation, grammar, vocabulary, and culture notes by Margarita.",
};

const BlogPage = async () => {
  let posts: Blog[] = [];
  try {
    const response = await axiosInstance.get("/articles");
    posts = response.data.data;
  } catch (error) {
    console.error("Error fetching articles:", error);
  }

  return (
    <>
      {/* <!-- ===== Blog Grid Start ===== --> */}
      <section className="py-20 lg:py-25 xl:py-30">
        <div className="mx-auto mt-15 max-w-c-1280 px-4 md:px-8 xl:mt-20 xl:px-0">
          <div className="grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-3 xl:gap-10">
            {posts.map((post, key) => (
              <BlogItem key={key} blog={post} />
            ))}
          </div>
        </div>
      </section>
      {/* <!-- ===== Blog Grid End ===== --> */}
    </>
  );
};

export default BlogPage;
