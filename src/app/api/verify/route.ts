import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
const generatedSignature = (
  razorpayOrderId: string,
  razorpayPaymentId: string
) => {
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keySecret) {
    throw new Error(
      "Razorpay Key Secret is not defined in environment variables."
    );
  }

  const signature = crypto
    .createHmac("sha256", keySecret)
    .update(razorpayOrderId + "|" + razorpayPaymentId)
    .digest("hex");
  return signature;
};

export async function POST(request: NextRequest) {
  const { orderCreationId, razorpayPaymentId, razorpaySignature } =
    await request.json();

  const signature = generatedSignature(orderCreationId, razorpayPaymentId);

  if (signature !== razorpaySignature) {
    return NextResponse.json(
      {
        message: "payment verification failed ",
        isOk: false,
      },
      {
        status: 400,
      }
    );
  }
  return NextResponse.json(
    { message: "payment verification successful", isOk: true },
    { status: 200 }
  );
}
