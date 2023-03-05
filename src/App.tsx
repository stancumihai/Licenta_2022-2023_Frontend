import { initializeIcons } from '@fluentui/react';
import { useContext, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthentificationContext from './Authentication/authenticationContext';
import { IAuthentificationContext } from './Authentication/authenticationContext.types';
import { HomePage } from './Components/HomePage/homePage';
import { Login } from './Components/Login/login';
import { Register } from './Components/Register/register';
import { Survey } from './Components/Survey/survey';
import { FORGOT_PASSWORD_PATH, HOME_PATH, JWT_TOKEN, LOGIN_PATH, RENEW_PASSWORD_PATH, SIGN_UP_PATH, SURVEY_PATH } from './Library/constants';
import Cookies from 'universal-cookie';
import { NavigateFunction, useNavigate } from 'react-router';
import { AuthenticatedRoute } from './Components/AuthenticatedRoute/authenticatedRoute';
import { ServiceContext, ServiceContextInstance } from './Core/serviceContext';
import { IResponse } from './Models/IResponse';
import { ForgotPassword } from './Components/ForgotPassword/forgotPassword';
import { RenewPassword } from './Components/RenewPassword/renewPassword';

initializeIcons(undefined, { disableWarnings: true });

export default function App(): JSX.Element {
  const authenticationContext: IAuthentificationContext = useContext(AuthentificationContext);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [tryRefreshToken, setTryRefreshToken] = useState(false);
  const services = useContext<ServiceContext>(ServiceContextInstance);

  const navigate: NavigateFunction = useNavigate();
  const cookie = new Cookies();

  const isUserAuthenticated = (): boolean => {
    if (authenticationContext.IsAuthenticated()) {
      return new Date(authenticationContext.User.tokenExpires) > new Date()
    }
    return false;
  };

  // useEffect(() => {
  //   if (isUserAuthenticated()) {
  //     setIsAuthenticated(true);
  //     return;
  //   }
  //   setIsAuthenticated(false);
  //   if (authenticationContext.User.refreshToken !== '') {
  //     setTryRefreshToken(true);
  //     return;
  //   }
  //   navigate(LOGIN_PATH);
  //   cookie.remove(JWT_TOKEN);
  // }, [authenticationContext.User]);

  // useEffect(() => {
  //   if (tryRefreshToken === true) {
  //     services.AuthenticationService.RefreshToken().then((data: IResponse<any>) => {
  //       if (data.Error !== undefined) {
  //         setIsAuthenticated(false);
  //         return;
  //       }
  //       if (data.Data! !== undefined && data.Status === 200) {
  //         setIsAuthenticated(true);
  //         return;
  //       }
  //     });

  //     setTryRefreshToken(false);
  //   }
  // }, [tryRefreshToken])

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflow = "hidden";
  }, []);

  return (
    <div>
      <Routes>
        <Route path={LOGIN_PATH} element={<Login />} />
        <Route path={SIGN_UP_PATH} element={<Register />} />
        <Route path={SURVEY_PATH} element={
          // <AuthenticatedRoute unaunthenticatedRedirectUrl={HOME_PATH}>
          <Survey />
          // </AuthenticatedRoute>
        } />
        <Route path={HOME_PATH} element={
          //<AuthenticatedRoute unaunthenticatedRedirectUrl={HOME_PATH}>
          <HomePage />
          // </AuthenticatedRoute>
        } />
        <Route path={FORGOT_PASSWORD_PATH} element={<ForgotPassword />} />
        <Route path={`${RENEW_PASSWORD_PATH}/:email`} element={<RenewPassword />} />

      </Routes>
    </div>
  );
};