import { useAuthContext } from "@/components/contexts/AuthContext";
import { useContractContext } from "@/components/contexts/ContractContext";
import {
    endVotingSessionAndTallyVotes,
    getOneProposal,
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
        const workflowStep = contractContext?.workflowStatus;
        if (workflowStep === 0) {
            setButtonLabel("Start proposals registering");
        } else if (workflowStep === 1) {
            setButtonLabel("Start voting session");
        } else if (workflowStep === 3) {
            setButtonLabel("End Vote and Get Results");
        }
    }, [contractContext?.workflowStatus]);

    const moveForward = async (
        writeContractCallback,
        _errorCallback,
        _infoCallback,
        workflowStep
    ) => {
        try {
            await writeContractCallback(user?.data.address);
            _infoCallback(
                `Workflow step successfully moved from "${
                    WorkflowStatus[workflowStep]
                }" to "${WorkflowStatus[workflowStep + 1]}"`
            );
        } catch (error) {
            _errorCallback(error);
        }
    };

    const moveVoteForward = async () => {
        const workflowStep = contractContext.workflowStatus;

        if (workflowStep === 0) {
            moveForward(
                startProposalsRegistering,
                _errorCallback,
                _infoCallback,
                workflowStep
            );
        } else if (workflowStep === 1) {
            try {
                await getOneProposal(1, user?.data.address);
                moveForward(
                    startVotingSession,
                    _errorCallback,
                    _infoCallback,
                    workflowStep
                );
            } catch (error) {
                if (error.message.includes("Array index is out of bounds")) {
                    console.log("YALA");
                    _errorCallback(
                        new Error(
                            "You must at least add one proposal before starting vote session!"
                        )
                    );
                } else {
                    _errorCallback(error);
                }
            }
        } else if (workflowStep === 3) {
            moveForward(
                endVotingSessionAndTallyVotes,
                _errorCallback,
                _infoCallback,
                workflowStep
            );
        } else {
            console.log("Unknown step!");
        }
    };

    return (
        <div className="border-2 border-emerald-600 rounded-lg flex flex-col justify-center items-center p-4 mb-4 w-full bg-emerald-500">
            <h1 className="text-xl font-bold m-4">Admin section</h1>

            {/* If the step is 'Registering voters' */}
            {contractContext?.workflowStatus === 0 ? (
                <Step1
                    _errorCallback={_errorCallback}
                    _infoCallback={_infoCallback}
                />
            ) : (
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
