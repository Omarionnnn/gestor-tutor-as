import React, { createContext, useState, useContext } from 'react';

const UnicoinsContext = createContext();

export const UnicoinsProvider = ({ children }) => {
    const [unicoins, setUnicoins] = useState(0);

    return (
        <UnicoinsContext.Provider value={{ unicoins, setUnicoins }}>
            {children}
        </UnicoinsContext.Provider>
    );
};

export const useUnicoins = () => useContext(UnicoinsContext);
