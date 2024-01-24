// AuthContext.js
import { createContext, useContext, useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState(null);
    const { address, isConnected } = useAccount();

    useEffect(() => {
        /*
        // Simulons une vérification d'authentification
        const userData = {
            address: 'John Doe',
            isAdmin: false,
            isVoter: false,
        };

        setAuthState({ user: userData });

        console.log(`Simulated auth...`);
        */

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
