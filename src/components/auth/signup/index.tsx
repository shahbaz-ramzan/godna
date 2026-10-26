"use client";
import { SignupSteps } from "@/constants";
import { STORAGE_KEYS } from "@/constants/localStorageKeys";
import { Routes } from "@/constants/routes";
import { getPasswordStrength, getStrengthColor } from "@/lib/utils";
import {
  getChargifyProductsDetailsApi,
  goDnaSignUpApi,
} from "@/network/apis/subscription";
import { setLocalStorageItem } from "@/utils/localStorage";
import { Button, Card, Form, Typography } from "antd";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import goDNaLogo from "../../../assets/images/logo.png";
import PasswordStep from "./passwordStep";
import UserDetailsStep from "./userDetailsStep";

const { Title } = Typography;

interface SignupProps {
  chargifyProductsDetails: any;
}

const Signup = ({ chargifyProductsDetails }: SignupProps) => {
  const [step, setStep] = useState<SignupSteps>(SignupSteps.DETAILS);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [form] = Form.useForm();
  const passwordValue = Form.useWatch("password", form);
  const strength = getPasswordStrength(passwordValue);
  const strengthPercent = strength.percent;
  const strengthColor = getStrengthColor(strength.label);
  const passwordChecks = strength.checks;

  const [chargifyProductsDetailsState, setChargifyProductsDetailsState] =
    useState<any>(chargifyProductsDetails);

  const getChargifyProductsDetails = async () => {
    try {
      const response = await getChargifyProductsDetailsApi();
      setChargifyProductsDetailsState(response?.data ?? null);
    } catch (error) {
      console.error("Failed to fetch Chargify products:", error);
    }
  };

  useEffect(() => {
    console.log("chargifyProductsDetails", chargifyProductsDetails);
    if (!chargifyProductsDetails) {
      getChargifyProductsDetails();
    }
  }, [chargifyProductsDetails]);

  const handleCreateAccount = async () => {
    try {
      setIsLoading(true);
      const values = form.getFieldsValue(true);
      const {
        email,
        firstName,
        lastName,
        company = "",
        phoneNumber = "",
        password,
        confirmPassword,
      } = values;
      const response = await goDnaSignUpApi({
        email,
        firstName,
        lastName,
        company,
        phone: phoneNumber,
        productHandle: process.env.NEXT_PUBLIC_PRODUCT_HANDLE,
        password,
        confirmedPassword: confirmPassword,
      });
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
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUserDetailsStepFinish = async () => {
    try {
      await form.validateFields(["firstName", "lastName", "email", "terms"]);
      setStep(SignupSteps.PASSWORD);
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  return (
    <div className="auth-wrapper">
      <Card className="thm-card auth-card signup-card">
        <div className="auth-card-header">
          <div className="auth-logo-wrapper">
            <Image src={goDNaLogo} alt="GoDNA Logo" width={160} height={48} />
          </div>
          <Title level={2}>
            {step === SignupSteps.DETAILS
              ? "Create your account"
              : "Secure your account"}
          </Title>
          <p>
            {step === SignupSteps.DETAILS
              ? `Start your ${chargifyProductsDetailsState?.[0]?.trialInterval}-${chargifyProductsDetailsState?.[0]?.trialIntervalUnit} free trial`
              : "Set a strong password to protect your account."}
          </p>
        </div>

        <Form
          form={form}
          layout="vertical"
          className="thm-form auth-form"
          requiredMark={false}
          onFinish={handleCreateAccount}
        >
          {step === SignupSteps.PASSWORD && (
            <Button
              type="link"
              className="back-btn"
              onClick={() => setStep(SignupSteps.DETAILS)}
              icon={<ArrowLeft className="w-4 h-4" />}
            >
              Back
            </Button>
          )}

          {step === SignupSteps.DETAILS && (
            <UserDetailsStep onFinish={handleUserDetailsStepFinish} />
          )}

          {step === SignupSteps.PASSWORD && (
            <PasswordStep
              passwordValue={passwordValue}
              strength={strength}
              strengthPercent={strengthPercent}
              strengthColor={strengthColor}
              passwordChecks={passwordChecks}
              isLoading={isLoading}
            />
          )}
        </Form>
      </Card>
    </div>
  );
};

export default Signup;
