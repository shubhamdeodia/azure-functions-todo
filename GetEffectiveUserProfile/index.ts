import { getAuthTokenFromHeaders } from "../Common/utils";
import { AzureFunction, Context, HttpRequest } from "@azure/functions";
const axios = require("axios");

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
) {
  context.log("JavaScript HTTP trigger function processed a request.");

  const config = {
    headers: {
      "content-type": "application/xml",
      Authorization: `Bearer ${getAuthTokenFromHeaders(req.headers)}`,
    },
  };

  try {
    const response = await axios.get(
      "https://mtl-neam-be01.nuance.com:8443/neam-server/v2/NuanceCustomers/effectiveuserprofile",
      config
    );
    context.log(`statusCode: ${response.statusCode}`);
    context.res = {
      status: 200,
      body: response.data,
    };
    context.done();
    return response; // or return a custom object using properties from response
  } catch (error) {
    context.res = {
      status: 404,
    };
    // If the promise rejects, an error will be thrown and caught here
    context.log(error);
  }
};

export default httpTrigger;
