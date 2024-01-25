import { useAuthContext } from "@/components/contexts/AuthContext";
import { useContractContext } from "@/components/contexts/ContractContext";
import { startProposalsRegistering } from "@/components/contract/ContractService";
import { WorkflowStatus } from "@/components/contract/WorkflowStatuses";
import StepWithNothing from "../StepWithNothing";
import Step1 from "./RegisteringVoters";

export default function Admin({
    errorCallback: _errorCallback,
    infoCallback: _infoCallback,
}) {
    const { contractContext, setContractContext } = useContractContext();
    const user = useAuthContext();

    const moveVoteForward = async () => {
        const workflowStep = contractContext.workflowStatus;

        // If the step is 'Registering voters'
        if (workflowStep === 0) {
            try {
                await startProposalsRegistering(user?.data.address);
                _infoCallback(
                    `Workflow step successfully moved from "${
                        WorkflowStatus[workflowStep]
                    }" to "${WorkflowStatus[workflowStep + 1]}"`
                );
            } catch (error) {
                _errorCallback(error.message);
            }
        } else {
            console.log("Unknown step!");
        }
    };

    return (
        <div className="border-2 border-slate-600 rounded-lg flex flex-col justify-center items-center p-4 mb-4 w-full">
            <h1 className="text-xl font-bold m-4">Admin section</h1>

            {/* If the step is 'Registering voters' */}
            {contractContext.workflowStatus === 0 && (
                <Step1
                    _errorCallback={_errorCallback}
                    _infoCallback={_infoCallback}
                />
            )}

            {/* If the step is 'Proposals Registration Started' */}
            {contractContext.workflowStatus === 1 && (
                <StepWithNothing message="Nothing to do as an Admin at this vote step" />
            )}

            <button
                onClick={() => moveVoteForward()}
                className="bg-blue-500 rounded-xl py-2 px-4 text-white mt-6"
            >
                Take vote to the next step
            </button>
        </div>
    );
}
