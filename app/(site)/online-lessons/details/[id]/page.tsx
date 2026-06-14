import OnlineLessonDetails from "@/components/OnlineLesson/OnlineLessonDetails";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lesson Details — Learn Armenian in English",
  description: "Detailed information about this online Armenian lesson.",
};

const OnlineLessonDetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return <OnlineLessonDetails id={id} />;
};

export default OnlineLessonDetailsPage;
