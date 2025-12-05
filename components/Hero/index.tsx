"use client";
import Image from "next/image";
import { useState } from "react";

const Hero = () => {

  return (
    <>
      <section className="overflow-hidden pb-20 pt-35 md:pt-40 xl:pb-25 xl:pt-46">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <div className="flex lg:items-center lg:gap-0 xl:gap-32.5">
            <div className=" md:w-1/2">
              <h4 className="mb-4.5 text-lg font-medium text-black dark:text-white">
                ARMENIANINENGLISH — Learn Armenian in English
              </h4>
              <h1 className="mb-5 pr-16 text-3xl font-bold text-black dark:text-white xl:text-hero ">
                Friendly lessons with {" "}
                <span className="relative inline-block before:absolute before:bottom-2.5 before:left-0 before:-z-1 before:h-3 before:w-full before:bg-titlebg dark:before:bg-titlebgdark ">
                  Margarita
                </span>
              </h1>
              <p>
                Start from zero and learn the Armenian alphabet, pronunciation, basic grammar,
                and everyday phrases — explained clearly in English. Watch videos, read short
                articles, and follow along with Margarita’s beginner book on Amazon.
              </p>

              <div className="mt-10">
                <p className="mt-5 text-black dark:text-white">
                  Արի միասին սովորենք հայերեն։
                </p>
              </div>
            </div>

            <div className="animate_right hidden md:w-1/2 lg:block">
              <div className="relative 2xl:-mr-7.5">
                <div className=" relative aspect-400/444 w-full">
                  <Image
                    className="shadow-solid-l dark:hidden"
                    src="/images/hero/hero-light-v3.jpg"
                    alt="Hero"
                    style={{objectFit:'cover', objectPosition:'top', borderRadius:'10px'}}

                    fill
                  />
                  <Image
                    className="hidden shadow-solid-l dark:block"
                    src="/images/hero/hero-light-v3.jpg"
                    alt="Hero"
                    style={{objectFit:'cover', objectPosition:'top', borderRadius:'10px'}}
                    fill
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
