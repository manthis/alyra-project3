import { useState } from "react";
import withAuthentication from "../../auth/withAuthentication";
import { useAuthContext } from "../../contexts/AuthContext";
import MessageBox from "../MessageBox";
import Admin from "./Admin";
import Voter from "./Voter";

const PrivateSection = () => {
    const user = useAuthContext();
    const [msg, setMsg] = useState(null);
    const [color, setColor] = useState("bg-blue-500");

    const handleErrors = (error) => {
        setColor("bg-red-600");
        setMsg(error.message);
        setTimeout(() => setMsg(null), 5000);
    };

    const handleInfos = (info) => {
        setColor("bg-green-600");
        setMsg(info);
        setTimeout(() => setMsg(null), 5000);
    };

    return (
        <>
            {msg && <MessageBox message={msg} color={color} />}
            {user.data.isOwner && (
                <Admin
                    _errorCallback={handleErrors}
                    _infoCallback={handleInfos}
                />
            )}
            {user.data.isVoter && <Voter />}
        </>
    );
};

export default withAuthentication(PrivateSection, MessageBox);
