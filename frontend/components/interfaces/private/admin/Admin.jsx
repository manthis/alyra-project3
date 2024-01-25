import { useAuthContext } from "@/components/contexts/AuthContext";
import { useContractContext } from "@/components/contexts/ContractContext";
import {
    startProposalsRegistering,
    startVotingSession,
} from "@/components/contract/ContractService";
import { WorkflowStatus } from "@/components/contract/WorkflowStatuses";
import { useEffect, useState } from "react";
import StepWithNothing from "../StepWithNothing";
import Step1 from "./RegisteringVoters";

export default function Admin({
    errorCallback: _errorCallback,
    infoCallback: _infoCallback,
}) {
    const { contractContext, setContractContext } = useContractContext();
    const user = useAuthContext();
    const [buttonLabel, setButtonLabel] = useState();

    useEffect(() => {
        const workflowStep = contractContext.workflowStatus;
        if (workflowStep === 0) {
            setButtonLabel("Start proposals registering");
        } else if (workflowStep === 1) {
            setButtonLabel("Start voting session");
        } else if (workflowStep === 3) {
            setButtonLabel("End Vote and Get Results");
        }
    }, [contractContext.workflowStatus]);

    const moveForward = async (
        writeContractCallback,
        _errorCallback,
        _infoCallback
    ) => {
        try {
            await writeContractCallback(user?.data.address);
            _infoCallback(
                `Workflow step successfully moved from "${
                    WorkflowStatus[workflowStep]
                }" to "${WorkflowStatus[workflowStep + 1]}"`
            );
        } catch (error) {
            _errorCallback(error.message);
        }
    };

    const moveVoteForward = async () => {
        const workflowStep = contractContext.workflowStatus;

        // If the step is 'Registering voters'
        if (workflowStep === 0) {
            moveForward(
                startProposalsRegistering,
                _errorCallback,
                _infoCallback
            );
        } else if (workflowStep === 1) {
            moveForward(startVotingSession, _errorCallback, _infoCallback);
        } else {
            console.log("Unknown step!");
        }
    };

    const mustDisplayStepWithNothing =
        contractContext.workflowStatus === 1 ||
        contractContext.workflowStatus === 2 ||
        contractContext.workflowStatus === 3;

    return (
        <div className="border-2 border-purple-700 rounded-lg flex flex-col justify-center items-center p-4 mb-4 w-full bg-purple-600">
            <h1 className="text-xl font-bold m-4">Admin section</h1>

            {/* If the step is 'Registering voters' */}
            {contractContext.workflowStatus === 0 && (
                <Step1
                    _errorCallback={_errorCallback}
                    _infoCallback={_infoCallback}
                />
            )}

            {/* If the step doesn't require Admin involvment */}
            {mustDisplayStepWithNothing && (
                <StepWithNothing message="Nothing to do as an Admin at this vote step" />
            )}

            <button
                onClick={() => moveVoteForward()}
                className="bg-blue-500 rounded-xl py-2 px-4 text-white mt-6"
            >
                {buttonLabel}
            </button>
        </div>
    );
}
