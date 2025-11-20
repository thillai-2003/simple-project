import Image from "next/image";
import SignUpPage from "./(auth)/signup/page";
import { redirect } from "next/navigation";

export default function Home() {
  return (
    redirect("/signup")
  );
}
