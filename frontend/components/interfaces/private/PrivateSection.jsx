import { useState } from "react";
import withAuthentication from "../../auth/withAuthentication";
import { useAuthContext } from "../../contexts/AuthContext";
import MessageBox from "../MessageBox";
import Admin from "./Admin";
import Voter from "./Voter";

const PrivateSection = () => {
    const user = useAuthContext();
    const [error, setError] = useState(null);
    const [color, setColor] = useState("bg-blue-500");

    const handleErrors = (error) => {
        setColor("bg-red-600");
        setError(error.message);
        setTimeout(() => setError(null), 5000);
    };

    return (
        <>
            {error && <MessageBox message={error} color={color} />}
            {user.data.isOwner && <Admin _errorCallback={handleErrors} />}
            {user.data.isVoter && <Voter />}
        </>
    );
};

export default withAuthentication(PrivateSection, MessageBox);
