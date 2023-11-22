
### Benefits:

- __No servers to manage!__
- Development environments cost pennies a day
- Fully scalable simply by increasing DynamoDB WCU and RCU allocations
- Simple development model (once you grok it)
- Integrated CI/CD

### Highlights:

- Leverages the [Amplify](https://docs.amplify.aws) platform for distribution of the __Web SPA__ to a __CloudFront CDN__ with __custom DNS__ and __free TLS__ from AWS.  
- Uses a [Serverless Framework](https://www.serverless.com/framework/docs) __ExpressJS REST API__ backend linked to the same __AWS Cognito__ user pool for shared authentication. 
- Enables the __Amplify Web SPA__ to be a front-end component of a micro-service architecture. 

<br/>

### Micro-Service Usage:
The AmpStack pattern is well suited to fanning out API functionality among numerous teams in a __micro-services__ style fashion, including 3rd party services and custom cloud provider offerings.

<div class="About-diagram-container">
  <img src="../../../public/AmpStack-AmpStackMicroservice.svg" alt="image" class="About-microservice-diagram">
</div>

- Micro-services are not about the size of the API, or the scope of its function, or its ability to handle load.  They solve the problem of federating services across numerous teams to enable parallel development in large organizations with complex systems. A single serverless API can scale to any load - but you don't want to co-ordinate 5 teams of people all issuing pull requests to a large multi-topic codebase.  Enter micro-services.
- A well articulated monolith is easier to re-factor into a micro-services application shared across newly established development teams then a distributed monolith attempting to guess future team structure and application evolution.  Adopting micro-services before you have the teams to support them is akin to pre-mature optimization, and will almost always result in __more__ rework, not less.

<br/>

### Additional Notes:
- __Serverless Framework__ enables running __Serverless Express__ locally for development and debugging, with numerous plugins, such as the local __DynamoDB__, [serverless-dynamodb](https://github.com/raisenational/serverless-dynamodb), and a mature development platform.
- __Amplify Backend__ can still be used in addition to the Serverless API.
- Demonstrates how __Cognito Authentication__ can be re-used across AWS services.
- __Serverless Framework__ AWS resources are declarative in the __serverless.yml__ to generate __Cloud Formation__ templates automatically. 
- The initiap implementation used React, while this version uses VanillaJS and Backbone to demonstrate that any front-end javascript framework can be used.   
- Development costs are minimal due to serverless nature.

### Source
The source code for the sample application is available for reference. [See the README files for more technical details](https://github.com/ids/ampstack-ui/blob/master/README.md).

[ampstack-api](https://github.com/ids/ampstack-api) repo contains the Node.js Serverless Express based REST API (Lambda handler), currently deployed using __sls deploy__.

[ampstack-ui](https://github.com/ids/ampstack-ui) repo contains the Amplify React SPA implemented with Vite React + Bootstrap and deployed via CI/CD using __git push__.

- The [dev branch](https://github.com/ids/ampstack-ui/tree/dev) is deployed to the [master branch](https://github.com/ids/ampstack-ui/tree/master) environment using __pull requests__.  This represents a basic Dev->Prod workflow.

[ampstack-ui (backbone)](https://github.com/ids/ampstack-ui/tree/backbone) __branch__ contains this Amplify SPA implemented with __Vite VanillaJS + Backbone + Bootstrap__, illustrating how to use Amplify Auth and API in a VanillaJS project. There are no pre-built authentication UI libraries for VanillaJS, so you either have to offload to the hosted UI option, or build your own flow.  This example builds a basic flow from the Amplify authentication API.

- The __backbone__ project required several Amplify environments to be able to connect to a single backend API.  As Amplify Cognito user pools are tied to the redirect URLs, it is not possible to share them among Amplify applications, however multiple Cognito user pools may be associated to a single API authorizer, as discussed further in the [ampstack-api README](https://github.com/ids/ampstack-api)

#### The React UI
The original [AmpStack UI - React Edition](https://ampstack.aws.idstudios.io)
