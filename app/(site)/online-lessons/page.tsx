import OnlineLessonItem from "@/components/OnlineLesson/OnlineLessonItem";
import { Metadata } from "next";
import axiosInstance from "@/libs/axios";
import { OnlineLesson } from "@/types/online-lesson";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Online Lessons — Learn Armenian in English",
  description: "Explore our comprehensive online Armenian lessons.",
};

const OnlineLessonsPage = async () => {
  let lessons: OnlineLesson[] = [];
  try {
    const response = await axiosInstance.get("/online-lessons");
    lessons = response.data.data;
  } catch (error) {
    console.error("Error fetching online lessons:", error);
  }

  return (
    <>
      <section className="py-20 lg:py-25 xl:py-30">
        <div className="mx-auto mt-15 max-w-c-1280 px-4 md:px-8 xl:mt-20 xl:px-0">
          {lessons.length > 0 ? (
            <div className="grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-3 xl:gap-10">
              {lessons.map((lesson) => (
                <OnlineLessonItem key={lesson.id} lesson={lesson} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-2xl font-semibold text-black dark:text-white">
                No lessons available yet
              </p>
              <p className="mt-3 text-body-color dark:text-body-color-dark">
                Check back soon — new lessons are being prepared.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default OnlineLessonsPage;
