import { initializeIcons } from '@fluentui/react';
import {
  useContext,
  useEffect,
  useState
} from 'react';
import {
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
  MY_COLLECTION_PATH,
  MY_HISTORY_PATH,
  RECOMMENDATIONS_PATH,
  REFRESH_TOKEN,
  RENEW_PASSWORD_PATH,
  SIGN_UP_PATH,
  TOP_GENRES_PATH,
  TRENDING_PATH,
  WATCH_LATER_PATH
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
import { MyCollection } from './Components/MyCollection/myCollection';
import { Trending } from './Components/Trending/trending';
import { MyHistory } from './Components/MyHistory/myHistory';
import { Charts } from './Components/Charts/charts';
import { WatchLater } from './Components/WatchLater/watchLater';
import { Recommendations } from './Components/Recommendations/recommendations';
import { TopGenres } from './Components/TopGenres/topGenres';
import { ArtistsOfTheMonth } from './Components/ArtistsOfTheMonth/artistsOfTheMonth';

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

  // const forbidden = authenticationContext.IsForbidden();
  // useEffect(() => {
  //   const trimmedUrl: string = trimUrl(window.location.href);
  //   if (NON_AUTH_PAGES.includes(trimmedUrl)) {
  //     return;
  //   }
  //   if (forbidden === true) {
  //     try {
  //       var accessToken = cookie.get(JWT_TOKEN);
  //       var refreshToken = cookie.get(REFRESH_TOKEN);
  //       if ((refreshToken === undefined || refreshToken === "")) {
  //         if (!authenticationContext.IsAuthenticated()) {
  //           window.alert(SESSION_EXPIRED_MESSAGE);
  //           cookie.remove(JWT_TOKEN);
  //           cookie.remove(REFRESH_TOKEN)
  //           navigate(LOGIN_PATH);
  //           return;
  //         }
  //         hasSurveyPath();
  //         return;
  //       }
  //       const tokenModel: ITokenModel = {
  //         accessToken,
  //         refreshToken
  //       };
  //       services.AuthenticationService.RefreshToken(tokenModel).then((data: IResponse<ITokenModel>) => {
  //         if (data !== null && data.Data!.refreshToken !== null && data.Data!.accessToken !== null) {
  //           cookie.set(REFRESH_TOKEN, data.Data!.refreshToken);
  //           cookie.set(JWT_TOKEN, data.Data!.accessToken)
  //         }
  //       });
  //       hasSurveyPath();
  //       return;
  //     }
  //     catch (e) {
  //       handleAuthorizationExpired();
  //       return;
  //     }
  //   }
  //   hasSurveyPath();
  // }, [authenticationContext.User, forbidden]);

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
    //document.body.style.overflow = "hidden";
  }, []);

  return (<div>
    <Routes>
      <Route path={LOGIN_PATH} element={<Login />} />
      <Route path={SIGN_UP_PATH} element={<Register />} />
      {/* <Route path={SURVEY_PATH} element={
        <AuthenticatedRoute unaunthenticatedRedirectUrl={LOGIN_PATH} permissions={SURVEY_PATH_PERMISSIONS}>
          {!userHasSurveyAnswers ? <Survey /> : <Navigate to={HOME_PATH} />}
        </AuthenticatedRoute>
      } /> */}
      <Route path={HOME_PATH} element={
        <HomePage />
      } />
      <Route path={FORGOT_PASSWORD_PATH} element={<ForgotPassword />} />
      <Route path={`${RENEW_PASSWORD_PATH}/:email`} element={<RenewPassword />} />
      <Route path={`${MOVIE_WRAPPER_PATH}/:movieName`} element={<MovieWrapper />} />
      <Route path={MY_COLLECTION_PATH} element={<MyCollection />} />
      <Route path={TRENDING_PATH} element={<Trending />} />
      <Route path={TRENDING_PATH} element={<Trending />} />
      <Route path={MY_HISTORY_PATH} element={<MyHistory />} />
      <Route path={CHARTS_PATH} element={<Charts />} />
      <Route path={WATCH_LATER_PATH} element={<WatchLater />} ></Route>
      <Route path={RECOMMENDATIONS_PATH} element={<Recommendations />} ></Route>
      <Route path={TOP_GENRES_PATH} element={<TopGenres />} ></Route>
      <Route path={ARTISTS_OF_THE_MONTH_PATH} element={<ArtistsOfTheMonth />} ></Route>
    </Routes>
  </div>
  );
};