import { useAuthContext } from "@/components/contexts/AuthContext";
import { addProposal } from "@/components/contract/ContractService";

const RegisteringProposals = ({ errorCallback, infoCallback }) => {
    const user = useAuthContext();

    const RegisteringProposals = async (formData) => {
        const proposal = formData.get("proposal");

        try {
            await addProposal(proposal, user?.data.address);
            infoCallback(`Voter successfully recorded a proposal: ${proposal}`);
        } catch (error) {
            errorCallback(error);
        }
    };

    return (
        <div className="flex justify-start flex-col w-4/5">
            <p className="mb-2">Please record a proposal for the vote:</p>
            <form
                action={RegisteringProposals}
                className="w-full flex justify-between"
            >
                <input
                    className="border-1 border-slate-400 rounded-xl py-2 px-4 w-full mr-4"
                    type="text"
                    placeholder="My proposal to be voted..."
                    name="proposal"
                />
                <button
                    className="bg-blue-500 rounded-xl py-2 px-4 text-white"
                    type="submit"
                >
                    Record
                </button>
            </form>
        </div>
    );
};

export default RegisteringProposals;
