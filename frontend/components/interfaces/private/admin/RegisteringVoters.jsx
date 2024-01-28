import { useAuthContext } from "@/components/contexts/AuthContext";
import { addVoter } from "@/components/contract/ContractService";
import { useRef } from "react";

const Step1 = ({ _errorCallback, _infoCallback }) => {
    const user = useAuthContext();
    const inputRef = useRef(null);

    const RegisteringVoters = async (event) => {
        event.preventDefault();
        const address = inputRef.current.value;

        try {
            await addVoter(address, user?.data.address);
            _infoCallback(
                `Voter successfully registered with address: ${address}`
            );
            inputRef.current.value = "";
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
                onSubmit={RegisteringVoters}
                className="w-full flex justify-between"
            >
                <input
                    ref={inputRef}
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
