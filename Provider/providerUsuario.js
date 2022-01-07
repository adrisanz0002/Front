import React, { createContext, useState } from 'react';

const ContextoUsuario = createContext(undefined);

export const ProviderUsuario = ({ children }) => {


  const [usuario, setUsuario] = useState(null);


    return (
      <ContextoUsuario.Provider
        value={{
          usuario,
          setUsuario,
        }}
      >
        { children }
      </ContextoUsuario.Provider>
    
    )
  
}

export default ContextoUsuario;
