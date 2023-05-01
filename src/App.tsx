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
import {
  ARTISTS_OF_THE_MONTH_PATH,
  CHARTS_PATH,
  FORGOT_PASSWORD_PATH,
  HOME_PATH,
  JWT_TOKEN,
  LOGIN_PATH,
  MOVIE_WRAPPER_PATH,
  RECOMMENDATIONS_PATH,
  REFRESH_TOKEN,
  RENEW_PASSWORD_PATH,
  SESSION_EXPIRED_MESSAGE,
  SIGN_UP_PATH,
  SURVEY_PATH,
  TOP_GENRES_PATH,
  USER_PROFILE_PATH
} from './Library/constants';
import { ForgotPassword } from './Components/ForgotPassword/forgotPassword';
import { RenewPassword } from './Components/RenewPassword/renewPassword';
import {
  NavigateFunction,
  useNavigate
} from 'react-router';
import {
  ServiceContext,
  ServiceContextInstance
} from './Core/serviceContext';
import { IResponse } from './Models/IResponse';
import Cookies from 'universal-cookie';
import { MovieWrapper } from './Components/MovieWrapper/movieWrapper';
import { ArtistsOfTheMonth } from './Components/ArtistsOfTheMonth/artistsOfTheMonth';
import { Charts } from './Components/Charts/charts';
import { Recommendations } from './Components/Recommendations/recommendations';
import { TopGenres } from './Components/TopGenres/topGenres';
import { SURVEY_PATH_PERMISSIONS } from './Authentication/pagePermissions';
import { AuthenticatedRoute } from './Components/AuthenticatedRoute/authenticatedRoute';
import { Survey } from './Components/Survey/survey';
import { ITokenModel } from './Models/User/ITokenModel';
import { UserProfile } from './Components/UserProfile/userProfile';
import { UserProfileWrapper } from './Components/UserProfileWrapper/userProfileWrapper';

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
            if (NON_AUTH_PAGES.includes(trimmedUrl)) {
              return;
            }
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
            cookie.remove(JWT_TOKEN);
            cookie.remove(REFRESH_TOKEN);
            cookie.set(JWT_TOKEN, data.Data!.accessToken)
            cookie.set(REFRESH_TOKEN, data.Data!.refreshToken);
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
  }, []);

  return (<div>
    <Routes>
      <Route path={LOGIN_PATH} element={<Login />} />
      <Route path={SIGN_UP_PATH} element={<Register />} />
      <Route path={SURVEY_PATH} element={
        <AuthenticatedRoute unaunthenticatedRedirectUrl={LOGIN_PATH} permissions={SURVEY_PATH_PERMISSIONS}>
          {/* {!userHasSurveyAnswers ? <Survey /> : <Navigate to={HOME_PATH} />} */}
          {<Survey />}
        </AuthenticatedRoute>
      } />
      <Route path={HOME_PATH} element={
        <HomePage />
      } />
      <Route path={`${HOME_PATH}/:sideBarPage`} element={
        <HomePage />
      } />
      <Route path={FORGOT_PASSWORD_PATH} element={<ForgotPassword />} />
      <Route path={`${RENEW_PASSWORD_PATH}/:email`} element={<RenewPassword />} />
      <Route path={`${MOVIE_WRAPPER_PATH}/:movieName`} element={<MovieWrapper />} />
      <Route path={CHARTS_PATH} element={<Charts />} />
      <Route path={RECOMMENDATIONS_PATH} element={<Recommendations />} ></Route>
      <Route path={TOP_GENRES_PATH} element={<TopGenres />} ></Route>
      <Route path={ARTISTS_OF_THE_MONTH_PATH} element={<ArtistsOfTheMonth />} ></Route>
      <Route path={USER_PROFILE_PATH} element={<UserProfileWrapper />} ></Route>
    </Routes>
  </div>
  );
};