import { useContractContext } from "@/components/contexts/ContractContext";
import StepWithNothing from "../StepWithNothing";

export default function Voter() {
    const { contractContext, setContractContext } = useContractContext();

    return (
        <div className="border-2 border-slate-600 rounded-lg w-full flex flex-col justify-center items-center p-4 mb-2">
            <h1 className="text-xl font-bold m-4">Voter section</h1>

            {contractContext.workflowStatus === 0 && (
                <StepWithNothing message="Nothing to do as a Voter at this vote step" />
            )}

            {/**
                TODO Voter section

                Depending of the current step:
                - step 0 -> nothing
                - step 1 -> nothing
                - step 2 -> a text area and a button to submit proposals
                - step 3 -> nothing
                - step 4 -> the list of proposition to be selected and a button to vote
                - nothing for the other steps
             */}
        </div>
    );
}
