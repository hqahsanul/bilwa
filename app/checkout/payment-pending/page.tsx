import type { Metadata } from "next";
import CheckoutPaymentPendingRoute from "@/routes/checkout-payment-pending";

export const metadata: Metadata = {
  title: "Payment not confirmed yet | Sri Bilva Jewels",
  description:
    "Your bag is saved while we verify your payment status with your payment provider.",
};

export default CheckoutPaymentPendingRoute;
