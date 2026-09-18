import Image from "next/image";
import Link from "next/link";
import { getImagePath } from "@/libs/imageHelper";
import type { OnlineLesson } from "@/types/online-lesson";
import type { SectionContent, SectionTone } from "@/types/homeSettings";
import SectionShell, { focusRing } from "./SectionShell";
import Reveal from "./Reveal";
import { PlayCircleIcon } from "./icons";

/** Lesson descriptions are plain text, but strip markup defensively. */
const toPlainText = (value: string | null): string =>
  value
    ? value
        .replace(/<[^>]*>/g, " ")
        .replace(/\s+/g, " ")
        .trim()
    : "";

const OnlineLessonsSection = ({
  content,
  lessons,
  tone,
}: {
  content: SectionContent;
  lessons: OnlineLesson[];
  tone: SectionTone;
}) => (
  <SectionShell
    tone={tone}
    surface="dark"
    icon={<PlayCircleIcon className="h-5 w-5" />}
    eyebrow={content.eyebrow}
    title={content.title}
    body={content.body}
    ctaLabel={content.ctaLabel}
    ctaHref={content.ctaHref}
  >
    {lessons.length > 0 ? (
      <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {lessons.map((lesson, index) => {
          const detailsPath = `/online-lessons/details/${lesson.id}`;
          const description = toPlainText(lesson.description);

          return (
            // The wrapper is the grid item, so the card needs `h-full` to keep
            // stretching to the row height the way it did before.
            <Reveal
              key={lesson.id}
              variant="up"
              delay={Math.min(index * 90, 270)}
              className="h-full"
            >
              <Link
                href={detailsPath}
                className={`group bg-ink-0 shadow-solid-9 hover:shadow-solid-7 flex h-full flex-col overflow-hidden rounded-2xl transition duration-200 ease-out hover:-translate-y-1 ${focusRing.dark}`}
              >
                <div className="bg-zumthor relative aspect-16/10 w-full overflow-hidden">
                  {lesson.thumbnail ? (
                    <Image
                      src={getImagePath(lesson.thumbnail)}
                      alt={lesson.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-200 ease-out group-hover:scale-[1.04]"
                    />
                  ) : null}
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="group-hover:text-primary text-lg leading-snug font-semibold text-black transition-colors duration-200">
                    {lesson.title}
                  </h3>

                  {description ? (
                    <p className="text-waterloo mt-3 line-clamp-2 text-base leading-relaxed">
                      {description}
                    </p>
                  ) : null}

                  <span className="bg-primary mt-6 inline-flex w-fit items-center rounded-full px-4 py-1.5 text-base font-bold text-white">
                    ${Number(lesson.price).toFixed(2)}
                  </span>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    ) : null}
  </SectionShell>
);

export default OnlineLessonsSection;
