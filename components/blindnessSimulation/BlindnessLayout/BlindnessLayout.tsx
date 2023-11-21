import { ReactNode, useEffect } from "react";
import s from "./BlindnessLayout.module.css";
import { Layout } from "@/components/common/SimulationLayout/SimulationLayout";
import { data } from "@/data/blindness";
import { getSimulationNavigation } from "@/utils/getSimulationNavigation";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { AccessibleHeader } from "@/components/accessible/Header/Header";
import { AccessibleFooter } from "@/components/accessible/Footer/Footer";
import { useBackground } from "@/hooks/useBackground";

type BlindnessLayoutProps = {
  isAccessible: boolean;
  children: ReactNode;
};

export const BlindnessLayout = ({
  isAccessible,
  children,
}: BlindnessLayoutProps) => {
  const navigation = getSimulationNavigation(data.path, isAccessible);

  useBackground();

  return (
    <>
      <Layout data={data}>
        {isAccessible ? (
          <AccessibleHeader path={data.path} navigation={navigation} />
        ) : (
          <Header navigation={navigation} />
        )}
        {children}
        {isAccessible ? (
          <AccessibleFooter navigation={navigation} />
        ) : (
          <Footer navigation={navigation} />
        )}
      </Layout>
      <div className={s.blindness} aria-hidden />
    </>
  );
};
