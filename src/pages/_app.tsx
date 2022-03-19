import React from "react";
import {
  Box,
  ChakraProvider,
  Container,
  Divider,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { AppProps } from "next/app";
import theme from "../../theme";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <Box p={4}>
        <Container
          borderRadius="sm"
          bg="white"
          boxShadow="md"
          maxW="container.xl"
          p={4}
        >
          <VStack mb={6}>
            <Image
              src="http://via.placeholder.com/128x128"
              borderRadius={9999}
              alt="notImage"
            />
            <Heading>Almacen</Heading>
            <Text>El almacen de Diego</Text>
          </VStack>
          <Divider my={6} py={6} />
          <Component {...pageProps} />
        </Container>
      </Box>
    </ChakraProvider>
  );
};

export default App;
