import { initializeIcons } from '@fluentui/react';
import { useContext, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthentificationContext from './Authentication/authenticationContext';
import { IAuthentificationContext } from './Authentication/authenticationContext.types';
import { Login } from './Components/Login/login';
import { SignUp } from './Components/SignUp/signUp';
import { Survey } from './Components/Survey/survey';
import { LOGIN_PATH, SIGN_UP_PATH, SURVEY_PATH } from './Library/constants';

initializeIcons(undefined, { disableWarnings: true });

export default function App(): JSX.Element {
  const authenticationContext: IAuthentificationContext = useContext(AuthentificationContext);


  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflow = "hidden";
  }, []);

  return (
    <div>
      <Routes>
        <Route path={LOGIN_PATH} element={<Login />} />
        <Route path={SIGN_UP_PATH} element={<SignUp />} />
        <Route path={SURVEY_PATH} element={<Survey />} />
      </Routes>
    </div>
  );
};