import type { Metadata } from 'next'
import {  Providers } from './providers'
import { Flex } from '@chakra-ui/react';
import { geomanist } from '@/styles/fonts';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Meteor Payment | The Meteor Ecosystem",
  description: "Facilitate payments and fund transfers via cryptocurrencies on any of your sales platforms.",
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={geomanist.className}>
        <Providers>
          <Navbar />
          <Flex
            as="main"
            minH="calc(100vh - 104px)"
            flexDirection={"column"}
          >
            {children}
          </Flex>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
