import { useContractContext } from "@/components/contexts/ContractContext";
import { WorkflowStatus } from "@/components/contract/WorkflowStatuses";
import { useEffect, useState } from "react";
import { useContractRead } from "wagmi";
import VotingABI from "../../contract/VotingAbi";

const PublicSection = () => {
    // const contractContext = useContext(ContractContext);
    const { contractContext, setContractContext } = useContractContext();
    const [workflowStatusState, setWorkflowStatusState] = useState(null);
    const [winningProposalIDState, setWinningProposalIDState] = useState(null);

    // WorkflowStatus
    const { data: workflowStatus, isSuccess: isWorkflowStatusSuccess } =
        useContractRead({
            address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
            abi: VotingABI,
            functionName: "workflowStatus",
        });

    let workflowStatusText = "";
    if (isWorkflowStatusSuccess) {
        workflowStatusText = WorkflowStatus[workflowStatus];
    }

    // WinningProposalID
    const { data: winningProposalID, isSuccess: isWinningSuccess } =
        useContractRead({
            address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
            abi: VotingABI,
            functionName: "winningProposalID",
        });

    let winner = 0;
    if (isWinningSuccess && winningProposalID) {
        winner = parseInt(winningProposalID, 10);
    }

    // We update the state and ContractContext
    useEffect(() => {
        setWorkflowStatusState(workflowStatusText);
        setWinningProposalIDState(winner);
        setContractContext({
            workflowStatus: workflowStatus,
            workflowStatusText: workflowStatusText,
            winningProposalID: winner,
        });
    }, [winningProposalID, workflowStatus]);

    return (
        <div className="border-2 border-slate-600 rounded-lg w-full flex flex-col justify-center items-center p-4">
            <h1 className="text-xl p-2 font-extrabold">Voting Information</h1>

            <div className="bg-blue-500 rounded-full flex justify-center items-center py-2 px-8 text-white m-2 font-bold">
                {workflowStatusState}
            </div>

            {/** TODO: If there is a winner we must look for his address using getVoter with wagmi core I think it will be more easy  (to be written using useCallback */}
            {winner !== 0 && (
                <div className="bg-red-500 rounded-full flex justify-center items-center py-2 px-8 text-white ml-2 font-bold">
                    Winner: {winner}
                </div>
            )}

            {/** TODO: we must display the logs but only since the beginning of the voting session (the creation of our contrat would be ok) */}
            <div>Logs</div>
        </div>
    );
};

export default PublicSection;
