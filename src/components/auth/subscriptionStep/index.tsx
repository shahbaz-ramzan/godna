"use client";
import ChargifyCheckout from "@/components/chargify/ChargifyCheckout";
import FullScreenLoader from "@/components/common/loader";
import { Card, Divider, Typography } from "antd";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import goDNaLogo from "../../../assets/images/logo.png";

const { Title } = Typography;

interface SubscriptionStepProps {
  onBack?: () => void;
  formValues?: any;
  chargifyProductsDetailsState: any;
}

export default function SubscriptionStep({
  onBack,
  formValues,
  chargifyProductsDetailsState,
}: Readonly<SubscriptionStepProps>) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="auth-wrapper">
      {isLoading && <FullScreenLoader />}
      <Card className="thm-card auth-card subscription-card">
        <div className="auth-card-header">
          <div className="auth-logo-wrapper">
            <Image src={goDNaLogo} alt="GoDNA Logo" width={160} height={48} />
          </div>
          <Title level={2}>Complete your subscription</Title>
          <p>
            Start your {chargifyProductsDetailsState[0]?.trialInterval}-
            {chargifyProductsDetailsState[0]?.trialIntervalUnit} free trial
          </p>
        </div>
        <div className="sc-row">
          <div className="left-content">
            <h3 className="summary-title">Trial Summary</h3>
            <div className="summary-box-wrap">
              <div className="sb-item">
                <h4>Plan</h4>
                <span>{chargifyProductsDetailsState[0]?.name}</span>
              </div>
              <div className="sb-item">
                <h4>Trial period</h4>
                <span>
                  {chargifyProductsDetailsState[0]?.trialInterval}-
                  {chargifyProductsDetailsState[0]?.trialIntervalUnit}
                </span>
              </div>
              <Divider className="sb-divider" />
              <div className="sb-item">
                <Title level={4}>Monthly after trial</Title>
                <span className="text-xl">
                  ${chargifyProductsDetailsState[0]?.priceInCents / 100}/ month
                </span>
              </div>
            </div>
            <div className="sc-listing-wrapper">
              <p className="imp-text">Important</p>
              <ul>
                <li>
                  You won't be charged during the{" "}
                  {chargifyProductsDetailsState[0]?.trialInterval}-
                  {chargifyProductsDetailsState[0]?.trialIntervalUnit} trial
                </li>
                <li>Auto-renewal begins after trial ends</li>
                <li>Cancel anytime with no penalties</li>
                <li>30-day money-back guarantee</li>
              </ul>
            </div>
          </div>
          <div className="right-content">
            <ChargifyCheckout
              formValues={formValues}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          </div>
        </div>
        <div className="sc-bottom-link">
          <button onClick={onBack} className="back-btn">
            <ArrowLeft /> Back
          </button>
        </div>
      </Card>
    </div>
  );
}
