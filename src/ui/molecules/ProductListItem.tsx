import { ProductCoverImage } from "@/ui/atoms/ProductCoverImage";
import { ProductItemType } from "@/ui/types";
import { ProductListItemDescription } from "@/ui/atoms/ProductListItemDescription";

type ProductListItemProps = {
  product: ProductItemType;
};

export const ProductListItem = ({ product }: ProductListItemProps) => {
  return (
    <li>
      <article>
        <ProductCoverImage {...product.coverImage} />
        <ProductListItemDescription product={product} />
      </article>
    </li>
  );
};
