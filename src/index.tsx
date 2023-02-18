import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { AuthentificationContextProvider } from './Authentication/authenticationContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <AuthentificationContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthentificationContextProvider>
);