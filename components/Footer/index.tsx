"use client";
import { motion } from "framer-motion";
import Image from "next/image";

interface FooterSettings {
  logoSrc?: string;
  tagline?: string;
  email?: string;
  telegram?: string;
  instagram?: string;
  youtube?: string;
  facebook?: string;
}

const Footer = ({ settings = {} }: { settings?: FooterSettings }) => {
  const logoSrc = settings.logoSrc || "/images/logo/logo.jpg";
  const tagline = settings.tagline || "ARMENIANINENGLISH — Learn Armenian in English with Margarita. Short lessons, videos, and a friendly beginner book to help you speak with confidence.";
  const email = settings.email || "hello@armenianinenglish.com";

  const socials = [
    {
      key: "telegram",
      href: settings.telegram,
      label: "Telegram",
      path: "M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z",
    },
    {
      key: "instagram",
      href: settings.instagram,
      label: "Instagram",
      path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z",
    },
    {
      key: "youtube",
      href: settings.youtube,
      label: "YouTube",
      path: "M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z",
    },
    {
      key: "facebook",
      href: settings.facebook,
      label: "Facebook",
      path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
    },
  ].filter((s) => !!s.href);

  return (
    <>
      <footer className="border-t border-stroke bg-white dark:border-strokedark dark:bg-blacksection">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          {/* <!-- Footer Top --> */}
          <div className="py-20 lg:py-25">
            <div className="flex flex-wrap gap-8 lg:justify-between lg:gap-0">
              <motion.div
                variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }}
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
                className="animate_top w-1/2 lg:w-1/4"
              >
                <a href="/" className="relative">
                  <Image width={110} height={80} src={logoSrc} alt="Logo" className="dark:hidden" />
                  <Image width={110} height={80} src={logoSrc} alt="Logo" className="hidden dark:block" />
                </a>

                <p className="mb-10 mt-5">{tagline}</p>

                <p className="mb-1.5 text-sectiontitle uppercase tracking-[5px]">contact</p>
                <a href={`mailto:${email}`} className="text-itemtitle font-medium text-black dark:text-white">
                  {email}
                </a>
              </motion.div>

              <div className="flex w-full flex-col gap-8 md:flex-row md:justify-between md:gap-0 lg:w-2/3 xl:w-7/12">
                <motion.div
                  variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }}
                  initial="hidden" whileInView="visible"
                  transition={{ duration: 1, delay: 0.1 }} viewport={{ once: true }}
                  className="animate_top"
                >
                  <h4 className="mb-9 text-itemtitle2 font-medium text-black dark:text-white">Quick Links</h4>
                  <ul>
                    <li><a href="/" className="mb-3 inline-block hover:text-primary">Home</a></li>
                    <li><a href="/#lessons" className="mb-3 inline-block hover:text-primary">Lessons</a></li>
                    <li><a href="/articles" className="mb-3 inline-block hover:text-primary">Articles</a></li>
                    <li><a href="/book" className="mb-3 inline-block hover:text-primary">Book on Amazon</a></li>
                  </ul>
                </motion.div>

                <motion.div
                  variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }}
                  initial="hidden" whileInView="visible"
                  transition={{ duration: 1, delay: 0.1 }} viewport={{ once: true }}
                  className="animate_top"
                >
                  <h4 className="mb-9 text-itemtitle2 font-medium text-black dark:text-white">Resources</h4>
                  <ul>
                    <li><a href={settings.youtube || "https://www.youtube.com"} className="mb-3 inline-block hover:text-primary">YouTube Lessons</a></li>
                    <li><a href="/" className="mb-3 inline-block hover:text-primary">Study Guide</a></li>
                    <li><a href="/articles" className="mb-3 inline-block hover:text-primary">Articles & Tips</a></li>
                    <li><a href="/kids-articles" className="mb-3 inline-block hover:text-primary">Kids Articles</a></li>
                    <li><a href="/contact" className="mb-3 inline-block hover:text-primary">Contact</a></li>
                  </ul>
                </motion.div>

                <motion.div
                  variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }}
                  initial="hidden" whileInView="visible"
                  transition={{ duration: 1, delay: 0.1 }} viewport={{ once: true }}
                  className="animate_top"
                >
                  <h4 className="mb-9 text-itemtitle2 font-medium text-black dark:text-white">Newsletter</h4>
                  <p className="mb-4 w-[90%]">Subscribe to receive future updates</p>
                  <form action="#">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Email address"
                        className="w-full rounded-full border border-stroke px-6 py-3 shadow-solid-11 focus:border-primary focus:outline-hidden dark:border-strokedark dark:bg-black dark:shadow-none dark:focus:border-primary"
                      />
                      <button aria-label="signup to newsletter" className="absolute right-0 p-4">
                        <svg className="fill-[#757693] hover:fill-primary dark:fill-white" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clipPath="url(#clip0_48_1487)">
                            <path d="M3.1175 1.17318L18.5025 9.63484C18.5678 9.67081 18.6223 9.72365 18.6602 9.78786C18.6982 9.85206 18.7182 9.92527 18.7182 9.99984C18.7182 10.0744 18.6982 10.1476 18.6602 10.2118C18.6223 10.276 18.5678 10.3289 18.5025 10.3648L3.1175 18.8265C3.05406 18.8614 2.98262 18.8792 2.91023 18.8781C2.83783 18.8769 2.76698 18.857 2.70465 18.8201C2.64232 18.7833 2.59066 18.7308 2.55478 18.6679C2.51889 18.6051 2.50001 18.5339 2.5 18.4615V1.53818C2.50001 1.46577 2.51889 1.39462 2.55478 1.33174C2.59066 1.26885 2.64232 1.2164 2.70465 1.17956C2.76698 1.14272 2.83783 1.12275 2.91023 1.12163C2.98262 1.12051 3.05406 1.13828 3.1175 1.17318ZM4.16667 10.8332V16.3473L15.7083 9.99984L4.16667 3.65234V9.16651H8.33333V10.8332H4.16667Z" fill="" />
                          </g>
                          <defs><clipPath id="clip0_48_1487"><rect width="20" height="20" fill="white" /></clipPath></defs>
                        </svg>
                      </button>
                    </div>
                  </form>
                </motion.div>
              </div>
            </div>
          </div>
          {/* <!-- Footer Top --> */}

          {/* <!-- Footer Bottom --> */}
          <div className="flex flex-col flex-wrap items-center justify-center gap-5 border-t border-stroke py-7 dark:border-strokedark lg:flex-row lg:justify-between lg:gap-0">
            <motion.div
              variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }}
              initial="hidden" whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }} viewport={{ once: true }}
              className="animate_top"
            >
              <ul className="flex items-center gap-8">
                <li><a href="#" className="hover:text-primary">English</a></li>
                <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary">Support</a></li>
              </ul>
            </motion.div>

            <motion.div
              variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }}
              initial="hidden" whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }} viewport={{ once: true }}
              className="animate_top"
            >
              <p>&copy; {new Date().getFullYear()} ARMENIANINENGLISH. All rights reserved</p>
            </motion.div>

            {socials.length > 0 && (
              <motion.div
                variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }}
                initial="hidden" whileInView="visible"
                transition={{ duration: 1, delay: 0.1 }} viewport={{ once: true }}
                className="animate_top"
              >
                <ul className="flex items-center gap-5">
                  {socials.map((s) => (
                    <li key={s.key}>
                      <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                        <svg
                          className="fill-[#D1D8E0] transition-all duration-300 hover:fill-primary"
                          width="24" height="24" viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d={s.path} />
                        </svg>
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </div>
          {/* <!-- Footer Bottom --> */}
        </div>
      </footer>
    </>
  );
};

export default Footer;
