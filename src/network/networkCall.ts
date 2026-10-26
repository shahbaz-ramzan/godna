import { permanentRedirect } from "next/navigation";
import K from "@/constants";
import { Routes } from "@/constants/routes";
import { clearLocalStorage } from "@/utils/localStorage";
import { setCookie } from "cookies-next";
import { toast } from "react-hot-toast";

interface IRequest {
  url: string;
  method: string;
  body?: any;
  headers?: { [key: string]: string };
}

export default class NetworkCall {
  static async makeApiCall<T>(
    request: IRequest,
    // cacheOptions: RequestInit = { cache: "no-store" },
    showSuccessToast: boolean = true,
    showErrorToast: boolean = true,
  ): Promise<T> {
    const options: RequestInit = {
      method: request.method,
      headers: {
        "Content-Type": "application/json",
        ...request.headers,
      },
    };

    if (request.body) {
      options.body = JSON.stringify(request.body);
    }

    try {
      let response: Response;
      if (request.method.toLowerCase() === "get") {
        response = await fetch(request.url, options);
      } else {
        response = await fetch(request.url, options);
      }
      await this.handleResponseStatus(response, showSuccessToast, showErrorToast);

      if (response.status === K.Network.StatusCode.NoContent) {
        return undefined as T;
      }

      const contentType = response.headers.get("content-type");
      if (contentType?.includes("application/json")) {
        return (await response.json()) as T;
      } else {
        // Handle other content types (e.g., text/plain) here
        // Make sure to return something of type T or throw an error
        throw new Error("Unsupported content type: " + contentType);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error:", error.message);
        throw error;
      }
      throw new Error("An unknown error occurred");
    }
  }

  /**
   * Handles different HTTP response statuses.
   * @param {Response} response - The fetch response object.
   * @param {boolean} showSuccessToast - Whether to show success toast (default: true)
   */

  private static async handleResponseStatus(
    response: Response,
    showSuccessToast: boolean = true,
    showErrorToast: boolean = true,
  ): Promise<void> {
    const statusCode = K.Network.StatusCode;
    const errorMessages = K.Network.ErrorMessages;
    const responseStatus = response.status;

    switch (responseStatus) {
      case statusCode.Successful:
        if (showSuccessToast) {
          toast.success(errorMessages.Successful);
        }
        return; // Successful response, no action needed
      case statusCode.NoContent:
        return; // Successful response with no content, no toast either way
      case statusCode.BadRequest:
        if (showErrorToast) {
          toast.error(errorMessages.BadRequest);
        }
        // Handle bad request
        break;
      case statusCode.Unauthorized:
        setCookie("token", "");
        clearLocalStorage();
        sessionStorage.clear();
        globalThis.location.href = Routes.LOGIN;
        // Logout or redirect
        // permanentRedirect("/unauthorized");
        // toast.error(errorMessages.Unauthorized);
        throw new Error("Unauthorized");
      case statusCode.Forbidden:
        // Redirect to Forbidden Fallback UI
        toast.error(errorMessages.Forbidden);
        permanentRedirect("/unauthorized");
        break;
      case statusCode.ServerError:
        toast.error(errorMessages.ServerError);
        // Redirect to Server Error Fallback UI
        break;
      default:
        toast.error(`${responseStatus} - ${response.statusText}`);
        throw new Error(`Error: ${responseStatus} - ${response.statusText}`);
    }
  }
}
