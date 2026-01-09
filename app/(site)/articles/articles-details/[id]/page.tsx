import RelatedPost from "@/components/Blog/RelatedPost";
import SharePost from "@/components/Blog/SharePost";
import { Metadata } from "next";
import Image from "next/image";
import axiosInstance from "@/libs/axios";
import { getImagePath } from "@/libs/imageHelper";
import { Blog } from "@/types/blog";
import { decodeHtml } from "@/libs/htmlHelper";

export const metadata: Metadata = {
  title: "Article Details — Learn Armenian in English",
  description: "Read our beginner-friendly Armenian articles."
};

const SingleBlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  let post: Blog | null = null;

  try {
    const response = await axiosInstance.get(`/articles/${id}`);
    post = response.data.data;
  } catch (error) {
    console.error("Error fetching article:", error);
  }

  if (!post) {
    return (
      <section className="pb-20 pt-35 lg:pb-25 lg:pt-45 xl:pb-30 xl:pt-50">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <h2 className="text-3xl font-semibold text-black dark:text-white">
            Article not found
          </h2>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="pt-35 pb-20 lg:pt-45 lg:pb-25 xl:pt-50 xl:pb-30">
        <div className="max-w-c-1390 mx-auto px-4 md:px-8 2xl:px-0">
          <div className="flex flex-col-reverse gap-7.5 lg:flex-row xl:gap-12.5">
            <div className="md:w-1/2 lg:w-[32%]">
              <RelatedPost />
            </div>

            <div className="lg:w-2/3">
              <div className="animate_top border-stroke shadow-solid-13 dark:border-strokedark dark:bg-blacksection rounded-md border bg-white p-7.5 md:p-10">
                <div className="mb-10 w-full overflow-hidden">
                  <div className="relative aspect-97/60 w-full sm:aspect-97/44">
                    <img
                      src={getImagePath(post.thumbnail)}
                      alt={post.title}
                      className="rounded-md object-cover object-center"
                    />
                  </div>
                </div>

                <h2 className="2xl:text-sectiontitle2 mt-11 mb-5 text-3xl font-semibold text-black dark:text-white">
                  {post.title}
                </h2>

                <ul className="mb-9 flex flex-wrap gap-5 2xl:gap-7.5">
                  <li>
                    <span className="text-black dark:text-white">
                      Published On:{" "}
                      {new Date(post.created_at).toLocaleDateString()}
                    </span>{" "}
                  </li>
                  {post.tags && (
                    <li>
                      <span className="text-black dark:text-white">Tags:</span>
                      {post.tags}
                    </li>
                  )}
                </ul>

                <div className="blog-details">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: decodeHtml(post.description),
                    }}
                  />
                </div>
                <SharePost />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleBlogPage;
