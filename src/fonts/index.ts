import localFont from 'next/font/local'

export const geomanist = localFont({
  src: [
    {
      path: "./Geomanist-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./Geomanist-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./Geomanist-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./Geomanist-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-geomanist",
});