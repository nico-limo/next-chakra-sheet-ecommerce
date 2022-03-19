import React, { FC, useMemo, useState } from "react";
import { GetStaticProps } from "next";
import { Product } from "../product/types";
import fetchList from "../product/api";
import {
  Box,
  Button,
  Flex,
  Grid,
  HStack,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { WHATSAPP_PATH } from "../../utils/constant";
import { parseCurrency } from "../../utils/methods";

type Props = {
  products: Product[];
};

const Home: FC<Props> = ({ products }) => {
  const [cart, setCart] = useState<Product[]>([]);
  const text = useMemo(
    () =>
      cart
        .reduce(
          (message, product) =>
            message.concat(
              `* ${product.title} - ${parseCurrency(product.price)}\n`
            ),
          ""
        )
        .concat(
          `\nTotal: ${parseCurrency(
            cart.reduce((total, product) => total + product.price, 0)
          )}`
        ),
    [cart]
  );

  const handleAddCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
  };
  const handleRemovedCart = (product: Product) => {
    setCart((prevCart) => {
      const indexOf = prevCart.indexOf(product);
      const newCart = prevCart.filter((cartProduct, i) => i !== indexOf);
      return newCart;
    });
  };

  return (
    <Stack spacing={6}>
      <Grid gridGap={6} templateColumns="repeat(auto-fill, minmax(240px,1fr))">
        {products.map((product) => (
          <Stack
            borderRadius="md"
            bg="gray.100"
            key={product.id}
            p={4}
            spacing={3}
          >
            <Stack spacing={1}>
              <Text>{product.title}</Text>
              <Text color="green.500" fontWeight="500" fontSize="sm">
                {parseCurrency(product.price)}
              </Text>
            </Stack>
            <HStack justify="space-between">
              <Button
                onClick={() => handleAddCart(product)}
                colorScheme="primary"
              >
                Agregar
              </Button>
              {cart.includes(product) && (
                <Button
                  onClick={() => handleRemovedCart(product)}
                  colorScheme="secondary"
                >
                  Remover
                </Button>
              )}
            </HStack>
          </Stack>
        ))}
      </Grid>
      {cart.length && <Button>{`Ver Carrito ${cart.length} productos`}</Button>}
      {cart.length && (
        <Flex
          bg="rgba(123, 125, 130, 0.34)"
          p={4}
          position="sticky"
          bottom={4}
          align="center"
          justify="center"
        >
          <Button
            as={Link}
            href={`${WHATSAPP_PATH}/555633455?text=${encodeURIComponent(text)}`}
            isExternal
            colorScheme="whatsapp"
          >
            Completar Pedido
          </Button>
        </Flex>
      )}
    </Stack>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const products = await fetchList();
  return {
    props: {
      products,
    },
    revalidate: 10,
  };
};

export default Home;
