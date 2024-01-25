import { useContractContext } from "@/components/contexts/ContractContext";
import {
    getProposalRegistrationLogs,
    getVoterRegistrationLogs,
} from "@/components/contract/ContractService";
import { useEffect, useState } from "react";

const LogManager = () => {
    const [logs, setLogs] = useState(null);
    const { contractContext, setContractContext } = useContractContext();
    const [label, setLabel] = useState("");
    const [style, setStyle] = useState(null);

    useEffect(() => {
        if (contractContext.workflowStatus === 0) {
            setLabel("Voters Registering");
        } else if (contractContext.workflowStatus === 1) {
            setLabel("Proposals Registration");
        }
    }, [contractContext.workflowStatus]);

    // Events Logs
    useEffect(() => {
        if (contractContext.workflowStatus === 0) {
            const getVotersRegisteringEvents = async () => {
                try {
                    const logsBuffer = await getVoterRegistrationLogs();
                    setLogs(logsBuffer.map((log) => log.args.voterAddress));
                    setStyle(
                        "bg-blue-600 rounded-full px-2 py-1 text-white mr-6"
                    );
                } catch (error) {
                    console.log(error.message);
                }
            };

            getVotersRegisteringEvents();
        } else if (contractContext.workflowStatus === 1) {
            const getProposalRegistrationEvents = async () => {
                try {
                    const logsBuffer = await getProposalRegistrationLogs();
                    setLogs(
                        logsBuffer.map((log) => Number(log.args.proposalId))
                    );
                    setStyle(
                        "bg-amber-400 rounded-full px-2 py-1 text-white mr-6"
                    );
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
                <ul className="my-4 flex flex-col justify-center items-start">
                    {logs && logs?.length > 0 ? (
                        logs.map((log) => (
                            <li key={log} className="mb-2 ">
                                <span className={style}>{label}</span>
                                <span className="px-2 py-1">[{log}]</span>
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
