import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import  {userService}  from "../../services/userService";

export { RouteGuard };

function RouteGuard({ children }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    authCheck(router.asPath);

    const hideContent = () => setAuthorized(false);
    router.events.on("routeChangeStart", hideContent);

    router.events.on("routeChangeComplete", authCheck);

    return () => {
      router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", authCheck);
    };

  }, []);

  function authCheck(url) {
    const publicPaths = ["/autentificacion","/registro"];
    const path = url.split("?")[0];
    if (!userService.getUserName() && !publicPaths.includes(path)) {
      setAuthorized(false);
      router.push({
        pathname: "/autentificacion",
        query: { returnUrl: router.asPath },
      });
    } else {
      setAuthorized(true);
    }
  }

  return authorized && children;
}
