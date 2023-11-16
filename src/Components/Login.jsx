import { Authenticator, ThemeProvider, View } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import "./Login.scss";

import { loginComponents } from './LoginComponents';
import { idsTheme } from './IDStudiosTheme';

export default function Login() {

  return (
    <View className="Login">
      <ThemeProvider theme={idsTheme} colorMode="system">
        <Authenticator socialProviders={['google', 'amazon']} components={loginComponents}>
          {({ user }) => {

            console.log("authenticated user props:");
            console.log(user);
            
          }}
        </Authenticator>
      </ThemeProvider>
    </View>
  );
}