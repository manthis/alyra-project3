import { useAuthContext } from "@/components/contexts/AuthContext";
import { useContractContext } from "@/components/contexts/ContractContext";
import { addVoter } from "@/components/contract/ContractService";

export default function Admin({ _errorCallback, _infoCallback }) {
    const { contractContext, setContractContext } = useContractContext();
    const user = useAuthContext();
    // console.log(user);

    const moveVoteForward = async () => {
        console.log("click");
    };

    const registerVoter = async (formData) => {
        const address = formData.get("address");
        try {
            await addVoter(address, user.data.address);
            _infoCallback(
                `Voter successfully registered with address: ${address}`
            );
        } catch (error) {
            _errorCallback(error);
        }
    };

    return (
        <div className="border-2 border-slate-600 rounded-lg flex flex-col justify-center items-center p-4 mb-4 w-full">
            <h1 className="text-xl font-bold m-4">Admin section</h1>

            {contractContext.workflowStatus === 0 && (
                <div className="flex justify-start flex-col w-4/5">
                    <p className="mb-2">
                        Please register a voter using their ETH address:
                    </p>
                    <form
                        action={registerVoter}
                        className="w-full flex justify-between"
                    >
                        <input
                            className="border-1 border-slate-400 rounded-xl py-2 px-4 w-full mr-4"
                            type="text"
                            placeholder="0x0"
                            name="address"
                        />
                        <button
                            className="bg-blue-500 rounded-xl py-2 px-4 text-white"
                            type="submit"
                        >
                            Register
                        </button>
                    </form>
                </div>
            )}

            <button
                onClick={() => moveVoteForward()}
                className="bg-blue-500 rounded-xl py-2 px-4 text-white mt-10"
            >
                Take vote to the next step
            </button>
        </div>
    );
}
