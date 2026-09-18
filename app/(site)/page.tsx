import { Metadata } from "next";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "ARMENIANINENGLISH — Learn Armenian in English with Margarita",
  description:
    "Friendly Armenian lessons for English speakers: alphabet, pronunciation, beginner grammar, culture notes, videos, and a beginner book by Margarita.",
};

export default async function Home() {
  return <main />;
}
