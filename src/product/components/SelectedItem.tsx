import React, { FC } from "react";
import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { Product } from "../types";
import { parseCurrency } from "../../../utils/methods";
type Props = {
  isOpen: boolean;
  onClose: () => void;
  selectedItem: Product;
};

const SelectedItem: FC<Props> = ({ isOpen, onClose, selectedItem }) => {
  const { description, title, image, price } = selectedItem;
  return (
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <HStack spacing={4}>
            <Image src={image} alt={title} />
            <Flex direction="column">
              <Flex direction="column" py={6}>
                <Text fontWeight="bold">Descripcion:</Text>
                <Text>{description}</Text>
              </Flex>
              <Flex direction="column">
                <Text fontWeight="bold">Price:</Text>
                <Text>{parseCurrency(price)}</Text>
              </Flex>
            </Flex>
          </HStack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="ghost">Secondary Action</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SelectedItem;
