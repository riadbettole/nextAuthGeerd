import { useState, useContext } from "react";
import { AccountContext } from "../../components/account";
import axios from "axios";

export default function handler(req, res) {
  // Access the context value directly
  const [email, setEmail] = useState("");
  const { getAttributes } = useContext(AccountContext);
  getAttributes().then((attributes: any) => {
    setEmail(attributes.attributes[2].Value);
  });
  // Query the database using the user's email from the context

  const response = axios.get(
    "https://frank-escargot-48.hasura.app/api/rest/getTodos/" + email,
    {
      headers: {
        "x-hasura-admin-secret":
          "7K53r5z1dEm26jYFzTtnqwoJrEUr4mRScaAKDD0kGCx3z8zIaC2dab5LFRoQVANO",
      },
    }
  );
  return {
    props: {
        response,
    },
  };
  // Handle the result and send the appropriate response
  // ...
}
