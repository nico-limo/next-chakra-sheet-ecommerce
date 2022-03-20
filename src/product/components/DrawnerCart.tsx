import React, { FC, useMemo, useRef } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  List,
  ListItem,
  ListIcon,
  Link,
  Box,
  Text,
  Divider,
  VStack,
  Avatar,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { WHATSAPP_PATH } from "../../../utils/constant";
import { parseCurrency } from "../../../utils/methods";
import { Product } from "../types";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  cart: Product[];
  totalAmount: string;
  removeProduct: (product: Product) => void;
};

const DrawnerCart: FC<Props> = ({
  isOpen,
  onClose,
  cart,
  totalAmount,
  removeProduct,
}) => {
  const btnRef = useRef();

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
        .concat(`\nTotal: ${totalAmount}`),
    [cart, totalAmount]
  );

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      finalFocusRef={btnRef}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Listado del Carrito</DrawerHeader>

        <DrawerBody>
          <VStack spacing={4}>
            <List spacing={3}>
              <HStack></HStack>
              {cart.map((product) => (
                <ListItem key={product.id}>
                  <HStack spacing={4} align="center" justify="space-between">
                    <Avatar src={product.image} />
                    <Text>{product.title}</Text>
                    <IconButton
                      size="xs"
                      colorScheme="red"
                      aria-label="Remove Item"
                      icon={<CloseIcon />}
                      onClick={() => removeProduct(product)}
                    />
                  </HStack>
                </ListItem>
              ))}
            </List>
          </VStack>
        </DrawerBody>
        <Divider />

        <Text textAlign="center">{`Su total es ${totalAmount}`}</Text>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button
            as={Link}
            href={`${WHATSAPP_PATH}/555633455?text=${encodeURIComponent(text)}`}
            isExternal
            colorScheme="whatsapp"
          >
            Completar Pedido
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawnerCart;
