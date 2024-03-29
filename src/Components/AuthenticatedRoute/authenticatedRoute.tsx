import { useContext } from "react";
import { Navigate } from 'react-router-dom';
import AuthentificationContext from '../../Contexts/Authentication/authenticationContext';
import { IAuthentificationContext } from '../../Contexts/Authentication/authenticationContext.types';
import { AuthenticatedRouteProps } from "./authenticatedRoute.types";

export const AuthenticatedRoute = (props: AuthenticatedRouteProps): JSX.Element => {
    const authenticationContext: IAuthentificationContext = useContext(AuthentificationContext);
    return <>{props.permissions!.includes(authenticationContext.User.role!) ? props.children : <Navigate to={props.unaunthenticatedRedirectUrl} />}</>
};