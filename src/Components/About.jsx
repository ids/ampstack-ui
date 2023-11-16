import Image from 'react-bootstrap/Image';
import Markdown from 'react-markdown'
import './About.scss';

const markdown = `

### Highlights:

- Leverages the __Amplify__ platform for distribution of the __React SPA__ to a __CloudFront CDN__ with __custom DNS__ and __free TLS__ from AWS.  
- Uses a __Serverless ExpressJS REST API__ backend linked to the same __AWS Cognito__ user pool for shared authentication. 
- Enables the __Amplify React SPA__ to be a front-end component of a micro-service architecture. 

### Notes:
- __Serverless Framework__ enables running __Serverless Express__ locally for development and debugging, with numerous plugins, such as the local __DynamoDB__, [serverless-dynamodb](https://github.com/raisenational/serverless-dynamodb), and a mature development platform.
- __Amplify Backend__ can still be used in addition to the Serverless API.
- Demonstrates how __Cognito Authentication__ can be re-used across AWS services.
- __Serverless Framework__ AWS resources are declarative in the __serverless.yml__ to generate __Cloud Formation__ templates automatically. 
- Although implemented as React, the front-end can be any of the supported Amplify Front-end frameworks (Angular, NextJS, VuewJS, React and plain old Javascript).   
- Development costs are minimal due to serverless nature.

### Source
The source code for the sample application is available for reference.

[ampstack-api](https://github.com/ids/ampstack-api) repo contains the Node.js Serverless Express based REST API (Lambda handler), currently deployed using __sls deploy__.

[ampstack-ui](https://github.com/ids/ampstack-ui) repo contains the Amplify React SPA implemented with Vite React + Bootstrap and deployed via CI/CD using __git push__.

`;

export default function About() {
  
  return (
    <div className="About">
        <h1>The Amp<span className="logo-stack">Stack</span></h1>
        <p className="About-subtitle">A completely serverless web application platform.</p>
        <Image className="About-diagram" src="/AmpStack-AmpStackAlt.drawio.svg" fluid rounded="true"/>
        <Markdown className="About-message">{markdown}</Markdown>
    </div>
  );
}