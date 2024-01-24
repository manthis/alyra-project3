// AuthContext.js
import { createContext, useContext, useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState(null);
    const { address, isConnected } = useAccount();

    // We need to call owner() of the contract to check if the user is an admin (we need to memoize the result but update it from time to time probably once the user is connected

    useEffect(() => {
        // TODO: find if the user is an admin and/or a voter or just a guest

        const userData = {
            isConnected: isConnected,
            data: {
                address: address,
            },
        };

        setAuthState(userData);
    }, [isConnected]);

    return <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
