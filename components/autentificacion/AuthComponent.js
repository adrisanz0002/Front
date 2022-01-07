import { Stack, Text } from "@chakra-ui/react";
import PasswordInput from "./PasswordInput";
import { useRef, useState, useEffect, useContext } from "react";
import { FormControl, Flex, Input, Button, Box, Alert,
  AlertIcon, } from "@chakra-ui/react";
import axios from "axios";
import ShowAlert from "../Alerts/ShowAlert";
import Link from "next/link";
import { useRouter } from "next/router";
import ContextoUsuario from "../../Provider/providerUsuario";
const AuthComponent = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState(false);
  const [showValidation, setEmailValidation] = useState(false);
  const [enableButton, setEnabledButton] = useState(false);
  const emailRef = useRef();
  const passwordValue = useRef();
  const router = useRouter();
  const {setUsuario} = useContext(ContextoUsuario)

  const onButtonClick = async () => {
    const result = await axios
      .post(
        "http://localhost:4000/api/auth/signin",
        {
          email: emailRef.current.value,
          password: passwordValue.current.value,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .catch(function (error) {
        if (error.response) {
          setShowAlert(true);
          setAlertMsg(error.response.data.message);
        }
      });
    console.log(result.data);
    localStorage.setItem("User", result.data.userFound.username);
    localStorage.setItem("Email", result.data.userFound.email);
    localStorage.setItem("AuthToken", result.data.token);
    setUsuario(result.data.userFound.username)

    router.push({
      pathname: "/",
      query: { returnUrl: router.asPath },
    });
  };
  const closeAlert = () => {
    setShowAlert(false);
  };
  const validateEmail = (email) => {
    const resultValidation = !String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    setEmailValidation(resultValidation);
  };
  useEffect(() => {
    validateEmail(emailRef.current.value);
  }, []);
  return (
    <>
      <Stack mt="20px" mb="35px">
        <Alert status="info">
          <AlertIcon />
          Para hacer cualquier gestion debe estar autentificado!!
        </Alert>
      </Stack>
      <Flex justifyContent="center">
        <Box
          w="40%"
          bgGradient="linear(to-r, green.200, green.500)"
          p={4}
          color="black"
          alignItems="center"
          align="center"
          borderRadius="20px"
        >
          <Text fontSize="6xl" align="center" color="black">
            Inicio de sesion
          </Text>
          <FormControl id="email" mb={4}>
            <Text fontSize="2xl" color="black">
              {" "}
              Email
            </Text>
            <Input
              fontSize="23px"
              ref={emailRef}
              type="email"
              bg="white"
              placeholder="example@hola.on"
              w="400px"
              color="black"
              onChange={() => validateEmail(emailRef.current.value)}
            />
            {showValidation && (
              <Text fontSize="2xl" textColor="tomato">
                El correo es inválido
              </Text>
            )}
            <PasswordInput
              text="Contraseña"
              passwordRef={passwordValue}
              setEnabledButton={setEnabledButton}
            ></PasswordInput>
          </FormControl>
          <Button
            onClick={onButtonClick}
            colorScheme="teal"
            isDisabled={enableButton}
            variant="outline"
            margin="2px"
          >
            iniciar sesión
          </Button>
          {showAlert && (
            <ShowAlert closeAlert={closeAlert} AlertMsg={alertMsg} />
          )}
          <Box>
            <Link  href="/registro">
              ¿Todavía no estas registrado?
            </Link>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default AuthComponent;
