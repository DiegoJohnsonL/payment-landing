"use client";

import { domainsConfig } from "@/config";
import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  List,
  ListItem,
  Stack,
  Text,
} from "@chakra-ui/react";
import Logo from "@/assets/footer/footer-logo.svg";
import Facebook from "@/assets/footer/facebook.svg";
import Insta from "@/assets/footer/instagram.svg";
import Tiktok from "@/assets/footer/tiktok.svg";
import Twitter from "@/assets/footer/twitter.svg";
import Youtube from "@/assets/footer/youtube.svg";
import Linkedin from "@/assets/footer/linkedin.svg";
import { useRouter } from "next/navigation";
import { Link } from "@chakra-ui/next-js";
import { useTranslate } from "@/hooks/utils/use-translate";

export default function Footer() {
  const router = useRouter();
  const { __ } = useTranslate();
  return (
    <footer>
      <Stack
        id="unique-footer"
        paddingX={{ base: "20px", md: "48px", lg: "108px" }}
        paddingTop="48px"
        mb="52px"
      >
        <Flex
          justifyContent="space-between"
          flexDirection={{ base: "column", md: "row" }}
        >
          <Stack flex="1" maxW="920">
            <Box>
              <Link href="/">
                <Box pb="24px">
                  <Logo />
                </Box>
              </Link>
            </Box>

            <Grid
              w="100%"
              templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }}
              gap={6}
            >
              {useFooterLinks().map((d, i) => (
                <Box key={i}>
                  <Heading
                    as="h3"
                    fontSize={{ base: "md", md: "lg" }}
                    fontWeight="500"
                  >
                    {d.name}
                  </Heading>
                  <List spacing="24px" pt="24px">
                    {d.items.map((item, index) => (
                      <ListItem key={index}>
                        {item.target === "_blank" ? (
                          <Link
                            href={item.link}
                            target={item.target}
                            rel="noopener noreferrer"
                          >
                            <Text
                              color="#000"
                              _hover={{ color: "primary.100" }}
                            >
                              {__(item.text)}
                            </Text>
                          </Link>
                        ) : (
                          <Link href={item.link}>
                            <Text
                              color="#000"
                              _hover={{ color: "primary.100" }}
                            >
                              {__(item.text)}
                            </Text>
                          </Link>
                        )}
                      </ListItem>
                    ))}
                  </List>
                </Box>
              ))}
            </Grid>
          </Stack>

          <Stack maxW="220" pt="57px">
            <Text fontSize="24px" fontWeight="500">
              Trade on the go with METEOR
            </Text>

            <Button onClick={() => router.push("/")}>Get Started Now!</Button>
          </Stack>
        </Flex>

        <Text fontSize="12px" mt="64px">
          Hey there! Just a heads up: this website is here to give you a sneak
          peek at all the cool products and services you can find on TheMeteor
          App. Also, keep in mind that where you are in the world might affect
          what{"'"}s available to you on the app. Due to various legal rules in
          different places, TheMeteor might not be able to offer certain
          products, features, or services in your region. Just something to be
          aware of!
        </Text>

        <Flex mt="12px" alignItems="end" gap="24px">
          <Text fontSize="lg" fontWeight="500">
            Comunity
          </Text>
          <Flex gap="8px">
            <Link href="https://www.facebook.com/themeteor.io">
              <Facebook />
            </Link>
            <Link href="https://www.instagram.com/themeteor.io/">
              <Insta />
            </Link>
            <Link href="https://www.tiktok.com/@themeteor.io">
              <Tiktok />
            </Link>
            <Link href="https://www.linkedin.com/company/themeteorcompany">
              <Linkedin />
            </Link>
            <Link href="https://x.com/themeteor_io">
              <Twitter />
            </Link>
            <Link href="https://www.youtube.com/@themeteor_io">
              <Youtube />
            </Link>
          </Flex>
        </Flex>
      </Stack>
    </footer>
  );
}

interface FooterLinkItem {
  text: string;
  link: string;
  target?: "_blank" | "_self";
}

interface FooterLinkCategory {
  name: string;
  items: FooterLinkItem[];
}

function useFooterLinks(): FooterLinkCategory[] {
  function getUrlPage(page: string) {
    return `${domainsConfig.urlMeteor}/${page}`;
  }

  return [
    {
      name: "More about METEOR",
      items: [
        { text: "Blog", link: getUrlPage("/blogs") },
        { text: "Events", link: getUrlPage("/events") },
        {
          text: "Whitepaper",
          link: getUrlPage(`/files/TheMeteor_Whitepaper_202312_01.pdf`),
          target: "_blank",
        },
        { text: "Terms and conditions", link: getUrlPage(`/terms-condition`) },
        { text: "Privacy policy", link: getUrlPage(`/policy`) },
        { text: "Disclosure", link: getUrlPage(`/legal/disclosure`) },
        // { text: "Contact us", link: "/contact-us" }
      ],
    },
    {
      name: "Products",
      items: [
        { text: "Exchange", link: getUrlPage(`/spot/BTC-USDT?type=spot`) },
        { text: "Nft", link: `/` },
        { text: "Launchpad", link: getUrlPage(`/launchpad`) },
        { text: "Cryptocurrencies", link: getUrlPage(`/market-overview`) },
      ],
    },
    {
      name: "Services",
      items: [
        {
          text: "Affiliate Program",
          link: getUrlPage(`/affiliate/affiliate-program`),
        },
        { text: "Fees Information", link: getUrlPage(`/fees`) },
        { text: "Wallet", link: getUrlPage(`/wallet/overview`) },
      ],
    },
    {
      name: "Support",
      items: [
        { text: "Help center", link: getUrlPage(`/help`) },
        { text: "Profile", link: getUrlPage(`/profile`) },
      ],
    },
  ];
}
