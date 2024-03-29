import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { AuthentificationContextProvider } from './Contexts/Authentication/authenticationContext';
import { MovieContextProvider } from './Contexts/Movie/movieContext';
import { UIContextProvider } from './Contexts/Ui/uiContext';
import { UserContextProvider } from './Contexts/User/userContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <AuthentificationContextProvider>
    <UIContextProvider>
      <MovieContextProvider>
        <UserContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </UserContextProvider>
      </MovieContextProvider>
    </UIContextProvider>
  </AuthentificationContextProvider>
);