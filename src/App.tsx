import { initializeIcons } from '@fluentui/react';
import {
  useContext,
  useEffect,
  useState
} from 'react';
import {
  Navigate,
  Route,
  Routes
} from 'react-router-dom';
import AuthentificationContext from './Authentication/authenticationContext';
import { IAuthentificationContext } from './Authentication/authenticationContext.types';
import { HomePage } from './Components/HomePage/homePage';
import { Login } from './Components/Login/login';
import { Register } from './Components/Register/register';
import { Survey } from './Components/Survey/survey';
import {
  DEFAULT_PATH,
  FORGOT_PASSWORD_PATH,
  HOME_PATH,
  JWT_TOKEN,
  LOGIN_PATH,
  REFRESH_TOKEN,
  RENEW_PASSWORD_PATH,
  SESSION_EXPIRED_MESSAGE,
  SIGN_UP_PATH,
  SURVEY_PATH
} from './Library/constants';
import { AuthenticatedRoute } from './Components/AuthenticatedRoute/authenticatedRoute';
import { ForgotPassword } from './Components/ForgotPassword/forgotPassword';
import { RenewPassword } from './Components/RenewPassword/renewPassword';
import {
  NavigateFunction,
  useNavigate
} from 'react-router';
import { SURVEY_PATH_PERMISSIONS } from './Authentication/pagePermissions';
import {
  ServiceContext,
  ServiceContextInstance
} from './Core/serviceContext';
import { IResponse } from './Models/IResponse';
import Cookies from 'universal-cookie';
import { ITokenModel } from './Models/User/ITokenModel';

initializeIcons(undefined, { disableWarnings: true });

export default function App(): JSX.Element {
  const authenticationContext: IAuthentificationContext = useContext(AuthentificationContext);
  const navigate: NavigateFunction = useNavigate();
  const services = useContext<ServiceContext>(ServiceContextInstance);
  const [userHasSurveyAnswers, setUserHasSurveyAnswers] = useState<boolean | undefined>(undefined);
  const cookie = new Cookies();

  const handleAuthorizationExpired = (): void => {
    navigate(LOGIN_PATH);
    cookie.remove(JWT_TOKEN);
    cookie.remove(REFRESH_TOKEN)
  };

  const NON_AUTH_PAGES = ["login", "forgotPassword", "renewPassword"];

  const trimUrl = (url: string): string => {
    return url.split("localhost:3000")[1].split("/")[1];
  }

  const forbidden = authenticationContext.IsForbidden();
  useEffect(() => {
    const trimmedUrl: string = trimUrl(window.location.href);
    if (NON_AUTH_PAGES.includes(trimmedUrl)) {
      return;
    }
    if (forbidden === true) {
      try {
        var accessToken = cookie.get(JWT_TOKEN);
        var refreshToken = cookie.get(REFRESH_TOKEN);
        if ((refreshToken === undefined || refreshToken === "")) {
          if (!authenticationContext.IsAuthenticated()) {
            window.alert(SESSION_EXPIRED_MESSAGE);
            cookie.remove(JWT_TOKEN);
            cookie.remove(REFRESH_TOKEN)
            navigate(LOGIN_PATH);
            return;
          }
          hasSurveyPath();
          return;
        }
        const tokenModel: ITokenModel = {
          accessToken,
          refreshToken
        };
        services.AuthenticationService.RefreshToken(tokenModel).then((data: IResponse<ITokenModel>) => {
          if (data !== null && data.Data!.refreshToken !== null && data.Data!.accessToken !== null) {
            cookie.set(REFRESH_TOKEN, data.Data!.refreshToken);
            cookie.set(JWT_TOKEN, data.Data!.accessToken)
          }
        });
        hasSurveyPath();
        return;
      }
      catch (e) {
        handleAuthorizationExpired();
        return;
      }
    }
    hasSurveyPath();
  }, [authenticationContext.User, forbidden]);

  const hasSurveyPath = (): void => {
    services.UserService.UserHasSurveyAnswers(authenticationContext.User.uid!)
      .then((data: IResponse<any>) => {
        if (!data.Data!) {
          setUserHasSurveyAnswers(false);
          return;
        }
        setUserHasSurveyAnswers(true);
      });
  };

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
          <AuthenticatedRoute unaunthenticatedRedirectUrl={LOGIN_PATH} permissions={SURVEY_PATH_PERMISSIONS}>
            {!userHasSurveyAnswers ? <Survey /> : <Navigate to={HOME_PATH} />}
          </AuthenticatedRoute>
        } />
        {/* <Route path={SURVEY_PATH} element={<Survey />} /> */}
        <Route path={HOME_PATH} element={
          <HomePage />
        } />
        <Route path={FORGOT_PASSWORD_PATH} element={<ForgotPassword />} />
        <Route path={`${RENEW_PASSWORD_PATH}/:email`} element={<RenewPassword />} />
        <Route path={DEFAULT_PATH} element={<Navigate to={LOGIN_PATH} />} />
      </Routes>
    </div>
  );
};