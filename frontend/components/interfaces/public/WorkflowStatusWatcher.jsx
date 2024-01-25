import { useContractContext } from "@/components/contexts/ContractContext";
import VotingABI from "@/components/contract/VotingAbi";
import { WorkflowStatus } from "@/components/contract/WorkflowStatuses";
import { useEffect, useState } from "react";
import { useContractRead } from "wagmi";

const WorkflowStatusWatcher = () => {
    const { contractContext, setContractContext } = useContractContext();
    const [workflowStatusState, setWorkflowStatusState] = useState(null);
    const [style, setStyle] = useState(
        "bg-blue-500 rounded-full flex justify-center items-center py-2 px-8 text-white m-2 font-bold"
    );

    // WorkflowStatus
    const { data: workflowStatus, isSuccess: isWorkflowStatusSuccess } =
        useContractRead({
            address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
            abi: VotingABI,
            functionName: "workflowStatus",
            watch: true,
        });

    let workflowStatusText = "";
    if (isWorkflowStatusSuccess) {
        workflowStatusText = WorkflowStatus[workflowStatus];
    }

    // We update the state and ContractContext
    useEffect(() => {
        if (workflowStatus === 1) {
            setStyle(
                "bg-amber-400 rounded-full flex justify-center items-center py-2 px-8 text-white m-2 font-bold"
            );
        } else if (workflowStatus === 3) {
            setStyle(
                "bg-green-500 rounded-full flex justify-center items-center py-2 px-8 text-white m-2 font-bold"
            );
        }

        setWorkflowStatusState(workflowStatusText);
        setContractContext((prevContractContext) => ({
            ...prevContractContext,
            workflowStatus: workflowStatus,
            workflowStatusText: workflowStatusText,
        }));
    }, [workflowStatus]);

    return <div className={style}>{workflowStatusState}</div>;
};

export default WorkflowStatusWatcher;
