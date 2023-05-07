import { NavigationItem } from "@/types/navigationItem";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import Header from "../Header/Header";
import MobileMenu from "../MobileMenu/MobileMenu";
import { PageHead } from "../../PageHead/PageHead";
import s from "./Layout.module.css";

const navigation: NavigationItem[] = [
  { id: 0, title: "about", path: "/#about" },
  { id: 1, title: "challenges", path: "/#challenges" },
];

const mobileNavigation: NavigationItem[] = [
  { id: 0, title: "about project", path: "/#about" },
  { id: 2, title: "blurred vision", path: "/task?filter=blurredvision" },
  { id: 3, title: "tremor", path: "/task?filter=tremor" },
  { id: 4, title: "blindness", path: "/task?filter=blindness" },
  { id: 5, title: "dyslexia", path: "/task?filter=dyslexia" },
  { id: 6, title: "colour blindness", path: "/task?filter=colourblindness" },
];

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();
  const [selectedMenuItemId, setSelectedMenuItemId] = useState<
    number | undefined
  >();
  const [isMenuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    //TODO fix for urls with ids - id is not in pathname
    const selectedMenuItem = navigation.find(
      (nav) => nav.path === router.pathname
    );
    if (selectedMenuItem) {
      setSelectedMenuItemId(selectedMenuItem.id);
    } else {
      setSelectedMenuItemId(undefined);
    }
  }, [router.pathname]);

  const onMenuItemClick = (newMenuItemId: number) => {
    setSelectedMenuItemId(newMenuItemId);
    setMenuOpen(false);
    document.body.classList.toggle("frozen");
  };

  const openMenu = () => {
    setMenuOpen(true);
    document.body.classList.toggle("frozen");
  };
  const closeMenu = () => {
    setMenuOpen(false);
    document.body.classList.toggle("frozen");
  };

  return (
    <>
      <PageHead />
      <div id="layout" className={s.layout}>
        <Header
          navigation={navigation}
          onOpenMenu={openMenu}
          onMenuItemClick={onMenuItemClick}
        />
        {children}
      </div>
      <AnimatePresence mode="wait">
        {isMenuOpen && (
          <MobileMenu
            isOpen={isMenuOpen}
            navigation={mobileNavigation}
            onMenuItemClick={onMenuItemClick}
            onCloseMenu={closeMenu}
          />
        )}
      </AnimatePresence>
    </>
  );
};
