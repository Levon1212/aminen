import Image from "next/image";
import Link from "next/link";
import { getImagePath } from "@/libs/imageHelper";
import type { Blog } from "@/types/blog";
import type { SectionContent, SectionTone } from "@/types/homeSettings";
import SectionShell, { focusRing } from "./SectionShell";
import Reveal from "./Reveal";
import { ArticleIcon } from "./icons";

const ArticlesSection = ({
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
    surface="dark-alt"
    icon={<ArticleIcon className="h-5 w-5" />}
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
              href={`/articles/articles-details/${article.id}`}
              className={`group border-navy-line bg-navy-700 hover:border-primary/40 hover:bg-navy-600 flex h-full flex-col overflow-hidden rounded-2xl border transition duration-200 ease-out hover:-translate-y-1 ${focusRing.dark}`}
            >
              <div className="bg-navy-600 relative aspect-16/10 w-full overflow-hidden">
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
                <h3 className="text-onnavy-strong group-hover:text-primary-soft text-lg leading-snug font-semibold transition-colors duration-200">
                  {article.title}
                </h3>
                <span className="text-onnavy-faint group-hover:text-primary-soft mt-4 text-base font-medium transition-colors duration-200">
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

export default ArticlesSection;
