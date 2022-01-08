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
import ShowAlert from "../Alerts/ShowAlert";
import { useRouter } from "next/router";
import React from "react";
const ModalPropiedad = ({ tipoAccion, propiedadEditar }) => {
  const categoriaValue = useRef();
  const descripcionValue = useRef();
  const valorValue = useRef();
  const propietarioValue = useRef();
  const identificadorValue = useRef();
  const fechaValue = useRef();
  const [showObligadoValidation, setObligatorioValidation] = useState(false);

  const router = useRouter();
  const [alertMsg, setAlertMsg] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [enableButton, setEnabledButton] = useState(true);
  const [propiedad, setPropiedad] = useState("undefined");
  const [showImporteValidation, setImporteValidation] = useState(false);
  const [isReadOnly, setIsReadonly] = useState(false);
  const { onClose } = useDisclosure();

  useEffect(() => {
    if (tipoAccion === "editar") {
      getPropiedadById();
      setIsReadonly(false);
    }
    if (tipoAccion === "read") {
      getPropiedadById();
      setIsReadonly(true);
    }
  }, []);

  const closeAlert = () => {
    setShowAlert(false);
  };

  const getPropiedadById = async () => {
    const resultado = await axios
      .get(`http://localhost:4000/api/propiedades/` + propiedadEditar)
      .then((res) => {
        res.data.fechaAdquisicion =
          res.data.fechaAdquisicion.substring(0, 4) +
          "-" +
          res.data.fechaAdquisicion.substring(5, 7) +
          "-" +
          res.data.fechaAdquisicion.substring(8, 10);
        setPropiedad(res.data);
      });
  };
  const onButtonClick = async () => {
    const datos = {
      categoria: categoriaValue.current.value,
      descripcion: descripcionValue.current.value,
      valor: valorValue.current.value,
      propietario: propietarioValue.current.value,
      identificador: identificadorValue.current.value,
      fechaAdquisicion: fechaValue.current.value,
    };
    if (tipoAccion === "add") {
      const resultado = await axios
        .post(`http://localhost:4000/api/propiedades?`, datos, {
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
          pathname: "/propiedad",
          query: { returnUrl: router.asPath },
        });
      }
    } else if (tipoAccion === "editar") {
      const resultado = await axios
        .put(
          `http://localhost:4000/api/propiedades/` + propiedadEditar,
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
        pathname: "/propiedad",
        query: { returnUrl: router.asPath },
      });
    }
  };
  const validateValor = () => {
    const re = /^[0-9]+$/;
    const resultValidation = re.test(valorValue.current.value);
    setImporteValidation(!resultValidation);
    validarObligatorios();
    if (showImporteValidation && showObligadoValidation) {
      setEnabledButton(false);
    }
    return resultValidation;
  };
  const validarObligatorios = () => {
    if (
      categoriaValue.current.value == "" ||
      descripcionValue.current.value == "" ||
      valorValue.current.value == "" ||
      propietarioValue.current.value == "" ||
      identificadorValue.current.value == "" ||
      fechaValue.current.value == ""
    ) {
      setObligatorioValidation(true);
    } else {
      setObligatorioValidation(false);
      if (validateValor) {
        setEnabledButton(false);
      }
    }
  };
  return (
    <>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Propiedad</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Categoria</FormLabel>
            <Input
              mb="10px"
              placeholder="categoria"
              onChange={() => validarObligatorios()}
              defaultValue={propiedad.categoria}
              readOnly={isReadOnly}
              ref={categoriaValue}
            />
            <FormLabel>Descripcion</FormLabel>
            <Input
              mb="10px"
              placeholder="descripcion"
              onChange={() => validarObligatorios()}
              defaultValue={propiedad.descripcion}
              readOnly={isReadOnly}
              ref={descripcionValue}
            />
            <FormLabel>Valor</FormLabel>
            <Input
              mb="10px"
              placeholder="€"
              onChange={() => validateValor()}
              defaultValue={propiedad.valor}
              readOnly={isReadOnly}
              ref={valorValue}
            />
            {showImporteValidation && (
              <Text fontSize="2xl" textColor="tomato">
                Valor inválido
              </Text>
            )}
            <FormLabel>Propietario</FormLabel>
            <Input
              mb="10px"
              placeholder="propietario"
              onChange={() => validarObligatorios()}
              defaultValue={propiedad.propietario}
              readOnly={isReadOnly}
              ref={propietarioValue}
            />
            <FormLabel>Identificador</FormLabel>
            <Input
              mb="10px"
              placeholder="identificador"
              onChange={() => validarObligatorios()}
              defaultValue={propiedad.identificador}
              readOnly={isReadOnly}
              ref={identificadorValue}
            />
            <FormLabel>Fecha</FormLabel>
            <Input
              mb="10px"
              type="date"
              onChange={() => validarObligatorios()}
              defaultValue={propiedad.fechaAdquisicion}
              readOnly={isReadOnly}
              ref={fechaValue}
            />
          </FormControl>
        </ModalBody>
        <ModalCloseButton />
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
export default ModalPropiedad;
