import { createContext } from "react";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import Pool from "../UserPool";


const defaultValue: any = {
    authenticate: async (Username: string, Password: string) => {},
    getSession: async () => {},
    logout: ()=> {},
    getAttributes: async() => {},
  };
  
  const AccountContext = createContext<any>(defaultValue);

const Account = (props:any) => {
  const getSession = async () =>{
    return await new Promise((resolve, reject) => {
        const user = Pool.getCurrentUser();
        
        if(user){
            user.getSession((err: any, session: any) => {
                if(err) reject();
                else resolve(session);
                
            });
        }else{
           reject(); 
        }
    })
  }

  const getAttributes = async() => {
    return await new Promise((resolve, reject) => {
      const user = Pool.getCurrentUser();
      
      if(user){
          user.getSession((err: any, session: any) => {
            user.getUserAttributes(function(err, attributes) {
              if (err) {
                reject("Error getting user attributes: " + err);
              } else {
                resolve({ session, attributes });
              }
            });
              
          });
      }else{
         reject(); 
      }
  })
  }


  const logout = () => {
    const user = Pool.getCurrentUser();
    if(user) {
        user.signOut();
      
    }

  }

  const authenticate = async (Username: string, Password: string) => {
    return await new Promise((resolve, reject) => {
      const user = new CognitoUser({ Username, Pool });

      const authDetails = new AuthenticationDetails({ Username, Password });

      user.authenticateUser(authDetails, {
        onSuccess: (data) => {
          console.log("onSuccess", data);
          resolve(data)
        },
        onFailure: (err) => {
          console.log("onFailure", err);
          reject(err)
        },
        newPasswordRequired: (data) => {
          console.log("newPasswordRequired", data);
          resolve(data)
        },
      });
    });
  };
  return <AccountContext.Provider value={{ authenticate, getSession, logout, getAttributes }}>
    {props.children}
  </AccountContext.Provider>;
};

export { Account, AccountContext};
