const MessageBox = ({ message }) => {
    return (
        <div className="bg-orange-400 w-2/4 flex flex-col justify-center items-center border-2 border-slate-600 rounded-lg m-6">
            <p className="p-4">{message}</p>
        </div>
    );
};

export default MessageBox;
