import { useContractContext } from "@/components/contexts/ContractContext";
import {
    getProposalRegistrationLogs,
    getVoterRegistrationLogs,
} from "@/components/contract/ContractService";
import { useEffect, useState } from "react";

const LogManager = () => {
    const [logs, setLogs] = useState(null);
    const { contractContext, setContractContext } = useContractContext();

    // Events Logs
    useEffect(() => {
        if (contractContext.workflowStatus === 0) {
            const getVotersRegisteringEvents = async () => {
                try {
                    const logsBuffer = await getVoterRegistrationLogs();
                    setLogs(logsBuffer.map((log) => log.args.voterAddress));
                } catch (error) {
                    console.log(error.message);
                }
            };

            getVotersRegisteringEvents();
        } else if (contractContext.workflowStatus === 1) {
            const getProposalRegistrationEvents = async () => {
                try {
                    const logsBuffer = await getProposalRegistrationLogs();
                    setLogs(logsBuffer.map((log) => log.args.proposalId));
                } catch (error) {
                    console.log(error.message);
                }
            };

            getProposalRegistrationEvents();
        } else {
            setLogs(null);
        }
    }, [logs]);

    return (
        <>
            <div className="w-full flex flex-col mt-2 justify-center items-center border-2 border-slate-600 rounded-lg p-4">
                <h1 className="text-xl font-bold m-4">
                    Log Events for Current Step
                </h1>
                {/* If the step is 'Registering voters' */}
                <ul className="my-4">
                    {logs ? (
                        logs.map((log) => (
                            <li key={log}>
                                <span className="bg-blue-500 rounded-full px-2 text-white mr-8 mb-2">
                                    Registered voter
                                </span>
                                {log}
                            </li>
                        ))
                    ) : (
                        <li>No events found</li>
                    )}
                </ul>
            </div>

            {/* If the step is 'Proposals Registration Started' */}
        </>
    );
};

export default LogManager;
