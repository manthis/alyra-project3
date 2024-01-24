'use client';

import { AuthProvider } from '@/components/auth/AuthContext';
import Home from '@/components/Home';

const App = () => {
    return (
        <AuthProvider>
            <Home />
        </AuthProvider>
    );
};

export default App;
