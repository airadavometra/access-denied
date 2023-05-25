import WidthContainer from "@/components/WidthContainer/WidthContainer";
import { SendArrow } from "@/icons/SendArrow";
import { NavigationItem } from "@/types/navigationItem";
import s from "./Footer.module.css";
import { Input } from "../Input/Input";
import { useState } from "react";
import { useRouter } from "next/router";

type FooterProps = {
  navigation: NavigationItem[];
};

export const Footer = ({ navigation }: FooterProps) => {
  const router = useRouter();

  const [email, setEmail] = useState<string>();

  const onCategoryClick = (path: string) => {
    router.push(path);
  };

  return (
    <div className={s.footer}>
      <WidthContainer className={s.widthContainer}>
        <div className={s.footerContent}>
          <div className={s.linksAndMission}>
            <div className={s.linksSection}>
              <div className={s.title}>Quick links</div>
              <div className={s.navigation}>
                {navigation.map(({ id, title, path }) => (
                  <div
                    key={id}
                    role="link"
                    onClick={() => onCategoryClick(path)}
                    className={s.link}
                  >
                    {title}
                  </div>
                ))}
              </div>
            </div>
            <div className={s.missionSection}>
              <div className={s.title}>Our mission</div>
              <div className={s.mission}>
                We offer fresh, organic fruits and vegetables with sustainable,
                eco-conscious values.
              </div>
            </div>
          </div>
          <div className={s.mailSection}>
            <div className={s.title}>We send delicious emails.</div>
            <Input
              placeholder="Email"
              buttonAction="Subscribe"
              buttonIcon={<SendArrow className={s.arrow} />}
              color="white"
              value={email}
              onChange={(newValue?: string) => setEmail(newValue)}
            />
          </div>
        </div>
        <div className={s.logoAndRights}>
          <div className={s.logo}>fresh</div>
          <div className={s.rights}>© 2023, all rights reserved</div>
        </div>
      </WidthContainer>
    </div>
  );
};
