import K from "@/constants";
import Request from ".";

export interface UpdateClientDetailsPayload {
  id: string | number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  company?: string;
}

export default class SettingRequest extends Request {
  static updateProfile(payload: UpdateClientDetailsPayload): Request {
    return new Request(
      K.Network.URL.UPDATE_PROFILE,
      K.Network.Method.PUT,
      payload,
      K.Network.Header.Type.Json,
      {},
    );
  }

  static changePassword(payload): Request {
    return new Request(
      K.Network.URL.CHANGE_PASSWORD,
      K.Network.Method.POST,
      payload,
      K.Network.Header.Type.Json,
      {},
    );
  }
  static toggleDiscoveryReminderEmails(payload: any): Request {
    return new Request(
      K.Network.URL.TOGGLE_DISCOVERY_REMINDER_EMAILS,
      K.Network.Method.POST,
      payload,
      K.Network.Header.Type.Json,
      {},
    );
  }
}
