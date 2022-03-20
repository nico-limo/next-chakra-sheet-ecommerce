import React, { FC, useMemo, useState } from "react";
import { GetStaticProps } from "next";
import { Product } from "../product/types";
import fetchList from "../product/api";
import {
  Button,
  Flex,
  Grid,
  HStack,
  Image,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { parseCurrency } from "../../utils/methods";
import CartButtons from "../product/components/CartButtons";
import SelectedItem from "../product/components/SelectedItem";
import DrawnerCart from "../product/components/DrawnerCart";

type Props = {
  products: Product[];
};

const Home: FC<Props> = ({ products }) => {
  const [cart, setCart] = useState<Product[]>([]);
  const [selectedItem, setSelectedItem] = useState<Product>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const {
    isOpen: isOpenCart,
    onOpen: onOpenCart,
    onClose: onCloseCart,
  } = useDisclosure();
  const totalAmount = useMemo(
    () =>
      parseCurrency(cart.reduce((total, product) => total + product.price, 0)),
    [cart]
  );

  const handleAddCart = (product: Product) => {
    if (cart.includes(product))
      return toast({
        title: `Producto ya agregado`,
        status: "warning",
        isClosable: true,
      });
    setCart((prevCart) => [...prevCart, product]);
  };
  const handleRemovedCart = (product: Product) => {
    setCart((prevCart) => {
      const indexOf = prevCart.indexOf(product);
      const newCart = prevCart.filter((cartProduct, i) => i !== indexOf);
      return newCart;
    });
  };
  const handleSelection = (product: Product) => {
    setSelectedItem(product);
    onOpen();
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
            <Stack onClick={() => handleSelection(product)} cursor="pointer">
              <Image
                src={product.image}
                alt={product.title}
                maxH={300}
                maxW={260}
                borderTopRadius="md"
              />
              <Stack spacing={1}>
                <Text>{product.title}</Text>
                <Text color="green.500" fontWeight="500" fontSize="sm">
                  {parseCurrency(product.price)}
                </Text>
              </Stack>
            </Stack>
            <CartButtons
              product={product}
              cart={cart}
              addProduct={handleAddCart}
              removeProduct={handleRemovedCart}
            />
          </Stack>
        ))}
      </Grid>

      {cart.length && (
        <HStack
          bg="gray.300"
          p={4}
          position="sticky"
          bottom={0}
          align="center"
          justify="space-around"
        >
          <Flex direction="column">
            <Text>{`Productos: ${cart.length}`}</Text>
            <Text>{`Total: ${totalAmount} `}</Text>
          </Flex>
          <Button
            onClick={onOpenCart}
            colorScheme="linkedin"
          >{`Ver Carrito`}</Button>
        </HStack>
      )}
      {selectedItem && (
        <SelectedItem
          isOpen={isOpen}
          onClose={onClose}
          selectedItem={selectedItem}
        />
      )}
      <DrawnerCart
        isOpen={isOpenCart}
        onClose={onCloseCart}
        cart={cart}
        totalAmount={totalAmount}
        removeProduct={handleRemovedCart}
      />
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
