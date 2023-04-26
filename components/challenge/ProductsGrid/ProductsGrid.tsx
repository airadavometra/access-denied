import WidthContainer from "@/components/WidthContainer/WidthContainer";
import { Product as ProductType } from "@/types/challenge/product";
import { ProductLink } from "../ProductLink/ProductLink";
import s from "./ProductsGrid.module.css";

type ProductsGridProps = {
  products: ProductType[];
};

export const ProductsGrid = ({ products }: ProductsGridProps) => {
  return (
    <div className={s.grid}>
      {products.map((product, index) => (
        <ProductLink key={`${product.name}-${index}`} product={product} />
      ))}
    </div>
  );
};
