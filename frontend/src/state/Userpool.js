import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
	UserPoolId: process.env.NEXT_PUBLIC_POOL_ID,
	ClientId: process.env.NEXT_PUBLIC_APP_CLIENT_ID,
};
const Userpool = new CognitoUserPool(poolData);
export default Userpool;
