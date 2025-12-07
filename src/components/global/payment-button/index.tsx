import { Button } from "@/components/ui/button";
import React from "react";
import { Loader } from "../loader";
import { useSubscription } from "@/hooks/useSubscription";
import Script from "next/script";

type Props = {
  buttonName: string;
};

const PaymentButton = ({buttonName}: Props) => {
  const { processPayment, isProcessing } = useSubscription();
  return (
    <>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      <Button
        className="text-sm w-full disabled:cursor-not-allowed"
        onClick={processPayment}
        disabled={isProcessing}
      >
        <Loader color="#000" state={isProcessing}>
          {buttonName}
        </Loader>
      </Button>
    </>
  );
};

export default PaymentButton;
