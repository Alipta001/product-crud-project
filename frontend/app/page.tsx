import Image from "next/image";
import HomePage from "./(home)/home/page";
import Navbar from "@/components/layouts/homeNavbar";
import ProtectedRoute from "@/components/protectedRoute";

export default function Home() {
  return (
    <div>
      <main>
        <ProtectedRoute>
          <HomePage />
        </ProtectedRoute>
      </main>
    </div>
  );
}
