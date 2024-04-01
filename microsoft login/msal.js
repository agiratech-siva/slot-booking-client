import { PublicClientApplication } from "@azure/msal-browser";
import { config } from "dotenv";
config();

const msalConfig = {
  auth: {
    clientId: "c2019ec1-91b6-49ba-b84a-8dc71cbce5f9",
    authority:
      "https://login.microsoftonline.com/2a4a5a22-099a-4115-86f7-35b1367f0ea9",

    redirectUri: `${process.env.REDIRECT_URL}`,

  },
  cache: {
    cacheLocation: "localStorage",
  },
};


const login = async () => {
  
  const msalInstance = 
    await PublicClientApplication.createPublicClientApplication(msalConfig);

  const response = await msalInstance.loginPopup({
    scopes: ["user.read"],
    prompt: "select_account",

    redirectUri: `${process.env.REDIRECT_URL}`,

    popup: true,
  });

  console.log(response);
  const myAccounts = msalInstance.getAllAccounts();

  console.log(myAccounts);
  if (myAccounts.length > 0) {
    msalInstance.setActiveAccount(myAccounts[0]);
  }

  const request = {
    scopes: ["User.Read"],
  };

  msalInstance
    .acquireTokenSilent(request)
    .then((tokenResponse) => {
      var headers = new Headers();
      var bearer = "Bearer " + tokenResponse.accessToken;
      console.log(bearer);
      headers.append("Authorization", bearer);
      var options = {
        method: "GET",
        headers: headers,
      };
      var graphEndpoint = "https://graph.microsoft.com/v1.0/me";

      fetch(graphEndpoint, options)
        .then((resp) => {
          console.log("graph response");
          return resp.json();
        })
        .then((res) => {
          console.log(res);
          localStorage.setItem("employee-id", res.id);

          fetch(`${process.env.ENV_URL}/users/addusertothedb`, {

            method: "post",
            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({
              employeeId: res.id,
              mailId: res.mail,
              phone: res.mobilePhone,
              name: res.displayName,
            }),
          })
            .then(() => {
                
              // window.location.href = "/";
              
              
            })
            .catch((err) => console.log(err));
        });
    })
    .catch(async (error) => {
      console.log(error.name);
      console.log(error);
      if (error.name === "InteractionRequiredAuthError") {
        console.log("siva");
        return await msalInstance.acquireTokenPopup(request);
      }
    });
};

export default login;
