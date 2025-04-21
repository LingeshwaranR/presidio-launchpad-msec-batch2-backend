import { IResponseWrapper } from "../Interfaces/ResponseWrapper";

export const createResponse = (
  message: string,
  data: any = {},
  exception: any = null
): IResponseWrapper => {
  return {
    responseMessage: message,
    exception,
    responseData: data,
  };
};
