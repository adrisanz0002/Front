import React, { useState, useEffect } from "react";
import {
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Button,
} from "@chakra-ui/react";

const PasswordInput = ({ passwordRef, setEnabledButton, text }) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const [showValidation, setShowValidation] = useState(false);

  const validatePassword = (password) => {
    var passw = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    setShowValidation(!password.match(passw));
    setEnabledButton(!password.match(passw));
  };
  useEffect(() => {
    validatePassword(passwordRef.current.value);
  }, []);
  return (
    <div>
      <Text fontSize="2xl" color="black"> {text}</Text>
      <InputGroup size="md" w="400px">
        <Input
          fontSize="23px"
          pr="4.5rem"
          type={show ? "text" : "password"}
          placeholder="Introduce la contraseña"
          ref={passwordRef}
          bg="whhite"
          onChange={() => validatePassword(passwordRef.current.value)}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" bg="white" color="black" onClick={handleClick}>
            {show ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
      {showValidation && (
        <Text fontSize="2xl" textColor="tomato">
          Contraseña no válida
        </Text>
      )}
    </div>
  );
};
export default PasswordInput;
