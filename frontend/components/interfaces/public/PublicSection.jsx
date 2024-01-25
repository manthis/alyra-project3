import WinnerWatcher from "./WinnerWatcher";
import WorkflowStatusWatcher from "./WorkflowStatusWatcher";

const PublicSection = () => {
    /*
    const { contractContext, setContractContext } = useContractContext();
    const [winningProposalIDState, setWinningProposalIDState] = useState(null);

    // WinningProposalID
    const { data: winningProposalID, isSuccess: isWinningSuccess } =
        useContractRead({
            address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
            abi: VotingABI,
            functionName: "winningProposalID",
        });

    let winner = 0;
    if (isWinningSuccess && winningProposalID) {
        winner = parseInt(winningProposalID, 10);
    }

    // We update the state and ContractContext
    useEffect(() => {
        setWinningProposalIDState(winner);
        setContractContext({
            workflowStatus: workflowStatus,
            workflowStatusText: workflowStatusText,
            winningProposalID: winner,
        });
    }, [winningProposalID, workflowStatus]);
    */

    return (
        <>
            <div className="border-2 border-slate-600 rounded-lg w-full flex flex-col justify-center items-center p-4 mb-4">
                <h1 className="text-xl font-bold m-4">Voting Information</h1>

                <WorkflowStatusWatcher />
                <WinnerWatcher />
            </div>
        </>
    );
};

export default PublicSection;
