import { useAuthContext } from "@/components/contexts/AuthContext";
import {
    getOneProposal,
    getProposalRegistrationLogs,
    setVote,
} from "@/components/contract/ContractService";
import { useEffect, useState } from "react";

const Vote = ({
    errorCallback: _errorCallback,
    infoCallback: _infoCallback,
}) => {
    const user = useAuthContext();
    const [hasVoted, setHasVoted] = useState(false);
    const [proposals, setProposals] = useState([]);

    const onSubmitVote = async (formData) => {
        const choice = formData.get("vote");

        if (!choice) {
            _errorCallback(new Error("Please select a proposition"));
            return;
        }

        try {
            await setVote(Number(choice));
            setHasVoted(true);
            _infoCallback(`Voter successfully voted for proposal: ${choice}`);
        } catch (error) {
            if (error.message.includes("You have already voted")) {
                setHasVoted(true);
            }
            _errorCallback(error);
        }
    };

    useEffect(() => {
        const getProposals = async () => {
            const logs = await getProposalRegistrationLogs();

            let propositions = logs.map(async (log) => {
                return await getOneProposal(
                    Number(log.args.proposalId),
                    user?.data.address
                );
            });

            setProposals(await Promise.all(propositions));
        };
        getProposals();
    }, []);

    return hasVoted ? (
        <p>
            You have already voted, all is good. Wait for the end of the vote.
        </p>
    ) : (
        <>
            <p className="mb-4">
                Please vote for one of the following propositions:
            </p>
            <form action={onSubmitVote} className="flex flex-col">
                {proposals.map((proposition, index) => (
                    <div className="flex" key={index}>
                        <input
                            type="radio"
                            key={index}
                            name="vote"
                            id={"vote" + index}
                            value={index + 1} // to match proposalId
                            className="accent-blue-600"
                        />
                        <label htmlFor={"vote" + index} className="ml-2">
                            {proposition}
                        </label>
                        <br />
                    </div>
                ))}

                <button
                    key="btnVote"
                    type="submit"
                    id="btnVote"
                    name="btnVote"
                    className="bg-blue-500 rounded-xl py-2 px-4 text-white mt-6 "
                >
                    Vote
                </button>
            </form>
        </>
    );
};

export default Vote;
