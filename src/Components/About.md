
### Benefits:

- __No servers to manage!__
- Development environments cost pennies a day
- Fully scalable simply by increasing DynamoDB WCU and RCU allocations
- Simple development model (once you grok it)
- Integrated CI/CD

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
The source code for the sample application is available for reference. [See the README files for more technical details](https://github.com/ids/ampstack-ui/blob/master/README.md).

[ampstack-api](https://github.com/ids/ampstack-api) repo contains the Node.js Serverless Express based REST API (Lambda handler), currently deployed using __sls deploy__.

[ampstack-ui](https://github.com/ids/ampstack-ui) repo contains the Amplify React SPA implemented with Vite React + Bootstrap and deployed via CI/CD using __git push__.

- The [dev branch](https://github.com/ids/ampstack-ui/tree/dev) is deployed to the [master branch](https://github.com/ids/ampstack-ui/tree/master) environment using __pull requests__.  This represents a basic Dev->Prod workflow.

[ampstack-ui (backbone)](https://github.com/ids/ampstack-ui/tree/backbone) __branch__ contains the Amplify SPA implemented with __Vite VanillaJS + Backbone + Bootstrap__, illustrating how to use Amplify Auth and API in a VanillaJS project. There are no pre-built authentication UI libraries for VanillaJS, so you either have to offload to the hosted UI option, or build your own flow.  This example builds a basic flow from the Amplify authentication API.

- The __backbone__ project required several Amplify environments to be able to connect to a single backend API.  As Amplify Cognito user pools are tied to the redirect URLs, it is not possible to share them among Amplify applications, however multiple Cognito user pools may be associated to a single API authorizer, as discussed further in the [ampstack-api README](https://github.com/ids/ampstack-api)
