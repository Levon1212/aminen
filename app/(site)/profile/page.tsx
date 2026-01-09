import Profile from "@/components/Profile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Profile — Learn Armenian in English",
  description: "View and update your profile information."
};

const ProfilePage = () => {
  return (
    <section className="pt-35 pb-20 lg:pt-45 lg:pb-25 xl:pt-50 xl:pb-30">
      <div className="mx-auto max-w-c-1016 px-4 md:px-8 2xl:px-0">
        <Profile />
      </div>
    </section>
  );
};

export default ProfilePage;
