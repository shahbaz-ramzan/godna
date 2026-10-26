import K from "../../constants";
import Request from ".";

export default class UserRequest extends Request {
  static getParticipantDetails(payload: any): Request {
    return new Request(
      K.Network.URL.GET_PARTICIPANTS_DETAIL,
      K.Network.Method.POST,
      payload,
      K.Network.Header.Type.Json,
      {},
    );
  }
  static getAllAccountsByPersonId(personId: string): Request {
    return new Request(
      `${K.Network.URL.GET_ALL_ACCOUNTS_BY_PERSON_ID}/${personId}`,
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
    );
  }

  static searchParticipantByAccount(payload): Request {
    return new Request(
      K.Network.URL.GET_USERS_LIST,
      K.Network.Method.POST,
      payload,
      K.Network.Header.Type.Json,
      {},
    );
  }

  static saveParticipantToAccount(payload: any): Request {
    return new Request(
      K.Network.URL.SAVE_USER_TO_ACCOUNT,
      K.Network.Method.POST,
      payload,
      K.Network.Header.Type.Json,
      {},
    );
  }

  static getTags(accountId: string): Request {
    return new Request(
      `${K.Network.URL.GET_MANAGE_TAGS}/${accountId}`,
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
    );
  }

  static getCommunicationInsights(personId: string): Request {
    return new Request(
      `${K.Network.URL.GET_COMMUNICATION_INSIGHTS}/${personId}`,
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
    );
  }
}
