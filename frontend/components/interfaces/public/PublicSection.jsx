import WinnerWatcher from "./WinnerWatcher";
import WorkflowStatusWatcher from "./WorkflowStatusWatcher";

const PublicSection = () => {
    return (
        <>
            <div className="border-2 border-slate-700 rounded-full flex flex-col justify-center items-center p-4 bg-fuchsia-700 w-[400px] h-[400px] mb-20">
                <h1 className="text-xl font-bold m-4">Vote Status</h1>
                <WorkflowStatusWatcher />
            </div>
            <WinnerWatcher />
        </>
    );
};

export default PublicSection;
