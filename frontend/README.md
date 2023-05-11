# Event Ticketing Service

This is an example project that showcases how agents can be used to control business flows in a service. The project also provides customizable event streams to the service to simulate changes in business and see how agents can self-regulate. It showcases the power of the myndshare.ai agent/human integration framework to enable autonomous organizations driven by software agents. 

## Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and uses the [AWS Amplify Framework](https://aws-amplify.github.io/) to manage the backend.

### Prerequisites

To run this project, you will need the following installed on your machine:

- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/get-npm)
- [AWS CLI](https://aws.amazon.com/cli/)

### Installation

To install the project dependencies, run the following command:

```
npm install
```

### Configuration

To configure the Amplify framework for this project, run the following command:

```
amplify configure
```

This command will guide you through the process of setting up an AWS account and creating an IAM user for Amplify.

After configuring Amplify, you can create the backend resources for this project by running the following command:

```
amplify init
```

This command will prompt you to select the type of backend you want to create. Choose "GraphQL API" and follow the prompts to create the API.

### Usage

To start the development server, run the following command:

```
npm start
```

This command will start the development server and open the application in your default browser.

### Deploying

To deploy the application to a production environment, run the following command:

```
npm run build
amplify publish
```

This command will build the application for production and deploy it to the AWS infrastructure you created earlier.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.