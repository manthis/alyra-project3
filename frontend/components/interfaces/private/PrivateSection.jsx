import { useContractContext } from "@/components/contexts/ContractContext";
import { useState } from "react";
import withAuthentication from "../../auth/withAuthentication";
import { useAuthContext } from "../../contexts/AuthContext";
import MessageBox from "../MessageBox";
import LogManager from "./LogManager";
import Admin from "./admin/Admin";
import Voter from "./voter/Voter";

const PrivateSection = () => {
    const user = useAuthContext();
    const { contractContext, setContractContext } = useContractContext();
    const [msg, setMsg] = useState(null);
    const [color, setColor] = useState("bg-blue-500");

    const msgTimeout = 3000;
    const handleErrors = (error) => {
        setColor("bg-red-600");
        setMsg(error.message);
        setTimeout(() => setMsg(null), msgTimeout);
    };

    const handleInfos = (info) => {
        setColor("bg-green-600");
        setMsg(info);
        setTimeout(() => setMsg(null), msgTimeout);
    };

    return (
        <>
            {msg && <MessageBox message={msg} color={color} />}

            {user?.data.isOwner && contractContext?.workflowStatus !== 5 && (
                <Admin
                    errorCallback={handleErrors}
                    infoCallback={handleInfos}
                />
            )}
            {user?.data.isVoter && contractContext?.workflowStatus !== 5 && (
                <Voter
                    errorCallback={handleErrors}
                    infoCallback={handleInfos}
                />
            )}
            {user?.data.isOwner && contractContext?.workflowStatus !== 5 && (
                <LogManager />
            )}
        </>
    );
};

export default withAuthentication(PrivateSection, MessageBox);
