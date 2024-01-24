// withAuthentication.js
import { useAuth } from './AuthContext';

const withAuthentication = (WrappedAuthSuccessComponent, WrappedAuthFailureComponent) => (props) => {
    const user = useAuth();

    // If the user did not connect
    if (!user?.isConnected) {
        return <WrappedAuthFailureComponent />;
    }

    // If the user is connected we display the wrapped component and pass the user info to it
    return <WrappedAuthSuccessComponent {...props} user={user} />;
};

export default withAuthentication;
