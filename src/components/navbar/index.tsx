import { getUserSession } from "@/actions/auth";
import NavbarComponent from "./navbar-component";

export default async function Navbar(){
  const userSession = await getUserSession();
  return <NavbarComponent userSession={userSession}/>
}

