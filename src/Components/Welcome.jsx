import './Welcome.scss';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { Link } from 'react-router-dom';
import Image from 'react-bootstrap/Image';

export default function Welcome() {
  
  const { route, user } = useAuthenticator((context) => [context.route]);  
  const userName = user !== undefined ? user.attributes['email'] : "good user";

  return (
    <div className="Welcome">
      <Image src="/AmpStack-Logo.drawio.svg" fluid rounded="true"/>

      { route === 'authenticated' ? (
        <>
        <div className="Welcome-message">
          Welcome back <span className="Welcome-user">{userName}</span>
        </div>
        <div className="Welcome-submessage">
          click <Link to={`workspace`}>here</Link> to go to the <b>Demo</b> Workspace...
        </div>
        </>
    ) : (
        <>
        <h1>Welcome to AmpStack HQ</h1>
        <div className="Welcome-intromessage">
          Sign in for the <b>Demo</b> Workspace
        </div>
       </>
       )
      }      
    </div>
  );
}