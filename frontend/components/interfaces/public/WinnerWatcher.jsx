import { useContractContext } from "@/components/contexts/ContractContext";
import VotingABI from "@/components/contract/VotingAbi";
import { useEffect, useState } from "react";
import { useContractRead } from "wagmi";

const WinnerWatcher = () => {
    const { contractContext, setContractContext } = useContractContext();
    const [winningProposalIDState, setWinningProposalIDState] = useState(null);

    // WinningProposalID
    const { data: winningProposalID, isSuccess: isWinningSuccess } =
        useContractRead({
            address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
            abi: VotingABI,
            functionName: "winningProposalID",
            watch: true,
        });

    let winner = 0;
    if (isWinningSuccess && winningProposalID) {
        winner = parseInt(winningProposalID, 10);
    }

    // We update the state and ContractContext
    useEffect(() => {
        setWinningProposalIDState(winner);
        setContractContext((prevContractContext) => ({
            ...prevContractContext,
            winningProposalID: winner,
        }));
    }, [winningProposalID]);

    // TODO If there is a winner we must look for his address using getVoter with wagmi core I think it will be more easy  (to be written using useCallback

    return (
        <>
            {winner !== 0 && (
                <div className="bg-red-500 rounded-full flex justify-center items-center py-2 px-8 text-white ml-2 font-bold">
                    Winner: {winner}
                </div>
            )}
        </>
    );
};

export default WinnerWatcher;
