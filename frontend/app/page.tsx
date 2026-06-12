import Image from "next/image";
import HomePage from "./(home)/home/page";
import Navbar from "@/components/layouts/homeNavbar";

export default function Home() {
  return (
    <div>
      <main>
       <HomePage />
      </main>
    </div>
  );
}
