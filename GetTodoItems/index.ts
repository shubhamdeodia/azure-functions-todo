import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { getUserId } from "../Common/utils";
import { getAllTodoItems } from "../Services/cosmosTodoServices";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log.info("Get all todo items started");

  const todoItems = await getAllTodoItems(getUserId(req.headers));

  if (todoItems && todoItems.length > 0) {
    context.res = {
      status: 200,
      body: todoItems,
    };
  } else {
    context.res = {
      status: 204,
    };
  }

  context.log.info("Get all todo items completed.");
  context.done();
};

export default httpTrigger;
