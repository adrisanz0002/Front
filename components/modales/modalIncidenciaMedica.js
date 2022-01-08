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
const ModalIncidenciaMedica = ({ tipoAccion, incidenciaEditar }) => {
  const pacienteValue = useRef();
  const sanitarioValue = useRef();
  const especialidadValue = useRef();
  const descripcionValue = useRef();
  const hospitalValue = useRef();
  const fechaValue = useRef();
  const [showObligadoValidation, setObligatorioValidation] = useState(false);
  const [enableButton, setEnabledButton] = useState(true);
  const [alertMsg, setAlertMsg] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [incidencia, setIncidencia] = useState("undefined");
  const [isReadOnly, setIsReadonly] = useState(false);

  const router = useRouter();
  const getIncidenciaById = async () => {
    const resultado = await axios
      .get(`http://localhost:4000/api/incidenciasMedicas/` + incidenciaEditar)
      .then((res) => {
        res.data.fecha =
          res.data.fecha.substring(0, 4) +
          "-" +
          res.data.fecha.substring(5, 7) +
          "-" +
          res.data.fecha.substring(8, 10);
        setIncidencia(res.data);
      });
  };

  const validarObligatorios = () => {
    if (
      pacienteValue.current.value == "" ||
      sanitarioValue.current.value == "" ||
      especialidadValue.current.value == "" ||
      descripcionValue.current.value == "" ||
      hospitalValue.current.value == "" ||
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
      getIncidenciaById();
      setIsReadonly(false);
    }
    if (tipoAccion === "read") {
      getIncidenciaById();
      setIsReadonly(true);
    }
  }, []);
  const onButtonClick = async () => {
    const datos = {
      paciente: pacienteValue.current.value,
      sanitario: sanitarioValue.current.value,
      especialidad: especialidadValue.current.value,
      descripcion: descripcionValue.current.value,
      hospital: hospitalValue.current.value,
      fecha: fechaValue.current.value,
    };
    if (tipoAccion === "editar") {
      const resultado = await axios
        .put(
          `http://localhost:4000/api/incidenciasMedicas/` + incidenciaEditar,
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
        pathname: "/incidenciaMedica",
        query: { returnUrl: router.asPath },
      });
    } else if (tipoAccion === "add") {
      const resultado = await axios
        .post(`http://localhost:4000/api/incidenciasMedicas`, datos, {
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
          pathname: "/incidenciaMedica",
          query: { returnUrl: router.asPath },
        });
      }
    }
  };
  return (
    <>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Incidencia Medica</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Paciente</FormLabel>
            <Input
              mb="10px"
              placeholder="paciente"
              onChange={() => validarObligatorios()}
              defaultValue={incidencia.paciente}
              readOnly={isReadOnly}
              ref={pacienteValue}
            />
            <FormLabel>Santario</FormLabel>
            <Input
              mb="10px"
              placeholder="sanitario"
              onChange={() => validarObligatorios()}
              defaultValue={incidencia.sanitario}
              readOnly={isReadOnly}
              ref={sanitarioValue}
            />
            <FormLabel>Especialidad</FormLabel>
            <Input
              mb="10px"
              placeholder="especialidad"
              onChange={() => validarObligatorios()}
              defaultValue={incidencia.especialidad}
              readOnly={isReadOnly}
              ref={especialidadValue}
            />
            <FormLabel>Descripcion</FormLabel>
            <Input
              mb="10px"
              placeholder="descripcion"
              onChange={() => validarObligatorios()}
              defaultValue={incidencia.descripcion}
              readOnly={isReadOnly}
              ref={descripcionValue}
            />
            <FormLabel>Hospital</FormLabel>
            <Input
              mb="10px"
              placeholder="hospital"
              onChange={() => validarObligatorios()}
              defaultValue={incidencia.hospital}
              readOnly={isReadOnly}
              ref={hospitalValue}
            />
            <FormLabel>Fecha</FormLabel>
            <Input
              mb="10px"
              type="date"
              placeholder="fecha"
              onChange={() => validarObligatorios()}
              defaultValue={incidencia.fecha}
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
            visibility={false}
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

export default ModalIncidenciaMedica;
