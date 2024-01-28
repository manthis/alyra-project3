// AuthContext.js
import { createContext, useContext, useEffect, useState } from 'react';
import { useAccount, useContractRead } from 'wagmi';
import VotingABI from '../contract/VotingAbi';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [authState, setAuthState] = useState(null);
    const { address, isConnected } = useAccount();

    // If we have no user connected it is not useful to continue (and this way we prevent errors)
    if (!address) return <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>;

    const { data: ownerAddress, isSuccess: isOwnerCheckSuccess } = useContractRead({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        abi: VotingABI,
        functionName: 'owner',
        account: address, // We need to pass the user's address
    });
    const { isSuccess: isVoterCheckSuccess } = useContractRead({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        abi: VotingABI,
        functionName: 'getVoter',
        account: address, // We need to pass the user's address
        args: [address],
        onError(error) {
            if (!error.message.includes("You're not a voter")) {
                console.log(error);
            }
        },
    });

    useEffect(() => {
        const userData = {
            isConnected: isConnected,
            data: {
                address: address,
                isOwner: isOwnerCheckSuccess && ownerAddress === address ? true : false,
                isVoter: isVoterCheckSuccess ? true : false,
            },
        };

        setAuthState(userData);
    }, [isConnected]);

    return <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
