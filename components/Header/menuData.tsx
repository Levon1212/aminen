import { Menu } from "@/types/menu";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Live lessons",
    newTab: false,
    path: "/live-lessons",
  },
  {
    id: 2,
    title: "Online lessons",
    newTab: false,
    path: "/online-lessons",
  },
  {
    id: 2.1,
    title: "Articles",
    newTab: false,
    path: "/articles",
  },
  {
    id: 2.2,
    title: "Kids",
    newTab: false,
    path: "/kids-articles",
  },
  {
    id: 4,
    title: "Book on Amazon",
    newTab: true,
    path: "https://a.co/d/aPsda2g",
  },
  {
    id: 4,
    title: "Youtube",
    newTab: true,
    path: "https://www.youtube.com/@HayLanguage",
  },
  {
    id: 5,
    title: "Contact",
    newTab: false,
    path: "/support",
  },
];

export default menuData;
