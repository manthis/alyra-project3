import WinnerWatcher from "./WinnerWatcher";
import WorkflowStatusWatcher from "./WorkflowStatusWatcher";

const PublicSection = () => {
    return (
        <>
            <div className="border-2 border-slate-700 rounded-lg w-full flex flex-col justify-center items-center p-4 mb-4 bg-slate-600">
                <h1 className="text-xl font-bold m-4">Voting Information</h1>

                <WorkflowStatusWatcher />
                <WinnerWatcher />
            </div>
        </>
    );
};

export default PublicSection;
