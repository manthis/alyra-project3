import { useContractContext } from "@/components/contexts/ContractContext";
import VotingABI from "@/components/contract/VotingAbi";
import { getPublicClient } from "@wagmi/core";
import { useEffect, useState } from "react";

const WinnerWatcher = () => {
    const { contractContext, setContractContext } = useContractContext();
    const [winningProposal, setWinningProposal] = useState(null);

    useEffect(() => {
        const getWinningProposition = async () => {
            try {
                const publicClient = getPublicClient();
                const winningId = await publicClient.readContract({
                    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
                    abi: VotingABI,
                    functionName: "winningProposalID",
                });

                const winningProposalId = Number(winningId);

                const data = await publicClient.readContract({
                    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
                    abi: VotingABI,
                    functionName: "getOneProposal",
                    args: [winningProposalId],
                });

                setWinningProposal(data.description);
            } catch (error) {
                console.log(error.message);
            }
        };

        getWinningProposition();
    }, [contractContext?.workflowStatus]);

    return (
        <>
            {contractContext?.workflowStatus === 5 && (
                <div className="bg-emerald-500 rounded-full flex justify-center items-center py-2 px-8 text-white ml-2 font-bold fixed top-60 z-50 animate-pulse">
                    Winning proposal: "{winningProposal}"
                </div>
            )}
        </>
    );
};

export default WinnerWatcher;
