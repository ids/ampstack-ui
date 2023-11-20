import { useAuthenticator } from '@aws-amplify/ui-react';
import { Link } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import './Welcome.scss';

export default function Welcome() {
  
  const { route, user } = useAuthenticator((context) => [context.route]);  
  const userName = user !== undefined ? user.attributes['email'] : "good user";

  return (
    <div className="Welcome">
      <Image src="/AmpStack-Logo.svg" fluid rounded="true"/>
      <div className="container">
        <div className="row">
          <div className="col-12">
          </div>
          <div className="col-12 logo-bar">
            <div className="tag-line">
              <span className="edition">The <a href="https://github.com/ids/ampstack-ui/tree/master">React</a> Edition</span>
            </div>
            <img src="/vite.svg" className="logo" alt="Vite" />
            <img src="/react.svg" className="logo React" alt="React" />
          </div>
        </div>
      </div>

      { route === 'authenticated' ? (
        <>
        <div className="Welcome-message">
          Welcome back <span className="Welcome-user">{userName}</span>
        </div>
        <div className="Welcome-submessage">
          click <Link to={`workspace`}>Workspace</Link> to go to the <b>Demo</b> Workspace...
        </div>
        <div className="Welcome-submessage">
          check the <Link to={`about`}>About</Link> page for details.
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