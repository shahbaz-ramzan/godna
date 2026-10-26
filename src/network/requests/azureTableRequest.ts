import K from "../../constants";

interface Headers {
  [key: string]: string;
}

export default class AzureTableRequest {
  url: string;
  method: string;
  body: any;
  headers: Headers;

  constructor(
    relativeURL: string,
    method: string = K.Network.Method.GET,
    body: any = null,
    headers: Headers = {}
  ) {
    const defaultHeaders: Headers = {
      "Accept": "application/json;odata=nometadata",
      "DataServiceVersion": "3.0",
      "Content-Type": "application/json",
      ...headers,
    };

    this.url = relativeURL;
    this.method = method;
    this.body = body;
    this.headers = defaultHeaders;
  }
}
