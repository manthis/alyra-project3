"use client";

import { AuthContextProvider } from "@/components/contexts/AuthContext";
import Home from "@/components/interfaces/Home";

const App = () => {
    return (
        <AuthContextProvider>
            <Home />
        </AuthContextProvider>
    );
};

export default App;
