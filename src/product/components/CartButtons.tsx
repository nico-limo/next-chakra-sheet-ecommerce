import { Button, HStack } from "@chakra-ui/react";
import React, { FC } from "react";
import { Product } from "../types";

type Props = {
  product: Product;
  addProduct: (product: Product) => void;
  removeProduct: (product: Product) => void;
  cart: Product[];
};

const CartButtons: FC<Props> = ({
  product,
  addProduct,
  removeProduct,
  cart,
}) => {
  return (
    <HStack justify="space-between">
      <Button onClick={() => addProduct(product)} colorScheme="primary">
        Agregar
      </Button>
      {cart.includes(product) && (
        <Button onClick={() => removeProduct(product)} colorScheme="secondary">
          Remover
        </Button>
      )}
    </HStack>
  );
};

export default CartButtons;
