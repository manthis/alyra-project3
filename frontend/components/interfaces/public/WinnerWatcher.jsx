import { useContractContext } from "@/components/contexts/ContractContext";
import { getOneProposal } from "@/components/contract/ContractService";
import VotingABI from "@/components/contract/VotingAbi";
import { useEffect, useState } from "react";
import { useContractRead } from "wagmi";

const WinnerWatcher = () => {
    const { contractContext, setContractContext } = useContractContext();
    const [winningProposal, setWinningProposal] = useState(null);

    // WinningProposalID
    const { data: winningProposalID, isSuccess: isWinningSuccess } =
        useContractRead({
            address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
            abi: VotingABI,
            functionName: "winningProposalID",
            watch: true,
        });

    // We update the state and ContractContext
    useEffect(() => {
        const getResults = async () => {
            try {
                const winningProposalNumber = Number(winningProposalID);
                const description = await getOneProposal(winningProposalNumber);
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
    }, [winningProposal]);

    // TODO If there is a winner we must look for his address using getVoter with wagmi core I think it will be more easy  (to be written using useCallback
    return (
        <>
            {winningProposal !== null && (
                <div className="bg-emerald-500 rounded-full flex justify-center items-center py-2 px-8 text-white ml-2 font-bold fixed top-60 z-50">
                    Winning proposal: {winningProposal.desc} with ID:{" "}
                    {winningProposal.id}
                </div>
            )}
        </>
    );
};

export default WinnerWatcher;
