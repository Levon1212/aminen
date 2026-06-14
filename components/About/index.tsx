"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface AboutSettings {
  tag?: string;
  titlePrefix?: string;
  name?: string;
  body?: string;
  step1Title?: string;
  step1Body?: string;
  step2Title?: string;
  step2Body?: string;
  imageLightSrc?: string;
  imageDarkSrc?: string;
  tag2?: string;
  title2Prefix?: string;
  highlighted2?: string;
  body2?: string;
}

const About = ({ settings = {} }: { settings?: AboutSettings }) => {
  const tag = settings.tag || "Learn Armenian in English";
  const titlePrefix = settings.titlePrefix || "Friendly Armenian lessons with";
  const name = settings.name || "Margarita";
  const body = settings.body || "Hi! I'm Margarita. I help English speakers learn Armenian with short, clear lessons, real examples, and cultural notes. Start with the alphabet, build simple sentences, and practice everyday phrases at your own pace.";
  const step1Title = settings.step1Title || "Alphabet & Pronunciation";
  const step1Body = settings.step1Body || "Learn letters and sounds with simple English tips and mouth positions.";
  const step2Title = settings.step2Title || "Simple Grammar & Dialogues";
  const step2Body = settings.step2Body || "Make real sentences and practice friendly conversations.";

  const imageLightSrc = settings.imageLightSrc || "/images/about/about-light-01.png";
  const imageDarkSrc = settings.imageDarkSrc || "/images/about/about-dark-01.png";

  const tag2 = settings.tag2 || "Your Study Path";
  const title2Prefix = settings.title2Prefix || "Learn step by step with";
  const highlighted2 = settings.highlighted2 || "videos and articles";
  const body2 = settings.body2 || "Follow short videos, read simple articles, and review with quick quizzes. Use transliteration first, then read and write in Armenian with confidence.";

  return (
    <>
      {/* <!-- ===== About Start ===== --> */}
      <section className="overflow-hidden pb-20 lg:pb-25 xl:pb-30">
        <div className="mx-auto max-w-c-1235 px-4 md:px-8 xl:px-0">
          <div className="flex items-center gap-8 lg:gap-32.5">
            <motion.div
              variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_left relative mx-auto hidden aspect-[588/526.5] md:block md:w-1/2"
            >
              <Image src={imageLightSrc} alt="About" className="dark:hidden" fill />
              <Image src={imageDarkSrc} alt="About" className="hidden dark:block" fill />
            </motion.div>
            <motion.div
              variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_right md:w-1/2"
            >
              <span className="font-medium uppercase text-black dark:text-white">
                <span className="mb-4 mr-4 inline-flex rounded-full bg-meta px-4.5 py-1 text-metatitle uppercase text-white ">
                  New
                </span>{" "}
                {tag}
              </span>
              <h2 className="relative mb-6 text-3xl font-bold text-black dark:text-white xl:text-hero">
                {titlePrefix}
                <span className="relative inline-block before:absolute before:bottom-2.5 before:left-0 before:-z-1 before:h-3 before:w-full before:bg-titlebg dark:before:bg-titlebgdark">
                  {name}
                </span>
              </h2>
              <p>{body}</p>

              <div className="mt-7.5 flex items-center gap-5">
                <div className="flex h-15 w-15 items-center justify-center rounded-[50%] border border-stroke dark:border-strokedark dark:bg-blacksection">
                  <p className="text-metatitle2 font-semibold text-black dark:text-white">01</p>
                </div>
                <div className="w-3/4">
                  <h3 className="mb-0.5 text-metatitle2 text-black dark:text-white">{step1Title}</h3>
                  <p>{step1Body}</p>
                </div>
              </div>
              <div className="mt-7.5 flex items-center gap-5">
                <div className="flex h-15 w-15 items-center justify-center rounded-[50%] border border-stroke dark:border-strokedark dark:bg-blacksection">
                  <p className="text-metatitle2 font-semibold text-black dark:text-white">02</p>
                </div>
                <div className="w-3/4">
                  <h3 className="mb-0.5 text-metatitle2 text-black dark:text-white">{step2Title}</h3>
                  <p>{step2Body}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* <!-- ===== About End ===== --> */}

      {/* <!-- ===== About Two Start ===== --> */}
      <section>
        <div className="mx-auto max-w-c-1235 overflow-hidden px-4 md:px-8 2xl:px-0">
          <div className="flex items-center gap-8 lg:gap-32.5">
            <motion.div
              variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_left md:w-1/2"
            >
              <h4 className="font-medium uppercase text-black dark:text-white">
                {tag2}
              </h4>
              <h2 className="relative mb-6 text-3xl font-bold text-black dark:text-white xl:text-hero">
                {title2Prefix}
                <span className="relative inline-block before:absolute before:bottom-2.5 before:left-0 before:-z-1 before:h-3 before:w-full before:bg-titlebg2 dark:before:bg-titlebgdark">
                  {highlighted2}
                </span>
              </h2>
              <p>{body2}</p>
              <div>
                <a
                  href="/blog"
                  className="group mt-7.5 inline-flex items-center gap-2.5 text-black hover:text-primary dark:text-white dark:hover:text-primary"
                >
                  <span className="duration-300 group-hover:pr-2">Read Articles</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                    <path d="M10.4767 6.16701L6.00668 1.69701L7.18501 0.518677L13.6667 7.00034L7.18501 13.482L6.00668 12.3037L10.4767 7.83368H0.333344V6.16701H10.4767Z" />
                  </svg>
                </a>
              </div>
            </motion.div>
            <motion.div
              variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_right relative mx-auto hidden aspect-[588/526.5] md:block md:w-1/2"
            >
              <Image src="./images/about/about-light-02.svg" alt="About" className="dark:hidden" fill />
              <Image src="./images/about/about-dark-02.svg" alt="About" className="hidden dark:block" fill />
            </motion.div>
          </div>
        </div>
      </section>
      {/* <!-- ===== About Two End ===== --> */}
    </>
  );
};

export default About;
