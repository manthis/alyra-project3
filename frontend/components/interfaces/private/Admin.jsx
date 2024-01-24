export default function Admin() {
    return (
        <div className="border-2 border-slate-600 rounded-lg flex flex-col justify-center items-center p-4 mb-4 w-full">
            <h1>Admin section</h1>

            <button>Next Step</button>
            {/**
                TODO: 

                - Display a button to move to next step
                - Depending of the current step, display: -> WE NEED TO HAVE THE CURRENT STEP IN THE STATE
                    - an input and a button to add a voter during step 1 - Registering Voters
                    - nothing for the other steps
             */}
        </div>
    );
}
