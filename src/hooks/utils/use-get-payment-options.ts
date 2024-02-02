import IzipayImage from "@/assets/checkout/izipay.png";
import MetamaskImage from "@/assets/checkout/metamask.png";
import CreditCardIcon from "@/assets/checkout/credit-card.svg";
import WalletIcon from "@/assets/checkout/wallet.svg";

export type PaymentOption = {
  id: number;
  name: string;
  description: string;
  image: string;
  icon: string;
  disabled?: boolean;
};

export const usePaymentOptions = () => [
  {
    id: 0,
    name: "Credit Card",
    description: "Pay with Izipay",
    image: IzipayImage.src,
    icon: CreditCardIcon,
  },
  {
    id: 1,
    name: "Coming Soon",
    description: "Pay with paypal, google pay, crypto and more",
    image: MetamaskImage.src,
    icon: WalletIcon,
    disabled: true,
  },
];
