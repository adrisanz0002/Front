import { Box, Flex, Stack, Button, Text } from "@chakra-ui/react";
import { AiTwotoneHome, AiOutlineLogout } from "react-icons/ai";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import ContextoUsuario from "../../Provider/providerUsuario";
import { useEffect, useContext, useState } from "react";
const Navbar = () => {
  const { usuario, setUsuario } = useContext(ContextoUsuario);
  const [logged, setLogged] = useState(false);

  const onButtonClick = () => {
    localStorage.clear();
    setLogged(false)
    setUsuario( null)
  };

  useEffect(() => {
    console.log(usuario);
    if (usuario !== null) {
      setLogged(true);
    }
  }, [usuario]);
  return (
    <Box
      bgGradient="linear(to-r, green.200, green.500)"
      spacing={4}
      border="solid"
      borderColor="white"
      height="80px"
      borderBottom="99px"
    >
      <Flex h="100%" alignItems="center">
        <Box w="85%">
          <Stack direction="row">
            <Link href="/">
              <Button
                colorScheme="teal"
                size="lg"
                color="black"
                variant="ghost"
              >
                <AiTwotoneHome size={40} />
              </Button>
            </Link>
            <Link href="/factura">
              <Button
                colorScheme="teal"
                size="lg"
                color="black"
                variant="ghost"
              >
                Facturas
              </Button>
            </Link>
            <Link href="/propiedad">
              <Button
                colorScheme="teal"
                size="lg"
                color="black"
                variant="ghost"
              >
                Propiedades
              </Button>
            </Link>
            <Link href="/incidenciaMedica">
              <Button
                colorScheme="teal"
                size="lg"
                color="black"
                variant="ghost"
              >
                Incidencias medicas
              </Button>
            </Link>
            <Link href="/otraIncidencia">
              <Button
                colorScheme="teal"
                color="black"
                size="lg"
                variant="ghost"
              >
                Otras incidencias
              </Button>
            </Link>
          </Stack>
        </Box>
        <Box w="15%">
          <Stack direction="row" justifyContent="right">
            {!logged && (
              <Link href="/autentificacion">
                <Button
                  colorScheme="teal"
                  size="lg"
                  variant="ghost"
                  color="black"
                >
                  <FaUser size={40}></FaUser>
                </Button>
              </Link>
            )}
            {logged && (
              <Link href="/autentificacion">
                <Button
                  colorScheme="teal"
                  size="lg"
                  variant="ghost"
                  color="black"
                  onClick={onButtonClick}
                >
                  <Text>{usuario}</Text>
                  <AiOutlineLogout size={40}></AiOutlineLogout>
                </Button>
              </Link>
            )}
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
};
export default Navbar;
