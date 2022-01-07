
import ShowAlert from "../Alerts/ShowAlert";
import axios from "axios";
import {
  Input,
  FormControl,
  Flex,
  Text,
  Box,
  CheckboxGroup,
  HStack,
  Checkbox,
  Button,
  Switch,
} from "@chakra-ui/react";
import { useRef, useState, useEffect, useContext } from "react";
import PasswordInput from "../autentificacion/PasswordInput";

import { useRouter } from "next/router";
import ContextoUsuario from "../../Provider/providerUsuario";
const RegistroComponent = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState(false);
  const [showValidation, setEmailValidation] = useState(false);
  const [enableButton, setEnabledButton] = useState(false);
  const checkRef = useRef();
  const rolesUserRef = useRef();
  const rolesModeratorRef = useRef();
  const rolesAdminRef = useRef();

  const router = useRouter();
  const emailRef = useRef();
  const usernameValue = useRef();
  const passwordValue = useRef();
  const passwordSecondValue = useRef();
  const { setUsuario } = useContext(ContextoUsuario);

  const onButtonClick = async () => {
    const roles = [];
    rolesUserRef ? roles.push("user") : null;
    rolesModeratorRef ? roles.push("moderator") : null;
    rolesAdminRef ? roles.push("admin") : null;
    const datos = {
      username: usernameValue.current.value,
      email: emailRef.current.value,
      password: passwordValue.current.value,
      roles: roles,
    };
    if (checkRef.current.checked) {
      if (passwordValue.current.value == passwordSecondValue.current.value) {
        const result = await axios
          .post("http://localhost:4000/api/auth/signup", datos, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .catch(function (error) {
            if (error.response) {
              setShowAlert(true);
              setAlertMsg(error.response.data.message);
            }
          });
        const result2 = await axios
          .post(
            "http://localhost:4000/api/auth/signin",
            {
              email: datos.email,
              password: datos.password,
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
        localStorage.setItem("User", result2.data.userFound.username);
        localStorage.setItem("Email", result2.data.userFound.email);
        localStorage.setItem("AuthToken", result2.data.token);
        setUsuario(result2.data.userFound.username);
        router.push({
          pathname: "/",
          query: { returnUrl: router.asPath },
        });
      } else {
        setShowAlert(true);
        setAlertMsg("Las contraseñas no coinciden");
      }
    } else {
      setShowAlert(true);
      setAlertMsg("Obligatorio aceptar los terminos");
    }
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
    console.log("usefectalertmsg", alertMsg)
    console.log("usefectshow", showAlert)

  }, [alertMsg, showAlert]);
  useEffect(() => {
    validateEmail(emailRef.current.value);
  }, []);
  return (
    <>
      <Flex justifyContent="center" mt="75px">
        <Box
          w="30%"
          bgGradient="linear(to-r, green.200, green.500)"
          p={4}
          color="black"
          alignItems="center"
          align="center"
          borderRadius="20px"
        >
          <Text as="ins" fontSize="6xl" align="center">
            Registro
          </Text>
          <FormControl id="registro" mb={4}>
            <Text fontSize="2xl" color="black">
              {" "}
              Nombre de usuario
            </Text>
            <Input
              fontSize="23px"
              ref={usernameValue}
              type="text"
              placeholder="username"
              w="400px"
              bg="white"
              color="black"
            />
            <Text fontSize="2xl" color="black">
              {" "}
              Email
            </Text>
            <Input
              fontSize="23px"
              ref={emailRef}
              type="email"
              colorScheme="blue"
              placeholder="example@hola.on"
              w="400px"
              bg="white"
              color="black"
              onChange={() => validateEmail(emailRef.current.value)}
            />
            {showValidation && (
              <Text fontSize="2xl" textColor="tomato">
                Email invalido
              </Text>
            )}

            <PasswordInput
              text="Contraseña"
              passwordRef={passwordValue}
              setEnabledButton={setEnabledButton}
            ></PasswordInput>
            <PasswordInput
              text="Repite la contraseña"
              passwordRef={passwordSecondValue}
              setEnabledButton={setEnabledButton}
            ></PasswordInput>

            <CheckboxGroup colorScheme="blue" defaultValue={["user"]}>
              <Text fontSize="2xl" color="black">
                {" "}
                Roles
              </Text>
              <HStack mb="4" justifyContent="center">
                <Checkbox ref={rolesUserRef} color="black" value="user">
                  User
                </Checkbox>
                <Checkbox
                  ref={rolesModeratorRef}
                  color="black"
                  value="moderator"
                >
                  Moderator
                </Checkbox>
                <Checkbox ref={rolesAdminRef} color="black" value="admin">
                  Admin
                </Checkbox>
              </HStack>
            </CheckboxGroup>
            <Box>
              <Text fontSize="2xl" color="black">
                Terminos y licencias
                <Switch id="email-alerts" m="2" ref={checkRef} />
              </Text>
            </Box>

              <Button
                onClick={onButtonClick}
                colorScheme="teal"
                variant="outline"
                isDisabled={enableButton}
              >
                Registrarme
              </Button>
          </FormControl>
          
        </Box>
      </Flex>
      {showAlert && (
            <ShowAlert closeAlert={closeAlert} AlertMsg={alertMsg} />
          )}
    </>
  );
};
export default RegistroComponent;
