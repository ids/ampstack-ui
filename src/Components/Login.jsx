import { Authenticator, ThemeProvider, View } from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router';

import '@aws-amplify/ui-react/styles.css';
import "./Login.scss";

import { loginComponents } from './LoginComponents';
import { idsTheme } from './IDStudiosTheme';

export default function Login() {

  const navigate = useNavigate();

  return (
    <View className="Login">
      <ThemeProvider theme={idsTheme} colorMode="system">
        <Authenticator socialProviders={['google', 'amazon']} components={loginComponents}>
          {({ user }) => {

            console.log("Authenticated User props:");
            console.log(user);
            navigate("/");            
          }}
        </Authenticator>
      </ThemeProvider>
    </View>
  );
}