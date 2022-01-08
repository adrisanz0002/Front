import {
  Box,
  Flex,
  Text,
  Button,
  useDisclosure,
  Modal,
} from "@chakra-ui/react";
import { AiFillDelete, AiFillEye, AiFillEdit } from "react-icons/ai";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react'
import axios from "axios";
import ModalPropiedad from "../components/modales/modalPropiedad";
import { useRef, useState, useEffect, useContext } from "react";
const Propiedad = () => {
  const [propiedades, setPropiedades] = useState([]);

  const onCloseAlert = () => setIsOpenAlert(false);
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const initialRef = useRef();
  const finalRef = useRef();
  const [tipoAccion, setTipoAccion] = useState("");
  const [id, setId] = useState("");
  const router = useRouter();
  const cancelRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const getPropiedades = async () => {
    const resultado = await axios
      .get(`http://localhost:4000/api/propiedades`)
      .then((res) => {
        setPropiedades(res.data);
      });
  };
  const onButtonClickAdd = () => {
    setTipoAccion("add");
    onOpen();
  };
  const onButtonClickEdit = (id) => {
    setTipoAccion("editar");
    setId(id);
    onOpen();
  };
  const onButtonClickRead = (id) => {
    setTipoAccion("read");
    setId(id);
    onOpen();
  };
  const Delete = (id) => {
    setIsOpenAlert(true)
    setId(id)
  }
  const onButtonClickDelete = async (id) => {
    const resultado = await axios
      .delete(`http://localhost:4000/api/propiedades/` + id, {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("AuthToken"),
        },
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data.message);
        }
      });
    router.push({
      pathname: "/propiedad",
      query: { returnUrl: router.asPath },
    });
  };
  useEffect(() => {
    getPropiedades();
  }, []);
  return (
    <Flex justifyContent="center">
      <Box
        mt="10px"
        w="70%"
        bgGradient="linear(to-r, green.200, green.500)"
        p={4}
        color="black"
        alignItems="center"
        align="center"
        borderRadius="20px"
      >
        <Text fontSize="6xl">Propiedad</Text>

        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Categoría</Th>
              <Th>Descripcion</Th>
              <Th isNumeric>Valor</Th>
              <Th>Propietario</Th>
              <Th>Fecha de Adquisicion</Th>
              <Th>Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {propiedades.map((propiedad) => (
              <Tr key={propiedad._id}>
                <Td>{propiedad.categoria}</Td>
                <Td>{propiedad.descripcion}</Td>
                <Td>{propiedad.valor}</Td>
                <Td>{propiedad.propietario}</Td>
                <Td>{propiedad.fechaAdquisicion}</Td>
                <Td>
                  <Button
                    colorScheme="teal"
                    size="sm"
                    variant="ghost"
                    color="#b81515"
                    onClick={() => Delete(propiedad._id)}
                  >
                    <AiFillDelete size={20}></AiFillDelete>
                  </Button>
                  <Button
                    onClick={() => onButtonClickEdit(propiedad._id)}
                    colorScheme="teal"
                    size="sm"
                    variant="ghost"
                    color="#1912a7"
                  >
                    <AiFillEdit size={20}></AiFillEdit>
                  </Button>

                  <Button
                    colorScheme="teal"
                    size="sm"
                    variant="ghost"
                    color="black"
                    onClick={() => onButtonClickRead(propiedad._id)}
                  >
                    <AiFillEye size={20}></AiFillEye>
                  </Button>
                  <Modal
                    initialFocusRef={initialRef}
                    finalFocusRef={finalRef}
                    isOpen={isOpen}
                    onClose={onClose}
                  >
                    <ModalPropiedad
                      tipoAccion={tipoAccion}
                      propiedadEditar={id}
                    ></ModalPropiedad>
                  </Modal>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Button
          colorScheme="teal"
          variant="solid"
          size="lg"
          mt="20px"
          ml="1000px"
          onClick={onButtonClickAdd}
        >
          Añadir
        </Button><AlertDialog
          isOpen={isOpenAlert}
          leastDestructiveRef={cancelRef}
          onClose={onCloseAlert}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Propiedad
              </AlertDialogHeader>

              <AlertDialogBody>
                ¿Desea eliminarlo?
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onCloseAlert}>
                  Cancelar
                </Button>
                <Button colorScheme="red" onClick={() => onButtonClickDelete(id)} ml={3}>
                  Borrar
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Box>
    </Flex>
  );
};
export default Propiedad;
