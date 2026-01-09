import React from "react";
import { Metadata } from "next";
import LiveLessonForm from "@/components/LiveLesson";

export const metadata: Metadata = {
  title: "Live Lessons - Learn Armenian",
  description: "Schedule a one-on-one live lesson to learn Armenian with our experienced tutors.",
};

const LiveLessonsPage = () => {
  return (
    <div className="pb-20 pt-40">
      <LiveLessonForm />
    </div>
  );
};

export default LiveLessonsPage;
