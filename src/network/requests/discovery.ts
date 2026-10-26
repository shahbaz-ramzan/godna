import Request from ".";
import K from "../../constants";
export default class DiscoveryRequest extends Request {
  static checkParticipant(personId: string): Request {
    return new Request(
      `${K.Network.URL.CHECK_PARTICIPANT}/${personId}`,
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
    );
  }
  static getDiscoveryStatus(creditId: string): Request {
    return new Request(
      `${K.Network.URL.GET_DISCOVERY_STATUS}/${creditId}`,
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
    );
  }
  static getPersonCreditId(personId: string): Request {
    return new Request(
      `${K.Network.URL.GET_PERSON_CREDIT_ID}/${personId}`,
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
    );
  }
  static getQuestionAnswerStatus(personId: string): Request {
    return new Request(
      `${K.Network.URL.GET_QUESTION_ANSWER_STATUS}/${personId}`,
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
    );
  }
  static insert11Q17QAnswers(body: any): Request {
    return new Request(
      `${K.Network.URL.INSERT_11Q_17Q_ANSWERS}`,
      K.Network.Method.POST,
      body,
      K.Network.Header.Type.Json,
      {},
    );
  }
  static getUniqueStyle(personId: string): Request {
    return new Request(
      `${K.Network.URL.GET_UNIQUE_STYLE}/${personId}`,
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
    );
  }
}
