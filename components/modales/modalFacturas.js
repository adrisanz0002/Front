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
import React from "react";
import { useRouter } from "next/router";
import axios from "axios";
import ShowAlert from "../Alerts/ShowAlert";
import { useRef, useState, useEffect, useContext } from "react";
const ModalFactura = ({ tipoAccion, facturaEditar }) => {
  const nombreValue = useRef();
  const apellidosValue = useRef();
  const empresaValue = useRef();
  const categoriaValue = useRef();
  const importeValue = useRef();
  const direccionValue = useRef();
  const telefonoValue = useRef();
  const fechaValue = useRef();

  const router = useRouter();
  const [showObligadoValidation, setObligatorioValidation] = useState(false);
  const [showImporteValidation, setImporteValidation] = useState(false);
  const [showTlfValidation, setTlfValidation] = useState(false);
  const [alertMsg, setAlertMsg] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [enableButton, setEnabledButton] = useState(true);
  const [factura, setFactura] = useState("undefined");
  const [isReadOnly, setIsReadonly] = useState(false);
  const { onClose } = useDisclosure();
  const getFacturaById = async () => {
    const resultado = await axios
      .get(`http://localhost:4000/api/facturas/` + facturaEditar)
      .then((res) => {
        res.data.fecha =
          res.data.fecha.substring(0, 4) +
          "-" +
          res.data.fecha.substring(5, 7) +
          "-" +
          res.data.fecha.substring(8, 10);
        setFactura(res.data);
      });
  };
  useEffect(() => {
    if (tipoAccion === "editar") {
      getFacturaById();
      setIsReadonly(false);
    }
    if (tipoAccion === "read") {
      getFacturaById();
      setIsReadonly(true);
    }
  }, []);

  const onButtonClick = async () => {
    const datos = {
      nombre: nombreValue.current.value,
      apellidos: apellidosValue.current.value,
      empresa: empresaValue.current.value,
      categoria: categoriaValue.current.value,
      importe: importeValue.current.value,
      direccion: direccionValue.current.value,
      telefono: telefonoValue.current.value,
      fecha: fechaValue.current.value,
    };
    if (tipoAccion === "editar") {
      const resultado = await axios
        .put(`http://localhost:4000/api/facturas/` + facturaEditar, datos, {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("AuthToken"),
          },
        })
        .catch(function (error) {
          if (error.response) {
            console.log(error.response.data.message);
            setShowAlert(true);
            setAlertMsg(error.response.data.message);
          }
        });
      router.push({
        pathname: "/factura",
        query: { returnUrl: router.asPath },
      });
    } else if (tipoAccion === "add") {
      const resultado = await axios
        .post(`http://localhost:4000/api/facturas`, datos, {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("AuthToken"),
          },
        })
        .catch(function (error) {
          if (error.response) {
            console.log(error.response.data.message);
            setShowAlert(true);
            setAlertMsg(error.response.data.message);
          }
        });
      router.push({
        pathname: "/factura",
        query: { returnUrl: router.asPath },
      });
    }
  };
  const closeAlert = () => {
    setShowAlert(false);
  };
  const validateImporte = (importe) => {
    const re = /^[0-9\b]+$/;
    const resultValidation = re.test(importe);
    setImporteValidation(!resultValidation);
    console.log(resultValidation);
    validarObligatorios();
    if (showImporteValidation && showTlfValidation & showObligadoValidation) {
      setEnabledButton(!resultValidation);
    }
  };
  const validateTlf = (tlf) => {
    const re = /^[0-9\b]+$/;
    const resultValidation = re.test(tlf) && tlf.length == 9;
    setTlfValidation(!resultValidation);
    console.log(resultValidation);
    validarObligatorios();
    if (showImporteValidation && showTlfValidation & showObligadoValidation) {
      setEnabledButton(!resultValidation);
    }
  };
  const validarObligatorios = () => {
    console.log(nombreValue.current.value);
    if (
      nombreValue.current.value == "" ||
      apellidosValue.current.value == "" ||
      empresaValue.current.value == "" ||
      categoriaValue.current.value == "" ||
      importeValue.current.value == "" ||
      direccionValue.current.value == "" ||
      telefonoValue.current.value == "" ||
      fechaValue.current.value == ""
    ) {
      setObligatorioValidation(true);
      console.log("ola");
    } else {
      setObligatorioValidation(false);

      setEnabledButton(false);
    }
  };
  return (
    <>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Factura</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Nombre</FormLabel>
            <Input
              mb="10px"
              placeholder="nombre"
              defaultValue={factura.nombre}
              readOnly={isReadOnly}
              ref={nombreValue}
              onChange={() => validarObligatorios()}
            />
            <FormLabel>Apellidos</FormLabel>
            <Input
              mb="10px"
              placeholder="apellidos"
              defaultValue={factura.apellidos}
              readOnly={isReadOnly}
              ref={apellidosValue}
              onChange={() => validarObligatorios()}
            />
            <FormLabel>Empresa</FormLabel>
            <Input
              mb="10px"
              placeholder="empresa"
              defaultValue={factura.empresa}
              readOnly={isReadOnly}
              ref={empresaValue}
              onChange={() => validarObligatorios()}
            />
            <FormLabel>Categoría</FormLabel>
            <Input
              mb="10px"
              placeholder="categoria"
              defaultValue={factura.categoria}
              readOnly={isReadOnly}
              ref={categoriaValue}
              onChange={() => validarObligatorios()}
            />
            <FormLabel>Importe</FormLabel>
            <Input
              mb="10px"
              ref={importeValue}
              defaultValue={factura.importe}
              readOnly={isReadOnly}
              onChange={() => validateImporte(importeValue.current.value)}
            />
            {showImporteValidation && (
              <Text fontSize="2xl" textColor="tomato">
                El importe debe ser numerico
              </Text>
            )}
            <FormLabel>Direccion</FormLabel>
            <Input
              mb="10px"
              placeholder="direccion"
              defaultValue={factura.direccion}
              readOnly={isReadOnly}
              ref={direccionValue}
              onChange={() => validarObligatorios()}
            />

            <FormLabel>Telefono</FormLabel>
            <InputGroup>
              <InputLeftAddon>
              +234</InputLeftAddon>
              <Input
                type="tel"
                placeholder="phone number"
                mb="10px"
                defaultValue={factura.telefono}
                readOnly={isReadOnly}
                ref={telefonoValue}
                onChange={() => validateTlf(telefonoValue.current.value)}
              />
            </InputGroup>

            {showTlfValidation && (
              <Text fontSize="2xl" textColor="tomato">
                El teléfono no es valido
              </Text>
            )}
            <FormLabel>Fecha</FormLabel>
            <Input
              mb="10px"
              type="date"
              defaultValue={factura.fecha}
              readOnly={isReadOnly}
              ref={fechaValue}
              onChange={() => validarObligatorios()}
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
export default ModalFactura;
