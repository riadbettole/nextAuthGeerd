import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: "eu-north-1_t4upVsL08",
    ClientId: "315hblo6ekas8grvnvhh50aagm"
}

export default new CognitoUserPool(poolData)