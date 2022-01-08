import { useRef, useState, useEffect, useContext } from "react";
import {
  Button,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Text,
  InputLeftAddon,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import ShowAlert from "../Alerts/ShowAlert";
const ModalOtraIncidencia = ({ tipoAccion, otraIncidenciaEditar }) => {
  const nombreValue = useRef();
  const apellidosValue = useRef();
  const categoriaValue = useRef();
  const descripcionValue = useRef();
  const fechaValue = useRef();
  const [showObligadoValidation, setObligatorioValidation] = useState(false);
  const [enableButton, setEnabledButton] = useState(true);
  const [alertMsg, setAlertMsg] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [otraIncidencia, setOtraIncidencia] = useState("undefined");
  const [isReadOnly, setIsReadonly] = useState(false);

  const router = useRouter();
  const getOtraIncidenciaById = async () => {
    const resultado = await axios
      .get(`http://localhost:4000/api/otraIncidencia/` + otraIncidenciaEditar)
      .then((res) => {
        res.data.fecha =
          res.data.fecha.substring(0, 4) +
          "-" +
          res.data.fecha.substring(5, 7) +
          "-" +
          res.data.fecha.substring(8, 10);
        setOtraIncidencia(res.data);
      });
  };

  const validarObligatorios = () => {
    if (
      nombreValue.current.value == "" ||
      apellidosValue.current.value == "" ||
      categoriaValue.current.value == "" ||
      descripcionValue.current.value == "" ||
      fechaValue.current.value == ""
    ) {
      setObligatorioValidation(true);
    } else {
      setObligatorioValidation(false);
      setEnabledButton(false);
    }
  };

  const closeAlert = () => {
    setShowAlert(false);
  };

  useEffect(() => {
    if (tipoAccion === "editar") {
      getOtraIncidenciaById();
      setIsReadonly(false);
    }
    if (tipoAccion === "read") {
      getOtraIncidenciaById();
      setIsReadonly(true);
    }
  }, []);

  const onButtonClick = async () => {
    const datos = {
      nombre: nombreValue.current.value,
      apellidos: apellidosValue.current.value,
      categoria: categoriaValue.current.value,
      descripcion: descripcionValue.current.value,
      fecha: fechaValue.current.value,
    };
    if (tipoAccion === "editar") {
      const resultado = await axios
        .put(
          `http://localhost:4000/api/otraIncidencia/` + otraIncidenciaEditar,
          datos,
          {
            headers: {
              "Content-Type": "application/json",
              "x-access-token": localStorage.getItem("AuthToken"),
            },
          }
        )
        .catch(function (error) {
          if (error.response) {
            setShowAlert(true);
            setAlertMsg(error.response.data.message);
          }
        });
      router.push({
        pathname: "/otraIncidencia",
        query: { returnUrl: router.asPath },
      });
    } else if (tipoAccion === "add") {
      const resultado = await axios
        .post(`http://localhost:4000/api/otraIncidencia`, datos, {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("AuthToken"),
          },
        })
        .catch(function (error) {
          if (error.response) {
            setShowAlert(true);
            setAlertMsg(error.response.data.message);
          }
        });
      if (!showAlert) {
        router.push({
          pathname: "/otraIncidencia",
          query: { returnUrl: router.asPath },
        });
      }
    }
  };
  return (
    <>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Otra Incidencia </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Nombre</FormLabel>
            <Input
              mb="10px"
              placeholder="nombre"
              onChange={() => validarObligatorios()}
              defaultValue={otraIncidencia.nombre}
              readOnly={isReadOnly}
              ref={nombreValue}
            />
            <FormLabel>Apellidos</FormLabel>
            <Input
              mb="10px"
              placeholder="apellidos"
              onChange={() => validarObligatorios()}
              defaultValue={otraIncidencia.apellidos}
              readOnly={isReadOnly}
              ref={apellidosValue}
            />
            <FormLabel>Categoria</FormLabel>
            <Input
              mb="10px"
              placeholder="categoria"
              onChange={() => validarObligatorios()}
              defaultValue={otraIncidencia.categoria}
              readOnly={isReadOnly}
              ref={categoriaValue}
            />
            <FormLabel>Descripcion</FormLabel>
            <Input
              mb="10px"
              placeholder="descripcion"
              onChange={() => validarObligatorios()}
              defaultValue={otraIncidencia.descripcion}
              readOnly={isReadOnly}
              ref={descripcionValue}
            />
            <FormLabel>Fecha</FormLabel>
            <Input
              mb="10px"
              type="date"
              placeholder="fecha"
              onChange={() => validarObligatorios()}
              defaultValue={otraIncidencia.fecha}
              readOnly={isReadOnly}
              ref={fechaValue}
            />
          </FormControl>
        </ModalBody>
        {showAlert && <ShowAlert closeAlert={closeAlert} AlertMsg={alertMsg} />}
        {showObligadoValidation && (
          <Text fontSize="2xl" textColor="tomato">
            Todos los campos son obligatorios
          </Text>
        )}
        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={onButtonClick}
            isDisabled={enableButton}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </>
  );
};
export default ModalOtraIncidencia;
