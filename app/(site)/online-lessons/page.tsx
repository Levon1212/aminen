import LessonItem from "@/components/OnlineLesson/LessonItem";
import { Metadata } from "next";
import axiosInstance from "@/libs/axios";
import { Lesson } from "@/types/lesson";

export const metadata: Metadata = {
  title: "Online Lessons — Learn Armenian in English",
  description: "Explore our comprehensive online Armenian lessons.",
};

const OnlineLessonsPage = async () => {
  let lessons: Lesson[] = [];
  try {
    const response = await axiosInstance.get("/lessons");
    lessons = response.data.data;
  } catch (error) {
    console.error("Error fetching online lessons:", error);
  }

  return (
    <>
      <section className="py-20 lg:py-25 xl:py-30">
        <div className="mx-auto mt-15 max-w-c-1280 px-4 md:px-8 xl:mt-20 xl:px-0">
          <div className="grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-3 xl:gap-10">
            {lessons.map((lesson, key) => (
              <LessonItem key={key} lesson={lesson} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default OnlineLessonsPage;
