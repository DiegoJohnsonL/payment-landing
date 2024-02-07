"use client";

import {
  AbsoluteCenter,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  Icon,
  IconButton,
  Show,
  Spacer,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import Logo from "../logo";
import { Link } from "@chakra-ui/next-js";
import { logout } from "@/actions/auth";
import { ISidenavItem } from "@/types/sidenav-item";
import { useDashboardMenuItems } from "@/hooks/utils/use-menu-items";
import { useNavbar } from "@/app/_providers/navbar-selected";
import { useRouter } from "next/navigation";
import { IUserSession } from "@/types/user-session";

export default function NavbarComponent({ userSession }: { userSession: IUserSession | undefined }) {
  const { selectedItemId } = useNavbar();
  const sideNavbarDisclosure = useDisclosure();
  const router = useRouter();
  const dashboardMenuItems: ISidenavItem[] = useDashboardMenuItems();
  return (
    <nav>
      <Flex
        justify={"center"}
        boxShadow={"0px 12px 30px 0px rgba(0, 30, 87, 0.03)"}
      >
        <Flex
          w={"100%"}
          justify={"flex-start"}
          gap={"32px"}
          paddingX={{ base: "20px", md: "48px", lg: "108px" }}
          py={{ base: "24px", md: "32px" }}
          align={"center"}
        >
          <HStack gap="32px" h="100%">
            <Logo width={120} colorMode="light" />
          </HStack>
          <Show above="md">
            {userSession ? (
              <>
                <Box color="dark.100" h="100%">
                  <Link
                    as="a"
                    display="flex"
                    cursor="pointer"
                    href={"/dashboard"}
                    alignItems="center"
                    fontWeight={"400"}
                    fontSize={"sm"}
                    h="100%"
                    px="7px"
                  >
                    Dashboard
                  </Link>
                </Box>
                <Spacer />
                <HStack>
                  <Avatar
                    bg="#EFF3FF"
                    boxSize={"40px"}
                    src="https://bit.ly/ryan-florence"
                  />
                  <Text ms={"4px"} color={"black"} fontSize={"14px"}>
                    Ryan Florence
                  </Text>
                  {/* <ChevronDownIcon boxSize={"24px"} color={"primary.900"} /> */}
                </HStack>
              </>
            ) : (
              <>
                <Spacer />
                <Link href={"/login"}>
                  <Button fontSize={"12px"}>Get Started</Button>
                </Link>
              </>
            )}
          </Show>
          <Show below="md">
            <Spacer />
            <IconButton
              aria-label={"Open Menu"}
              onClick={sideNavbarDisclosure.onOpen}
              colorScheme={"white"}
              variant={"ghost"}
              icon={<HamburgerIcon boxSize={"24px"} />}
            />
          </Show>
        </Flex>
      </Flex>
      <Drawer
        size={{ base: "xs" }}
        placement={"left"}
        onClose={sideNavbarDisclosure.onClose}
        isOpen={sideNavbarDisclosure.isOpen}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton margin="17px" />
          <DrawerHeader margin="8px">
            <Logo width={100} colorMode="light" />
          </DrawerHeader>
          <DrawerBody>
            {userSession ? (
              <Accordion defaultIndex={[0]} allowToggle>
                <AccordionItem border={"none"}>
                  <h2>
                    <AccordionButton
                      p="0"
                      _hover={{ background: "transparent" }}
                      border={"none"}
                    >
                      <Text
                        as="span"
                        flex="1"
                        textAlign="left"
                        fontSize="14px"
                        py="18px"
                        color="dark.100"
                        textTransform="capitalize"
                      >
                        {"Dashboard"}
                      </Text>
                      <AccordionIcon color="dark.100" />
                    </AccordionButton>
                  </h2>

                  <AccordionPanel p={0}>
                    <Box
                      my="2px"
                      h="2px"
                      bg="linear-gradient(90deg, rgba(0,71,187,0) 0%, rgba(0,71,187,1) 50%, rgba(0,71,187,0) 100%)"
                    />
                    <Stack spacing="0" pt="3px">
                      {dashboardMenuItems.map((item) => (
                        <HStack
                          py="12px"
                          gap={"12px"}
                          cursor="pointer"
                          key={item.id + "-sidenav"}
                          onClick={() => {
                            if (item.id === "logout") {
                              logout();
                            } else {
                              router.push(`/dashboard?tab=${item.id}`);
                            }
                            sideNavbarDisclosure.onClose();
                          }}
                        >
                          <Icon
                            boxSize={"16px"}
                            as={item.icon}
                            color={
                              item.id === selectedItemId
                                ? "primary.500"
                                : "black"
                            }
                          />
                          <Text
                            fontSize={"14px"}
                            color={
                              item.id === selectedItemId
                                ? "primary.500"
                                : "black"
                            }
                          >
                            {item.label}
                          </Text>
                        </HStack>
                      ))}
                    </Stack>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            ) : (
              <Link href={"/login"} onClick={sideNavbarDisclosure.onClose}>
                <Button width={["auto", "136px"]} fontSize={"12px"}>
                  Get Started
                </Button>
              </Link>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </nav>
  );
}
  