import { useAuthContext } from "@/components/contexts/AuthContext";
import { addVoter } from "@/components/contract/ContractService";

const Step1 = ({ _errorCallback, _infoCallback }) => {
    const user = useAuthContext();

    const RegisteringVoters = async (formData) => {
        const address = formData.get("address");
        try {
            await addVoter(address, user?.data.address);
            _infoCallback(
                `Voter successfully registered with address: ${address}`
            );
        } catch (error) {
            _errorCallback(error);
        }
    };
    return (
        <div className="flex justify-start flex-col w-4/5">
            <p className="mb-2">
                Please register a voter using their ETH address:
            </p>
            <form
                action={RegisteringVoters}
                className="w-full flex justify-between"
            >
                <input
                    className="border-1 border-slate-400 rounded-xl py-2 px-4 w-full mr-4 text-black"
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
    );
};

export default Step1;
