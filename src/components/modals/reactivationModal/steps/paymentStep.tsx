"use client";

import ChargifyCheckout from "@/components/chargify/ChargifyCheckout";
import { CreditCard, Sparkles } from "lucide-react";

interface Props {
  subscriptionName?: string | null;
  productPrice?: number | null;
  activeCard: string | null;
  isLoading: boolean;
  setIsLoading: (v: boolean) => void;
  onReactivate: () => void;
  onPaymentAdded: () => void;
  onBack: () => void;
}

const PaymentStep = ({
  subscriptionName,
  productPrice,
  activeCard,
  isLoading,
  setIsLoading,
  onReactivate,
  onPaymentAdded,
  onBack,
}: Props) => (
  <div className="rm-step rm-step--payment">
    {(subscriptionName || productPrice != null) && (
      <div className="rm-payment-summary">
        {subscriptionName && (
          <div className="rm-payment-summary__label">
            <Sparkles className="w-4 h-4" />
            {subscriptionName}
          </div>
        )}
        {productPrice != null && (
          <div className="rm-payment-summary__price">
            ${productPrice.toFixed(2)}
            <span>/mo</span>
          </div>
        )}
      </div>
    )}

    {activeCard && (
      <div className="rm-saved-card">
        <CreditCard className="rm-saved-card__icon" />
        <span>
          Using card ending in <strong>••••{activeCard.slice(-4)}</strong>
        </span>
      </div>
    )}

    {activeCard ? (
      <div className="rm-payment-actions">
        <button
          className="rm-btn rm-btn--primary rm-btn--full"
          onClick={onReactivate}
          disabled={isLoading}
          type="button"
        >
          {isLoading ? "Processing…" : "Reactivate Subscription"}
        </button>
        <button
          className="rm-btn rm-btn--ghost rm-btn--sm"
          onClick={onBack}
          type="button"
        >
          ← Back
        </button>
      </div>
    ) : (
      <div className="rm-payment-actions">
        <ChargifyCheckout
          updatePayment={true}
          addPayment={true}
          onCancel={() => {}}
          onSuccess={onPaymentAdded}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
        <button
          className="rm-btn rm-btn--ghost rm-btn--sm rm-btn--auto"
          onClick={onBack}
          type="button"
        >
          ← Back
        </button>
      </div>
    )}
  </div>
);

export default PaymentStep;
