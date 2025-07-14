declare global {
  interface Window {
    Razorpay: new (options: any) => any;
  }
}
import { useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
export const useSubscription = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { user } = useUser();
  const createOrderId = async () => {
    try {
      const response = await axios.post("/api/order", {
        amount: parseFloat("8512") * 100,
        currency: "INR",
      });

      if (response.status !== 200) {
        return { isOk: false };
      }

      return { orderId: response.data.orderId, isOk: true };
    } catch (error) {
      return { isOk: false };
    }
  };

  const processPayment = async () => {
    setIsProcessing(true);
    const order = await createOrderId();
    if (!order.isOk) {
      toast.error("Failed to create order, please try again");
      setIsProcessing(false);
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_TEST_KEY,
      amount: parseFloat("8512") * 100,
      currency: "INR",
      name: "name",
      description: "description",
      order_id: order.orderId,
      handler: async function (response: any) {
        const data = {
          orderCreationId: order.orderId,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        try {
          const result = await axios.post("/api/verify", { data });

          if (result.data.isOk) {
            toast.success("Payment successful!");
            try {
              const result = await axios.post("/api/subscribe");
              if (result.status === 200) {
                toast.success("You have been upgraded to premium");
              } else {
                toast.error("Failed to upgrade to premium, contact support");
              }
            } catch (error) {
              toast.error("Failed to upgrade to premium, contact support");
            }
          } else {
            toast.error(result.data.message || "Payment verification failed.");
          }
        } catch (err) {
          toast.error("Something went wrong. Please try again.");
        } finally {
          setIsProcessing(false);
        }
      },
      modal: {
        ondismiss: function () {
          toast.info("Payment Cancelled");
          setIsProcessing(false);
        },
      },
      prefill: {
        name: `${user?.fullName}`,
        email: `${user?.emailAddresses[0].emailAddress}`,
      },
      theme: {
        color: "#3399cc",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.on("payment.failed", function (response: any) {
      toast.error(response.error.description);
      setIsProcessing(false);
    });
    paymentObject.open();
  };

  return { processPayment, isProcessing };
};
