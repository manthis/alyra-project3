import { useAuthContext } from "../../auth/AuthContext";
import withAuthentication from "../../auth/withAuthentication";
import MessageBox from "../MessageBox";

const PrivateSection = () => {
    const user = useAuthContext();

    return (
        <div className="border-2 border-slate-600 rounded-lg m-2 w-2/4 flex flex-col justify-center items-center p-4">
            <p>Private Section: under construction</p>
            <p>Admin section</p>
            <p>Voter section</p>
        </div>
    );
};

export default withAuthentication(PrivateSection, MessageBox);
