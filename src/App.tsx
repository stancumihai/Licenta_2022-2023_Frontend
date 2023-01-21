import { initializeIcons } from '@fluentui/react';
import { useEffect } from 'react';
import { SignUp } from './Components/SignUp/signUp';

initializeIcons(undefined, { disableWarnings: true });

export default function App(): JSX.Element {

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflow = "hidden";
  }, []);

  return (
    <div>
      <SignUp />
    </div>
  );
};