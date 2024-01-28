// withAuthentication.js
import { useAuthContext } from '../contexts/AuthContext';

const withAuthentication = (WrappedAuthSuccessComponent, WrappedAuthFailureComponent) => (props) => {
    const user = useAuthContext();

    // If the user did not connect
    if (!user?.isConnected) {
        return <WrappedAuthFailureComponent message='Please connect your wallet to access the voting app!' />;
    }

    // If the user is connected we display the wrapped component and pass the user info to it
    return <WrappedAuthSuccessComponent {...props} user={user} />;
};

export default withAuthentication;
