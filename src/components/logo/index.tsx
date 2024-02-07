import LogoLight from "@/assets/logo/logo-light.svg?url";
import LogoDark from "@/assets/logo/logo-dark.svg?url";
import Image from "next/image";
import Link from "next/link";

export default function Logo({
  width,
  colorMode,
}: {
  width: number;
  colorMode: "light" | "dark";
}) {
  const logo = colorMode === "light" ? LogoLight : LogoDark;
  return (
    <Link href="/">
      <Image src={logo} alt="Meteor logo" width={width} priority/>
    </Link>
  );
}
