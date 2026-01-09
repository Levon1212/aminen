"use client";
import { Lesson } from "@/types/lesson";
import { motion } from "framer-motion";
import Link from "next/link";
import { getImagePath } from "@/libs/imageHelper";

const LessonItem = ({ lesson }: { lesson: Lesson }) => {
  const { thumbnail, title, id, tags, price } = lesson;
  const detailsPath = `/online-lessons/details/${id}`;

  return (
    <>
      <motion.div
        variants={{
          hidden: {
            opacity: 0,
            y: -20,
          },

          visible: {
            opacity: 1,
            y: 0,
          },
        }}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 1, delay: 0.5 }}
        viewport={{ once: true }}
        className="animate_top shadow-solid-8 dark:bg-blacksection rounded-lg bg-white p-4 pb-9 backdrop-blur"
      >
        <Link href={detailsPath} className="relative block aspect-368/239">
          <img
            src={getImagePath(thumbnail)}
            alt={title}
            className="object-cover"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "10px",
            }}
          />
        </Link>

        <div className="px-4">
          <h3 className="hover:text-primary dark:hover:text-primary xl:text-itemtitle2 mt-7.5 mb-3.5 line-clamp-2 inline-block text-lg font-medium text-black duration-300 dark:text-white">
            <Link href={detailsPath}>{title}</Link>
          </h3>
          <div className="flex items-center justify-between mt-5">
            <p className="text-black dark:text-white font-medium">
               {price}
            </p>
            {tags && (
              <p className="text-sm">
                <span className="text-black dark:text-white">Tags: </span>
                {tags}
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default LessonItem;
