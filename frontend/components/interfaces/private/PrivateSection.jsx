import { getVoterRegistrationLogs } from "@/components/contract/ContractService";
import { useEffect, useState } from "react";
import withAuthentication from "../../auth/withAuthentication";
import { useAuthContext } from "../../contexts/AuthContext";
import MessageBox from "../MessageBox";
import Admin from "./Admin";
import Voter from "./Voter";

const PrivateSection = () => {
    const user = useAuthContext();
    const [msg, setMsg] = useState(null);
    const [color, setColor] = useState("bg-blue-500");
    const [logs, setLogs] = useState(null);

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

    // Events Logs
    useEffect(() => {
        const getEventsLogs = async () => {
            try {
                const logsBuffer = await getVoterRegistrationLogs();
                setLogs(logsBuffer.map((log) => log.args.voterAddress));
            } catch (error) {
                console.log(error.message);
            }
        };

        getEventsLogs();
    }, [logs]);

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
            {(user?.data.isVoter || user?.data.isAdmin) && (
                <div className="w-full flex flex-col mt-2 justify-center items-start border-2 border-slate-600 rounded-lg p-4 pl-24">
                    <h1 className="text-xl font-bold m-4">
                        Events log for current step:
                    </h1>
                    {logs &&
                        logs.map((log) => (
                            <p>
                                <span className="bg-blue-500 rounded-full px-2 text-white mr-8 mb-2">
                                    Registered voter
                                </span>
                                {log}
                            </p>
                        ))}
                </div>
            )}
        </>
    );
};

export default withAuthentication(PrivateSection, MessageBox);
