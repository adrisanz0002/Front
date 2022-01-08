import {
  Box,
  Flex,
  Text,
  Button,
  useDisclosure,
  Modal
} from "@chakra-ui/react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react'
import { AiFillDelete, AiFillEye, AiFillEdit } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useRef, useState, useEffect, useContext } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";
import axios from "axios";
import ModalFactura from "../components/modales/modalFacturas";
import React from "react";
import { useRouter } from "next/router";
const Factura = () => {
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const onCloseAlert = () => setIsOpenAlert(false);
  const cancelRef = useRef();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef();
  const finalRef = useRef();
  const [facturas, setFacturas] = useState([]);
  const [tipoAccion, setTipoAccion] = useState("");
  const [id, setId] = useState("");
  const getFacturas = async () => {
    const resultado = await axios
      .get(`http://localhost:4000/api/facturas`)
      .then((res) => {
        setFacturas(res.data);
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
      .delete(`http://localhost:4000/api/facturas/` + id, {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("AuthToken"),
        },
      })
      .catch(function (error) {
        if (error.response) {
        }
      });
    router.push({
      pathname: "/factura",
      query: { returnUrl: router.asPath },
    });
  };
  useEffect(() => {
    getFacturas();
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
        <Text fontSize="6xl">Facturas</Text>

        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Nombre</Th>
              <Th>Apellidos</Th>
              <Th>Categoria</Th>
              <Th isNumeric>importe</Th>
              <Th>Fecha</Th>
              <Th>Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {facturas.map((factura) => (
              <Tr key={factura._id}>
                <Td>{factura.nombre}</Td>
                <Td>{factura.apellidos}</Td>
                <Td>{factura.categoria}</Td>
                <Td>{factura.importe}</Td>
                <Td>{factura.fecha}</Td>
                <Td>
                  <Button
                    colorScheme="teal"
                    size="sm"
                    variant="ghost"
                    color="#b81515"
                    onClick={() => Delete(factura._id)}
                  >
                    <AiFillDelete size={20}></AiFillDelete>
                  </Button>
                  <Button
                    onClick={() => onButtonClickEdit(factura._id)}
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
                    onClick={() => onButtonClickRead(factura._id)}
                  >
                    <AiFillEye size={20}></AiFillEye>
                  </Button>
                  <Modal
                    initialFocusRef={initialRef}
                    finalFocusRef={finalRef}
                    isOpen={isOpen}
                    onClose={onClose}
                  >
                    <ModalFactura
                      tipoAccion={tipoAccion}
                      facturaEditar={id}
                    ></ModalFactura>
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
        </Button>
        <AlertDialog
          isOpen={isOpenAlert}
          leastDestructiveRef={cancelRef}
          onClose={onCloseAlert}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Factura
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
export default Factura;
