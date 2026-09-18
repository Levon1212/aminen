import Image from "next/image";
import Link from "next/link";
import { getImagePath } from "@/libs/imageHelper";
import type { Blog } from "@/types/blog";
import type { SectionContent, SectionTone } from "@/types/homeSettings";
import SectionShell, { focusRing } from "./SectionShell";
import Reveal from "./Reveal";
import { KidsIcon } from "./icons";

/**
 * Same data shape as the articles section, with a softer card treatment
 * (rounder corners, warm accent) so it reads as the children's area.
 */
const KidsSection = ({
  content,
  articles,
  tone,
}: {
  content: SectionContent;
  articles: Blog[];
  tone: SectionTone;
}) => (
  <SectionShell
    tone={tone}
    surface="light-warm"
    accent="kids"
    icon={<KidsIcon className="h-5 w-5" />}
    eyebrow={content.eyebrow}
    title={content.title}
    body={content.body}
    ctaLabel={content.ctaLabel}
    ctaHref={content.ctaHref}
  >
    {articles.length > 0 ? (
      <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article, index) => (
          // The wrapper is the grid item, so the card needs `h-full` to keep
          // stretching to the row height the way it did before.
          <Reveal
            key={article.id}
            variant="up"
            delay={Math.min(index * 90, 270)}
            className="h-full"
          >
            <Link
              href={`/kids-articles/articles-details/${article.id}`}
              className={`group bg-ink-100 shadow-solid-9 hover:shadow-solid-7 flex h-full flex-col overflow-hidden rounded-3xl transition duration-200 ease-out hover:-translate-y-1 ${focusRing.light}`}
            >
              {/* The warm accent frame is this card's kids chip — it brightens on hover. */}
              <div className="bg-accent-kids/15 group-hover:bg-accent-kids/30 relative aspect-16/10 w-full overflow-hidden transition-colors duration-200 ease-out">
                {article.thumbnail ? (
                  <Image
                    src={getImagePath(article.thumbnail)}
                    alt={article.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                ) : null}
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="group-hover:text-primary text-lg leading-snug font-semibold text-black transition-colors duration-200">
                  {article.title}
                </h3>
                <span className="text-primary mt-4 text-base font-medium">
                  Read article
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    ) : null}
  </SectionShell>
);

export default KidsSection;
