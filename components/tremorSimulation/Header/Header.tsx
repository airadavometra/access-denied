import { VisuallyHidden } from "@/components/common/VisuallyHidden/VisuallyHidden";
import { Cart } from "@/icons/Cart";
import { NavigationItem } from "@/types/navigationItem";
import Link from "next/link";
import WidthContainer from "@/components/common/WidthContainer/WidthContainer";
import s from "./Header.module.css";
import { useSimulationStore } from "@/state/useSimulation";
import { useMemo } from "react";

type HeaderProps = {
  isAccessible: boolean;
  navigation: NavigationItem[];
};

export const Header = ({ isAccessible, navigation }: HeaderProps) => {
  const cart = useSimulationStore((state) => state.cart);

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  return (
    <header className={s.header}>
      <WidthContainer className={s.widthContainer}>
        <Link
          aria-label="home page"
          href={isAccessible ? "/tremor/accessible/main" : "/tremor/main"}
          className={s.logo}
        >
          fresh
        </Link>
        <nav>
          <ul className={s.navigation}>
            {navigation.map(({ id, title, path }) => (
              <li className={s.linkContainer} key={id}>
                <Link href={path} className={s.link}>
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link
          aria-label={`Cart, ${cartCount} items`}
          href={isAccessible ? "/tremor/accessible/cart" : "/tremor/cart"}
          className={s.cartButton}
        >
          <div className={s.cartContainer}>
            <Cart />
            <span className={s.cartCount}>{cartCount}</span>
          </div>
          <VisuallyHidden>Cart</VisuallyHidden>
        </Link>
      </WidthContainer>
    </header>
  );
};
