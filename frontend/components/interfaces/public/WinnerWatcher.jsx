import { useAuthContext } from "@/components/contexts/AuthContext";
import { useContractContext } from "@/components/contexts/ContractContext";
import { getOneProposal } from "@/components/contract/ContractService";
import VotingABI from "@/components/contract/VotingAbi";
import { useEffect, useState } from "react";
import { useContractRead } from "wagmi";

const WinnerWatcher = () => {
    const { contractContext, setContractContext } = useContractContext();
    const [winningProposal, setWinningProposal] = useState(null);
    const user = useAuthContext();

    // WinningProposalID
    const { data: winningProposalID, isSuccess: isWinningSuccess } =
        useContractRead({
            address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
            abi: VotingABI,
            functionName: "winningProposalID",
            account: user?.data.address,
            watch: true,
        });

    // We update the state and ContractContext
    useEffect(() => {
        const getResults = async () => {
            try {
                const winningProposalNumber = Number(winningProposalID);
                const description = await getOneProposal(
                    winningProposalNumber,
                    user?.data.address
                );
                setWinningProposal({
                    id: winningProposalNumber,
                    desc: description,
                });
                setContractContext((prevContractContext) => ({
                    ...prevContractContext,
                    winningProposalID: winningProposalNumber,
                }));
            } catch (error) {
                console.log(error.message);
            }
        };
        getResults();
    }, [winningProposalID]);

    return (
        <>
            {contractContext?.workflowStatus === 5 && (
                <div className="bg-emerald-500 rounded-full flex justify-center items-center py-2 px-8 text-white ml-2 font-bold fixed top-60 z-50 animate-pulse">
                    Winning proposal: "{winningProposal?.desc}"
                </div>
            )}
        </>
    );
};

export default WinnerWatcher;
