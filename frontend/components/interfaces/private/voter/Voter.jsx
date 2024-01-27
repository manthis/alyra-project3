import { useContractContext } from "@/components/contexts/ContractContext";
import StepWithNothing from "../StepWithNothing";
import RegisteringProposals from "./RegisteringProposals";
import Vote from "./Vote";

export default function Voter({
    errorCallback: _errorCallback,
    infoCallback: _infoCallback,
}) {
    const { contractContext, setContractContext } = useContractContext();

    return (
        <div className="border-2 border-slate-500 rounded-lg w-full flex flex-col justify-center items-center p-4 mb-2 bg-slate-400">
            <h1 className="text-xl font-bold m-4">Voter section</h1>

            {contractContext.workflowStatus === 0 && (
                <StepWithNothing message="Nothing to do as a Voter at this vote step" />
            )}

            {contractContext.workflowStatus === 1 && (
                <RegisteringProposals
                    errorCallback={_errorCallback}
                    infoCallback={_infoCallback}
                />
            )}

            {contractContext.workflowStatus === 3 && (
                <div>
                    <Vote
                        infoCallback={_infoCallback}
                        errorCallback={_errorCallback}
                    />
                </div>
            )}
        </div>
    );
}
