import { useState, useContext, useEffect } from "react";
import { AccountContext } from "./account";
import { useRouter } from "next/router";

const Status = () => {
  const [status, setStatus] = useState(false);
  const [email, setEmail] = useState("");

  const { getSession, logout, getAttributes } = useContext(AccountContext);
  
  const Router = useRouter();
  const logoutDir = () => {
    logout();
    Router.push('/')
  }

  useEffect(() => {
   
    getSession().then((session: any) => {
      setStatus(true);
    });
    getAttributes().then((attributes: any)=>{
      setEmail(attributes.attributes[2].Value)
    })
    
  });
  
  return(
    <div className="flex flex-col items-center">
      <div className="flex gap-3">
      <p>hey </p><b>{email}</b>
      </div>
      {
        status ? (<button className="m-4 border-2 rounded-lg" onClick={logoutDir}>Logout</button>) : "Please login"
      }
    </div>
  )
};

export default Status;