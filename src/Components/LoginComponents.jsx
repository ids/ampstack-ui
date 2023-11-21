import { useTheme, View, Text } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import './LoginComponents.css';

export const loginComponents = {

  Header() {

    return (
      <View textAlign="center" padding="5px">
        <div className="Login-greeting">Sign In to <span className="Login-idstudios">IDStudios</span> Amp<span className="logo-stack">Stack</span></div>
      </View>
    );
  },

  Footer() {
    const { tokens } = useTheme();

    return (
      <View textAlign="center" padding={tokens.space.small}>
        <Text fontSize=".6em" color={tokens.colors.neutral[80]}>
          &copy; All Rights Reserved
        </Text>
      </View>
    );
  }
};
