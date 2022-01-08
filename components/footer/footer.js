import { Box, Flex, Text, Button, HStack } from "@chakra-ui/react";
import Link from "next/link";
import {
  FaTwitter,
  FaFacebookSquare,
  FaInstagramSquare,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa";
import { AiOutlineMail, AiFillPhone } from "react-icons/ai";
const Footer = () => {
  return (
    <>
      <Box
        bgGradient="linear(to-r, green.200, green.500)"
        spacing={4}
        border="solid"
        borderColor="white"
        height="150px"
        margin="0"
        marginTop="99px"
      >
        <Flex h="100%">
          <Box w="30%">
            <Text mt="15px" fontSize="2xl" textAlign="center">
              Contactanos
            </Text>
            <Flex justifyContent="center">
                <AiOutlineMail size={25} />
                <Text margin="2px" fontSize="1xl">
                  hogarnizate@gmail.com
                </Text>
            </Flex>
            <Flex justifyContent="center">
                <AiFillPhone size={25} />
                <Text margin="2px" fontSize="1xl">
                  654334558
                </Text>
            </Flex>
          </Box>
          <Box w="30%">
            <Text mt="15px" fontSize="2xl" textAlign="center">
              Siguenos
            </Text>
            <HStack justifyContent="center">
              <Link href="https://www.instagram.com/?hl=es">
                <a>
                <FaInstagramSquare size={40} />
                </a>
              </Link>
              <Link href="https://twitter.com/iniciarsesion">
                <a>
                <FaTwitter size={40} />
                </a>
              </Link>
              <Link href="https://es-es.facebook.com/">
                <a>
                <FaFacebookSquare size={40} />
                </a>
              </Link>
              <Link href="https://www.youtube.com/">
                <a>
                <FaYoutube size={40} />
                </a>
              </Link>
              <Link href="https://es.linkedin.com/">
                <a>
                <FaLinkedin size={40} />
                </a>
              </Link>
            </HStack>
          </Box>
          <Box w="30%">
            <Text mt="15px" fontSize="2xl" textAlign="center">
              Sobre nosotros
            </Text>
            <p>
                Somos una compañía con la intención de facilitar a todos nuestros clientes la gestión de sus hogares. Desde propiedades o facturas a incidencias de tipo médico o de cualquier otro tipo.
            </p>
          </Box>
        </Flex>
      </Box>
    </>
  );
};
export default Footer;
