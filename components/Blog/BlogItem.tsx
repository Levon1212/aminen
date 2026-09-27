"use client";
import { Blog } from "@/types/blog";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { getImagePath } from "@/libs/imageHelper";

const BlogItem = ({ blog, isKids = false }: { blog: Blog; isKids?: boolean }) => {
  const { thumbnail, title, id } = blog;
  const detailsPath = isKids ? `/kids-articles/articles-details/${id}` : `/articles/articles-details/${id}`;

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
        className="shadow-solid-8 rounded-lg bg-surface p-4 pb-9 backdrop-blur"
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
          <h3 className="hover:text-primary-600 xl:text-itemtitle2 mt-7.5 mb-3.5 line-clamp-2 inline-block text-lg font-medium text-ink duration-300">
            <Link href={detailsPath}>{title}</Link>
          </h3>
        </div>
      </motion.div>
    </>
  );
};

export default BlogItem;
