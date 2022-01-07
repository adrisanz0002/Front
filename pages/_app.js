import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";
import { RouteGuard } from "../components/autentificacion/RouteGuard";
import Footer from "../components/footer/footer";
import NavBar from "../components/Navigation/NavBar";
import { ProviderUsuario } from "../Provider/providerUsuario";
function MyApp({ Component, pageProps }) {
  const initialState = { ususario: undefined, setUsuario: () => {} };

  return (
    <ChakraProvider>
      <ProviderUsuario>
        <Head><title>Hogarnizate</title></Head>
        <NavBar></NavBar>
        <RouteGuard>
          <Component {...pageProps} />
        </RouteGuard>
      </ProviderUsuario>
      <Footer></Footer>
    </ChakraProvider>
  );
}

export default MyApp;
