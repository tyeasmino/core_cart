import AllProducts from "@/component/AllProducts";
import NavbarComponent from "@/component/NavbarComponent";
import Image from "next/image";

export default function Home() {
  return (
    <div>
        <NavbarComponent />
    
        <AllProducts />
    </div>
  );
}
