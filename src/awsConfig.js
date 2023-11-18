import { Amplify } from 'aws-amplify';
import { fetchAuthSession } from 'aws-amplify/auth';
import awsconfig from './amplifyconfiguration.json';

export default function awsConfig() {
  const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === '[::1]' ||
      // 127.0.0.1/8 is considered localhost for IPv4.
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
  );
  
  // Assuming you have two redirect URIs, and the first is for localhost and second is for production
  const [
    localRedirectSignIn,
    productionRedirectSignIn,
  ] = awsconfig.oauth.redirectSignIn.split(',');
  
  const [
    localRedirectSignOut,
    productionRedirectSignOut,
  ] = awsconfig.oauth.redirectSignOut.split(',');
  
  const updatedAwsConfig = {
    ...awsconfig,
    oauth: {
      ...awsconfig.oauth,
      redirectSignIn: isLocalhost ? localRedirectSignIn : productionRedirectSignIn,
      redirectSignOut: isLocalhost ? localRedirectSignOut : productionRedirectSignOut,
    }
  }
  
  console.log(`selected redirect signin URI: ${updatedAwsConfig.oauth.redirectSignIn}`);
  console.log(`selected redirect signout URI: ${updatedAwsConfig.oauth.redirectSignOut}`);
  
  if(updatedAwsConfig.aws_cloud_logic_custom === undefined) {
    updatedAwsConfig.aws_cloud_logic_custom = [];
  }
  
  
  updatedAwsConfig.aws_cloud_logic_custom.push(
    {
      name: import.meta.env.VITE_EXPRESS_ENDPOINT_NAME,
      endpoint: import.meta.env.VITE_EXPRESS_ENDPOINT,
      region: import.meta.env.VITE_EXPRESS_ENDPOINT_REGION,
      headers: async () => {
        console.log("SETTING HEADERS");
        return { Authorization: `Bearer ${(await fetchAuthSession()).tokens.idToken }` };
      }
    }
  );


  console.log(`API: ${import.meta.env.VITE_EXPRESS_ENDPOINT_NAME}`);
  console.log(`API Endpoint: ${import.meta.env.VITE_EXPRESS_ENDPOINT}`);
  console.log(`API Endpoint Region: ${import.meta.env.VITE_EXPRESS_ENDPOINT_REGION}`);
  
  Amplify.configure(updatedAwsConfig, {
    API: {
      REST: {
        headers: async () => {
          return { 'Authorization': `Bearer ${(await fetchAuthSession()).tokens.idToken }` };
        }
      }
    }
  });
  
  console.log("AWS CONFIG:");
  console.log(updatedAwsConfig);
}