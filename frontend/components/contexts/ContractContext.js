import { createContext, useContext, useState } from 'react';

const ContractContext = createContext();

export const ContractContextProvider = ({ children }) => {
    const [contractContext, setContractContext] = useState(null);

    return (
        <ContractContext.Provider value={{ contractContext, setContractContext }}>{children}</ContractContext.Provider>
    );
};

export const useContractContext = () => useContext(ContractContext);
