import { useAuthContext } from "../../auth/AuthContext";
import withAuthentication from "../../auth/withAuthentication";
import MessageBox from "../MessageBox";
import Admin from "./Admin";
import Voter from "./Voter";

const PrivateSection = () => {
    const user = useAuthContext();

    return (
        <>
            {user.data.isOwner && <Admin />}
            {user.data.isVoter && <Voter />}
        </>
    );
};

export default withAuthentication(PrivateSection, MessageBox);
