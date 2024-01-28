import { createContext, useContext, useEffect, useState } from 'react';
import { useAccount, useContractRead } from 'wagmi';
import VotingABI from '../contract/VotingAbi';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [authState, setAuthState] = useState(null);
    const { address, isConnected } = useAccount();

    const ownerAddressData = useContractRead({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        abi: VotingABI,
        functionName: 'owner',
        account: address,
        enabled: !!address, // enable the hook only if address is not null (we convert it to a boolean using !!)
    });

    const voterCheckData = useContractRead({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        abi: VotingABI,
        functionName: 'getVoter',
        account: address,
        enabled: !!address, // enable the hook only if address is not null (we convert it to a boolean using !!)
        args: [address],
        onError(error) {
            if (!error.message.includes("You're not a voter")) {
                console.log(error);
            }
        },
    });

    const { data: ownerAddress, isSuccess: isOwnerCheckSuccess } = ownerAddressData;
    const { isSuccess: isVoterCheckSuccess } = voterCheckData;

    useEffect(() => {
        if (address) {
            const userData = {
                isConnected: isConnected,
                data: {
                    address: address,
                    isOwner: isOwnerCheckSuccess && ownerAddress === address ? true : false,
                    isVoter: isVoterCheckSuccess ? true : false,
                },
            };

            setAuthState(userData);
        } else {
            // Gérer le cas où address est null
            setAuthState(null);
        }
    }, [isConnected, address, isOwnerCheckSuccess, ownerAddress, isVoterCheckSuccess]);

    return <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
