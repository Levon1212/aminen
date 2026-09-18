"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { getImagePath } from "@/libs/imageHelper";
import { ExternalLinkIcon } from "@/components/Home/icons";

import menuData from "./menuData";

const FOCUS =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-soft";

const Header = () => {
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [stickyMenu, setStickyMenu] = useState(false);

  const { user, logout } = useAuth();
  const pathUrl = usePathname();

  useEffect(() => {
    const handleStickyMenu = () => setStickyMenu(window.scrollY >= 20);
    handleStickyMenu();
    window.addEventListener("scroll", handleStickyMenu);
    return () => window.removeEventListener("scroll", handleStickyMenu);
  }, []);

  // Close the mobile panel whenever the route changes.
  useEffect(() => {
    setNavigationOpen(false);
  }, [pathUrl]);

  const isActive = (path?: string) => !!path && pathUrl === path;

  return (
    <header
      className={`sticky left-0 top-0 z-999 w-full border-b transition-colors duration-200 ${
        stickyMenu
          ? "border-navy-line bg-navy-800/90 backdrop-blur-md"
          : "border-transparent bg-navy-900"
      }`}
    >
      <div className="mx-auto flex max-w-c-1390 items-center justify-between gap-4 px-4 py-4 md:px-8">
        {/* Logo */}
        <Link
          href="/"
          className={`flex shrink-0 items-center gap-3 rounded-lg ${FOCUS}`}
        >
          <Image
            src="/images/logo/logo.jpg"
            alt="HayLang"
            width={44}
            height={44}
            className="rounded-lg"
            priority
          />
          <span className="hidden text-lg font-bold tracking-tight text-onnavy-strong sm:block">
            HayLang
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:block">
          <ul className="flex items-center gap-7 xl:gap-9">
            {menuData.map((menuItem) => (
              <li key={menuItem.title}>
                <Link
                  href={menuItem.path ?? "/"}
                  target={menuItem.newTab ? "_blank" : undefined}
                  rel={menuItem.newTab ? "noopener noreferrer" : undefined}
                  className={`inline-flex items-center gap-1.5 border-b-2 pb-1 text-base font-medium transition-colors duration-200 ${FOCUS} ${
                    isActive(menuItem.path)
                      ? "border-primary text-primary-soft"
                      : "border-transparent text-onnavy-muted hover:text-onnavy-strong"
                  }`}
                >
                  {menuItem.title}
                  {menuItem.newTab ? (
                    <ExternalLinkIcon className="h-3.5 w-3.5 text-onnavy-faint" />
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Auth area + hamburger */}
        <div className="flex items-center gap-4">
          <div className="hidden lg:block">
            <AuthArea user={user} logout={logout} />
          </div>

          <button
            aria-label="Toggle navigation menu"
            aria-expanded={navigationOpen}
            onClick={() => setNavigationOpen(!navigationOpen)}
            className={`flex h-10 w-10 items-center justify-center rounded-lg border border-navy-line text-onnavy-muted transition-colors duration-200 hover:border-primary-soft hover:text-onnavy-strong lg:hidden ${FOCUS}`}
          >
            {navigationOpen ? (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path
                  d="M1 1L17 17M17 1L1 17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden="true">
                <path
                  d="M1 1H17M1 7H17M1 13H17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      {navigationOpen && (
        <div className="border-t border-navy-line bg-navy-800 lg:hidden">
          <div className="mx-auto max-w-c-1390 px-4 py-5 md:px-8">
            <ul className="flex flex-col gap-1">
              {menuData.map((menuItem) => (
                <li key={menuItem.title}>
                  <Link
                    href={menuItem.path ?? "/"}
                    target={menuItem.newTab ? "_blank" : undefined}
                    rel={menuItem.newTab ? "noopener noreferrer" : undefined}
                    onClick={() => setNavigationOpen(false)}
                    className={`flex items-center gap-1.5 rounded-lg px-3 py-2.5 text-base font-medium transition-colors duration-200 ${FOCUS} ${
                      isActive(menuItem.path)
                        ? "bg-navy-700 text-primary-soft"
                        : "text-onnavy-muted hover:bg-navy-700 hover:text-onnavy-strong"
                    }`}
                  >
                    {menuItem.title}
                    {menuItem.newTab ? (
                      <ExternalLinkIcon className="h-3.5 w-3.5 text-onnavy-faint" />
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-5 border-t border-navy-line pt-5">
              <AuthArea
                user={user}
                logout={logout}
                onNavigate={() => setNavigationOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

type AuthUser = ReturnType<typeof useAuth>["user"];

const AuthArea = ({
  user,
  logout,
  onNavigate,
}: {
  user: AuthUser;
  logout: () => void;
  onNavigate?: () => void;
}) => {
  if (user) {
    return (
      <div className="flex items-center gap-4">
        <Link
          href="/profile"
          onClick={onNavigate}
          className={`flex items-center gap-2.5 rounded-full text-base font-medium text-onnavy-strong transition-colors duration-200 hover:text-primary-soft ${FOCUS}`}
        >
          <span className="relative block h-9 w-9 shrink-0 overflow-hidden rounded-full bg-navy-700 ring-2 ring-navy-600">
            <Image
              src={
                user.avatar_url
                  ? getImagePath(user.avatar_url)
                  : "/images/user/user-01.png"
              }
              alt={user.name}
              fill
              sizes="36px"
              className="object-cover"
            />
          </span>
          <span className="max-w-[10rem] truncate">{user.name}</span>
        </Link>
        <button
          onClick={logout}
          className={`rounded-full text-base font-medium text-onnavy-muted transition-colors duration-200 hover:text-onnavy-strong ${FOCUS}`}
        >
          Log out
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Link
        href="/auth/signin"
        onClick={onNavigate}
        className={`rounded-full px-4 py-2 text-base font-medium text-onnavy-muted transition-colors duration-200 hover:text-onnavy-strong ${FOCUS}`}
      >
        Sign In
      </Link>
      <Link
        href="/auth/signup"
        onClick={onNavigate}
        className={`rounded-full bg-primary px-5 py-2 text-base font-medium text-white transition-colors duration-200 hover:bg-primaryho ${FOCUS}`}
      >
        Sign Up
      </Link>
    </div>
  );
};

export default Header;
