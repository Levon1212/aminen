import { Menu } from "@/types/menu";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Home",
    newTab: false,
    path: "/",
  },
  {
    id: 2,
    title: "Lessons",
    newTab: false,
    path: "/#lessons",
  },
  {
    id: 2.1,
    title: "Articles",
    newTab: false,
    path: "/blog",
  },
  {
    id: 2.3,
    title: "YouTube",
    newTab: false,
    path: "https://www.youtube.com",
  },
  {
    id: 4,
    title: "Book on Amazon",
    newTab: false,
    path: "/book",
  },
  {
    id: 5,
    title: "Contact",
    newTab: false,
    path: "/contact",
  },
];

export default menuData;
