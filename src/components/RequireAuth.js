import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const RequireAuth = ({children}) => {
    const signInResult = useSelector((state) => state.auth)

    if (signInResult.signInSuccess) {
        return <Navigate to='signin' replace/>
    }

    return children
}