import { Product as ProductType } from "@/types/challenge/product";
import Image from "next/image";
import Link from "next/link";
import s from "./ProductLink.module.css";

type ProductLinkProps = {
  product: ProductType;
};

export const ProductLink = ({ product }: ProductLinkProps) => {
  return (
    <div className={s.container}>
      <div className={s.imageContainer}>
        <Image className={s.image} fill src={product.imgSrc} alt="" />
      </div>
      <Link
        href={`/challenge/product?product=${product.id}`}
        className={s.name}
      >
        {product.name}
      </Link>
      <div className={s.price}>
        ${product.price} / {product.unit}
      </div>
    </div>
  );
};
