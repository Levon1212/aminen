"use client";
import { OnlineLesson } from "@/types/online-lesson";
import { motion } from "framer-motion";
import Link from "next/link";
import { getImagePath } from "@/libs/imageHelper";

const OnlineLessonItem = ({ lesson }: { lesson: OnlineLesson }) => {
  const detailsPath = `/online-lessons/details/${lesson.id}`;
  const videoCount = lesson.videos?.length ?? 0;
  const previewCount = lesson.videos?.filter((v) => v.is_preview).length ?? 0;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      whileInView="visible"
      transition={{ duration: 1, delay: 0.5 }}
      viewport={{ once: true }}
      className="animate_top shadow-solid-8 dark:bg-blacksection flex flex-col rounded-lg bg-white p-6 pb-8 backdrop-blur"
    >
      {lesson.thumbnail && (
        <Link href={detailsPath} className="relative mb-4 block aspect-368/239 overflow-hidden rounded-md">
          <img
            src={getImagePath(lesson.thumbnail)}
            alt={lesson.title}
            className="h-full w-full object-cover"
          />
        </Link>
      )}

      <div className="mb-4 flex items-start justify-between gap-2">
        <h3 className="hover:text-primary dark:hover:text-primary xl:text-itemtitle2 text-lg font-medium text-black duration-300 dark:text-white">
          <Link href={detailsPath}>{lesson.title}</Link>
        </h3>
        {lesson.price != null && (
          <span className="shrink-0 rounded-full bg-primary/10 px-3 py-0.5 text-sm font-semibold text-primary">
            ${Number(lesson.price).toFixed(2)}
          </span>
        )}
      </div>

      {lesson.description && (
        <p className="mb-4 line-clamp-3 text-sm text-body-color dark:text-body-color-dark">
          {lesson.description}
        </p>
      )}

      <p className="mb-2 text-sm text-black/60 dark:text-white/60">
        {videoCount} video{videoCount !== 1 ? "s" : ""}
        {previewCount > 0 && (
          <span className="ml-2 text-primary">• {previewCount} free preview{previewCount !== 1 ? "s" : ""}</span>
        )}
      </p>

      {lesson.tags && (
        <p className="mb-4 text-xs text-body-color dark:text-body-color-dark">
          {lesson.tags}
        </p>
      )}

      <div className="mt-auto">
        <Link
          href={detailsPath}
          className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white duration-300 hover:bg-blackho dark:bg-btndark"
        >
          View Lesson
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M10.4767 6.16664L6.00668 1.69664L7.18501 0.518311L13.6667 6.99998L7.18501 13.4816L6.00668 12.3033L10.4767 7.83331H0.333344V6.16664H10.4767Z"
              fill="white"
            />
          </svg>
        </Link>
      </div>
    </motion.div>
  );
};

export default OnlineLessonItem;
