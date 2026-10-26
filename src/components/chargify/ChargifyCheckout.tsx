"use client";

import { STORAGE_KEYS } from "@/constants/localStorageKeys";
import { Routes } from "@/constants/routes";
import { useAccountId } from "@/hooks/useAccountId";
import { updatePaymentMethodApi } from "@/network/apis/payment";
import { goDnaSignUpApi } from "@/network/apis/subscription";
import { setLocalStorageItem } from "@/utils/localStorage";
import { Button, Col, Row, Typography } from "antd";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";

const { Title } = Typography;
declare global {
  interface Window {
    Chargify?: new () => {
      load: (config: {
        publicKey: string;
        serverHost: string;
        type: string;
        fields: Record<
          string,
          { selector: string; placeholder: string; required?: boolean }
        >;
      }) => void;
      token: (
        form: HTMLFormElement,
        success: (token: { id: string }) => void,
        error: (err: any) => void,
      ) => void;
    };
  }
}

interface ChargifyCheckoutProps {
  updatePayment?: boolean;
  formValues?: {
    firstName: string;
    lastName: string;
    email: string;
    company?: string;
    phoneNumber?: string;
    password: string;
    confirmPassword: string;
  };
  onCancel?: () => void;
  onSuccess?: () => void;
  isLoading?: boolean;
  setIsLoading?: (loading: boolean) => void;
  addPayment?: boolean;
}

export default function ChargifyCheckout({
  updatePayment = false,
  formValues,
  onCancel,
  onSuccess,
  isLoading,
  setIsLoading,
  addPayment = false,
}: Readonly<ChargifyCheckoutProps>) {
  const chargifyRef = useRef<InstanceType<typeof globalThis.Chargify> | null>(
    null,
  );
  const formRef = useRef<HTMLFormElement>(null);
  const hasInitializedRef = useRef(false);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const accountId = useAccountId();
  const publicKey = process.env.NEXT_PUBLIC_CHARGIFY_PUBLIC_KEY;
  const serverHost = process.env.NEXT_PUBLIC_CHARGIFY_SERVER_HOST;
  const productHandle = process.env.NEXT_PUBLIC_PRODUCT_HANDLE;
  const init = useCallback(() => {
    if (hasInitializedRef.current) return;
    if (!globalThis.Chargify) return;
    try {
      const chargify = new globalThis.Chargify();
      chargify.load({
        publicKey,
        serverHost,
        type: "card",
        fields: {
          number: { selector: "#card-number", placeholder: "123456789" },
          month: { selector: "#card-month", placeholder: "MM" },
          year: { selector: "#card-year", placeholder: "YYYY" },
          cvv: { selector: "#card-cvv", placeholder: "CVV", required: true },
        },
      });
      chargifyRef.current = chargify;
      hasInitializedRef.current = true;
      setReady(true);
    } catch (e) {
      console.error("Failed to load Chargify payment form:", e);
      setError("Something went wrong. Please try again.");
    }
  }, [publicKey, serverHost]);

  // Initialize Chargify if not already initialized
  useEffect(() => {
    if (!ready && globalThis.Chargify) {
      init();
    }
  }, [init, ready]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chargifyRef.current || !formRef.current) return;
    setError(null);
    try {
      setIsLoading(true);
      const tokenResponse = await new Promise<{ id: string }>(
        (resolve, reject) => {
          chargifyRef.current!.token(
            formRef.current!,
            (token) => resolve(token),
            (err) => reject(err),
          );
        },
      );

      if (updatePayment) {
        await updatePaymentMethod(tokenResponse);
      } else {
        await signUp(tokenResponse);
      }
    } catch (err: any) {
      setError(err?.message || "Failed to add payment method");
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (tokenResponse: any) => {
    const {
      email,
      firstName,
      lastName,
      company = "",
      phoneNumber = "",
      password,
      confirmPassword,
    } = formValues;

    const requestBody = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      company: company,
      phone: phoneNumber,
      productHandle: productHandle,
      password: password,
      confirmedPassword: confirmPassword,
      tokenId: tokenResponse,
    };
    const response = await goDnaSignUpApi(requestBody);
    if (response?.data) {
      setLocalStorageItem(STORAGE_KEYS.HAS_SIGNED_UP, true);
      toast.success(response.data.message, { duration: 10000 });
      router.push(Routes.LOGIN);
    } else if (response?.message?.toLowerCase().includes("already exists")) {
      toast.error(
        <span>
          {response.message}
          {". "}
          <a
            href="https://kb.dnabehavior.com/gene/why-am-i-seeing-user-already-exists-godna-sign-up-issue"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "underline", color: "inherit" }}
          >
            How to fix this?
          </a>
        </span>,
        { duration: 10000 },
      );
    } else {
      toast.error(response?.message);
    }
  };

  const updatePaymentMethod = async (tokenResponse: { id: string }) => {
    const requestBody = {
      tokenId: tokenResponse,
      accountId: accountId,
    };
    const response = await updatePaymentMethodApi(requestBody);
    if (response?.data) {
      toast.success(
        addPayment
          ? "Payment method added successfully"
          : "Payment method updated successfully",
      );
      onSuccess?.();
      onCancel();
    } else {
      toast.error(response.message);
    }
  };

  return (
    <>
      <Script
        src="https://js.chargify.com/latest/chargify.js"
        strategy="afterInteractive"
        onLoad={init}
      />
      <div className="chargify-form-wrapper">
        <Title className="cf-payment-title" level={2}>
          {addPayment ? "Add Payment method" : "Update Payment Method"}
        </Title>
        {error && <div className="cf-error-message">{error}</div>}
        {!ready && <p className="text-gray-500">Loading…</p>}
        {ready && (
          <form ref={formRef} onSubmit={onSubmit} className="chargify-form">
            <div className="cf-form-item">
              <label>Card Number</label>
              <div id="card-number" className="cf-text-box" />
            </div>
            <Row gutter={[12, 16]}>
              <Col md={12} span={24}>
                <div className="cf-form-item">
                  <label>Month</label>
                  <div id="card-month" className="cf-text-box" />
                </div>
              </Col>
              <Col md={12} span={24}>
                <div className="cf-form-item">
                  <label>Year</label>
                  <div id="card-year" className="cf-text-box" />
                </div>
              </Col>
            </Row>
            <div className="cf-form-item">
              <label>CVV</label>
              <div id="card-cvv" className="cf-text-box" />
            </div>
            <Button
              htmlType="submit"
              disabled={!ready}
              block
              className="thm-btn"
              style={{ marginTop: "50px" }}
              loading={isLoading}
            >
              {addPayment ? "Add Payment Method" : "Update Payment Method"}
            </Button>
          </form>
        )}
      </div>
    </>
  );
}
