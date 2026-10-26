import NetworkCall from "../networkCall";
import SettingRequest, {
  UpdateClientDetailsPayload,
} from "../requests/setting";

export const updateProfileApi = async (
  payload: UpdateClientDetailsPayload,
): Promise<unknown> => {
  try {
    // showErrorToast: false — settingTabs.tsx's onProfileSubmit already
    // shows its own specific error toast on failure, so the network layer's
    // generic "Bad Request" toast would otherwise stack on top.
    const response: unknown = await NetworkCall.makeApiCall(
      SettingRequest.updateProfile(payload),
      false,
      false,
    );
    return response;
  } catch (error) {
    return error as Error;
  }
};

export const changePasswordApi = async (payload): Promise<unknown> => {
  try {
    // showErrorToast: false — security.tsx's handleChangePassword already
    // shows its own specific error (errors.debugMessage), so the network
    // layer's generic "Bad Request" toast would otherwise stack on top.
    const response: unknown = await NetworkCall.makeApiCall(
      SettingRequest.changePassword(payload),
      false,
      false,
    );
    return response;
  } catch (error) {
    return error as Error;
  }
};

export const toggleDiscoveryReminderEmailsApi = async (
  payload: any,
): Promise<unknown> => {
  try {
    const response: unknown = await NetworkCall.makeApiCall(
      SettingRequest.toggleDiscoveryReminderEmails(payload),
      false,
    );
    return response;
  } catch (error) {
    return error as Error;
  }
};
