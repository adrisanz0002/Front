import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    CloseButton,
  } from "@chakra-ui/react";
const ShowAlert = ({ AlertMsg, closeAlert }) => {
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle mr={2}>!ERROR!</AlertTitle>
        <AlertDescription>{AlertMsg}</AlertDescription>
        <CloseButton
          onClick={() => closeAlert()}
          position="absolute"
          right="8px"
          top="8px"
        />
      </Alert>
    );
  };
  export default ShowAlert;
  