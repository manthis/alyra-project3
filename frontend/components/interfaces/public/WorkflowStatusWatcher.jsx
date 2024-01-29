import { useContractContext } from "@/components/contexts/ContractContext";
import VotingABI from "@/components/contract/VotingAbi";
import { WorkflowStatus } from "@/components/contract/WorkflowStatuses";
import { getPublicClient } from "@wagmi/core";
import { useEffect, useState } from "react";

const WorkflowStatusWatcher = () => {
    const { contractContext, setContractContext } = useContractContext();
    const [workflowStatusState, setWorkflowStatusState] = useState(null);
    const [workflowStepId, setWorkflowStepId] = useState();
    const [style, setStyle] = useState(
        "bg-blue-500 rounded-full flex justify-center items-center py-2 px-8 text-white m-2 font-bold"
    );

    useEffect(() => {
        const getWorkflowStatus = async () => {
            try {
                const publicClient = getPublicClient();
                const data = await publicClient.readContract({
                    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
                    abi: VotingABI,
                    functionName: "workflowStatus",
                });

                const stepId = data;

                if (stepId === 1) {
                    setStyle(
                        "bg-amber-400 rounded-full flex justify-center items-center py-2 px-8 text-white m-2 font-bold"
                    );
                } else if (stepId === 3) {
                    setStyle(
                        "bg-green-500 rounded-full flex justify-center items-center py-2 px-8 text-white m-2 font-bold"
                    );
                } else if (stepId === 5) {
                    setStyle(
                        "bg-red-500 rounded-full flex justify-center items-center py-2 px-8 text-white m-2 font-bold"
                    );
                }

                setWorkflowStepId(data);
                setWorkflowStatusState(WorkflowStatus[data]);
                setContractContext({ workflowStatus: data });
            } catch (error) {
                console.log(error.message);
            }
        };

        getWorkflowStatus();
    }, [contractContext?.workflowStatus]);

    return <div className={style}>{workflowStatusState}</div>;
};

export default WorkflowStatusWatcher;
