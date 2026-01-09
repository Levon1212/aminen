import SharePost from "@/components/Blog/SharePost";
import { Metadata } from "next";
import axiosInstance from "@/libs/axios";
import { getImagePath } from "@/libs/imageHelper";
import { Lesson } from "@/types/lesson";
import { decodeHtml } from "@/libs/htmlHelper";

export const metadata: Metadata = {
  title: "Online Lesson Details — Learn Armenian in English",
  description: "Detailed information about our online Armenian lessons."
};

const SingleLessonPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  let lesson: Lesson | null = null;

  try {
    const response = await axiosInstance.get(`/lessons/${id}`);
    lesson = response.data.data;
  } catch (error) {
    console.error("Error fetching online lesson:", error);
  }

  if (!lesson) {
    return (
      <section className="pb-20 pt-35 lg:pb-25 lg:pt-45 xl:pb-30 xl:pt-50">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <h2 className="text-3xl font-semibold text-black dark:text-white">
            Lesson not found
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
            <div className="lg:w-3/3">
              <div className="animate_top border-stroke shadow-solid-13 dark:border-strokedark dark:bg-blacksection rounded-md border bg-white p-7.5 md:p-10">
                <h2 className="2xl:text-sectiontitle2 mt-11 mb-5 text-3xl font-semibold text-black dark:text-white">
                  {lesson.title}
                </h2>
                <div className="mb-10 w-full overflow-hidden">
                  <div className="relative aspect-97/60 w-full sm:aspect-97/44">
                    <img
                      src={getImagePath(lesson.thumbnail)}
                      alt={lesson.title}
                      className="rounded-md object-cover object-center"
                      style={{
                        width: "100%",
                      }}
                    />
                  </div>
                </div>

                <ul className="mb-9 flex flex-wrap gap-5 2xl:gap-7.5">
                  <li>
                    <span className="text-black dark:text-white">
                      Published On:{" "}
                      {new Date(lesson.created_at).toLocaleDateString()}
                    </span>{" "}
                  </li>
                  {lesson.tags && (
                    <li>
                      <span className="text-black dark:text-white">Tags:</span>
                      {lesson.tags}
                    </li>
                  )}
                </ul>

                {lesson.videos && (
                  <div className="blog-details mb-10">
                    {lesson.videos?.map((video) => (
                      <div key={video} className="video-container mb-7">
                        <video
                          src={getImagePath(video)}
                          controls
                          style={{ width: "100%" }}
                        />
                      </div>
                    ))}
                  </div>
                )}

                <div className="blog-details">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: decodeHtml(lesson.description),
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

export default SingleLessonPage;
