import Image from "next/image";
import Link from "next/link";
import { getImagePath } from "@/libs/imageHelper";
import type { OnlineLesson } from "@/types/online-lesson";
import type { SectionContent, SectionTone } from "@/types/homeSettings";
import SectionShell from "./SectionShell";

/** Lesson descriptions are plain text, but strip markup defensively. */
const toPlainText = (value: string | null): string =>
  value ? value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim() : "";

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
    eyebrow={content.eyebrow}
    title={content.title}
    body={content.body}
    ctaLabel={content.ctaLabel}
    ctaHref={content.ctaHref}
  >
    {lessons.length > 0 ? (
      <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {lessons.map((lesson) => {
          const detailsPath = `/online-lessons/details/${lesson.id}`;
          const description = toPlainText(lesson.description);

          return (
            <Link
              key={lesson.id}
              href={detailsPath}
              className="group flex flex-col overflow-hidden rounded-2xl border border-stroke bg-white shadow-solid-11 transition duration-200 hover:-translate-y-1 hover:shadow-solid-9"
            >
              <div className="relative aspect-16/10 w-full overflow-hidden bg-zumthor">
                {lesson.thumbnail ? (
                  <Image
                    src={getImagePath(lesson.thumbnail)}
                    alt={lesson.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                ) : null}
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-lg font-semibold leading-snug text-black transition-colors duration-200 group-hover:text-primary">
                  {lesson.title}
                </h3>

                {description ? (
                  <p className="mt-3 line-clamp-2 text-base leading-relaxed text-waterloo">
                    {description}
                  </p>
                ) : null}

                <span className="mt-6 inline-block text-lg font-bold text-primary">
                  ${Number(lesson.price).toFixed(2)}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    ) : null}
  </SectionShell>
);

export default OnlineLessonsSection;
