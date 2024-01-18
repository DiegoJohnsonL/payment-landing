"use client";

import { useColorModeValue } from "@chakra-ui/react";
import LogoLight from "./assets/logo-light.svg?url";
import LogoDark from "./assets/logo-dark.svg?url";
import { Link } from "@chakra-ui/next-js";
import Image from "next/image";

export default function Logo({
  height,
  width,
  colorMode,
}: {
  height: number;
  width: number;
  colorMode: "light" | "dark";
}) {
  const logo = colorMode === "light" ? LogoLight : LogoDark;
  return (
    <Link href="/">
      <Image src={logo} alt="Meteor logo" height={height} width={width} />
    </Link>
  );
}
