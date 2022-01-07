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
import axios from "axios";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { useRef, useState, useEffect, useContext } from "react";
import ModalIncidenciaMedica from "../components/modales/modalIncidenciaMedica";
const IncidenciaMedica = () => {
  const [incidencias, setIncidencias] = useState([]);
  const [tipoAccion, setTipoAccion] = useState("");

  const onCloseAlert = () => setIsOpenAlert(false);
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [id, setId] = useState("");
  const router = useRouter();
  const cancelRef = useRef();
  const initialRef = useRef();
  const finalRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const getIncidencias = async () => {
    const resultado = await axios
      .get(`http://localhost:4000/api/incidenciasMedicas`)
      .then((res) => {
        setIncidencias(res.data);
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
    console.log("id,", id);
    setTipoAccion("read");
    setId(id);
    onOpen();
  };
  const Delete = (id) => {
    setIsOpenAlert(true);
    setId(id);
  };
  useEffect(() => {
    getIncidencias();
  }, []);
  const onButtonClickDelete = async (id) => {
    console.log(id)
    const resultado = await axios
      .delete(`http://localhost:4000/api/incidenciasMedicas/` + id, {
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
      pathname: "/incidenciaMedica",
      query: { returnUrl: router.asPath },
    });
  };
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
        <Text fontSize="6xl">Incidencia Médica</Text>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Paciente</Th>
              <Th>Sanitario</Th>
              <Th>Especialidad</Th>
              <Th>Descripcion</Th>
              <Th>Hospital</Th>
              <Th>Fecha</Th>
              <Th>Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {incidencias.map((incidencia) => (
              <Tr key ={incidencia._id}>
                <Td>{incidencia.paciente}</Td>
                <Td>{incidencia.sanitario}</Td>
                <Td>{incidencia.especialidad}</Td>
                <Td>{incidencia.descripcion}</Td>
                <Td>{incidencia.hospital}</Td>
                <Td>{incidencia.fecha}</Td>
                <Td>
                  <Button
                    colorScheme="teal"
                    size="sm"
                    variant="ghost"
                    color="#b81515"
                    onClick={() => Delete(incidencia._id)}
                  >
                    <AiFillDelete size={20}></AiFillDelete>
                  </Button>
                  <Button
                    onClick={() => onButtonClickEdit(incidencia._id)}
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
                    onClick={() => onButtonClickRead(incidencia._id)}
                  >
                    <AiFillEye size={20}></AiFillEye>
                  </Button>
                  <Modal
                    initialFocusRef={initialRef}
                    finalFocusRef={finalRef}
                    isOpen={isOpen}
                    onClose={onClose}
                  >
                    <ModalIncidenciaMedica
                      tipoAccion={tipoAccion}
                      incidenciaEditar={id}
                    ></ModalIncidenciaMedica>
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
                Propiedad
              </AlertDialogHeader>

              <AlertDialogBody>¿Desea eliminarlo?</AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onCloseAlert}>
                  Cancelar
                </Button>
                <Button
                  colorScheme="red"
                  onClick={() => onButtonClickDelete(id)}
                  ml={3}
                >
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
export default IncidenciaMedica;
