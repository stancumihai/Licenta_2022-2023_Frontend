export interface AuthenticatedRouteProps extends React.PropsWithChildren<{}> {
    unaunthenticatedRedirectUrl: string;
    permissions?: string[];
};