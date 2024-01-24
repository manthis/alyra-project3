import { WorkflowStatus } from "@/components/contract/WorkflowStatuses";
import { useContractRead } from "wagmi";
import VotingABI from "../../contract/VotingABI";

const PublicSection = () => {
    const { data: workflowStatus, isSuccess } = useContractRead({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        abi: VotingABI,
        functionName: "workflowStatus",
    });

    let workflowStatusText = "";
    if (isSuccess) {
        workflowStatusText = WorkflowStatus[workflowStatus];
    }

    return (
        <div className="border-2 border-slate-600 rounded-lg w-full flex flex-col justify-center items-center p-4">
            <h1 className="text-xl p-2 font-extrabold">Voting Information</h1>
            <div className="bg-blue-500 rounded-full flex justify-center items-center py-2 px-4">
                Workflow Status:{" "}
                <span className="text-white ml-2 font-bold">
                    {workflowStatusText}
                </span>
            </div>
            <br />
            <div>Vote step / Winner / Logs</div>
        </div>
    );
};

export default PublicSection;
