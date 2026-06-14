"use client";
import { testimonialData } from "./testimonialData";

// Render nothing until real testimonials are available from CMS.
const Testimonial = () => {
  if (testimonialData.length === 0) return null;

  // This branch will be reached once testimonialData is populated.
  return null;
};

export default Testimonial;
