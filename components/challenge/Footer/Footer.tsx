import WidthContainer from "@/components/WidthContainer/WidthContainer";
import { SendArrow } from "@/icons/SendArrow";
import { NavigationItem } from "@/types/navigationItem";
import Link from "next/link";
import s from "./Footer.module.css";
import { Input } from "../Input/Input";
import { useState } from "react";

type FooterProps = {
  navigation: NavigationItem[];
  onMenuItemClick: (newMenuItemId: number) => void;
};

export const Footer = ({ navigation, onMenuItemClick }: FooterProps) => {
  const [email, setEmail] = useState<string>();

  return (
    <footer className={s.footer}>
      <WidthContainer className={s.widthContainer}>
        <div className={s.footerContent}>
          <div className={s.linksAndMission}>
            <section className={s.linksSection}>
              <h6 className={s.title}>Quick links</h6>
              <ul className={s.navigation}>
                {navigation.map(({ id, title, path }) => (
                  <li key={id}>
                    <Link
                      href={path}
                      onClick={() => onMenuItemClick(id)}
                      className={s.link}
                    >
                      {title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
            <section className={s.missionSection}>
              <h6 className={s.title}>Our mission</h6>
              <p className={s.mission}>
                We offer fresh, organic fruits and vegetables with sustainable,
                eco-conscious values.
              </p>
            </section>
          </div>
          <section className={s.mailSection}>
            <h6 className={s.title}>We send delicious emails.</h6>
            <Input
              placeholder="Email"
              buttonAction="Subscribe"
              buttonIcon={<SendArrow className={s.arrow} />}
              color="white"
              value={email}
              onChange={(newValue?: string) => setEmail(newValue)}
              type={"email"}
            />
          </section>
        </div>
        <div className={s.logoAndRights}>
          <div className={s.logo}>fresh</div>
          <span className={s.rights}>© 2023, all rights reserved</span>
        </div>
      </WidthContainer>
    </footer>
  );
};
