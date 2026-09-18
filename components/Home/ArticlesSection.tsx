import Image from "next/image";
import Link from "next/link";
import { getImagePath } from "@/libs/imageHelper";
import type { Blog } from "@/types/blog";
import type { SectionContent, SectionTone } from "@/types/homeSettings";
import SectionShell from "./SectionShell";

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
    eyebrow={content.eyebrow}
    title={content.title}
    body={content.body}
    ctaLabel={content.ctaLabel}
    ctaHref={content.ctaHref}
  >
    {articles.length > 0 ? (
      <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <Link
            key={article.id}
            href={`/articles/articles-details/${article.id}`}
            className="group flex flex-col overflow-hidden rounded-2xl border border-stroke bg-white shadow-solid-11 transition duration-200 hover:-translate-y-1 hover:shadow-solid-9"
          >
            <div className="relative aspect-16/10 w-full overflow-hidden bg-zumthor">
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
              <h3 className="text-lg font-semibold leading-snug text-black transition-colors duration-200 group-hover:text-primary">
                {article.title}
              </h3>
              <span className="mt-4 text-base font-medium text-primary">
                Read article
              </span>
            </div>
          </Link>
        ))}
      </div>
    ) : null}
  </SectionShell>
);

export default ArticlesSection;
