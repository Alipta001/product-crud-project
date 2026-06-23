"use client";

import { useEffect, useState } from "react";
import HomeNavbar from "@/components/layouts/homeNavbar";
import Hero from "@/components/home/hero";
import { AxiosInstance } from "@/api/axios/axios";
import { endPoints } from "@/api/endPoints/endPoints";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllProducts = async () => {
    try {
      const res = await AxiosInstance.get(
        endPoints.product.list
      );

      setProducts(res.data.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <HomeNavbar
        setProducts={setProducts}
        getAllProducts={getAllProducts}
      />

      <Hero
        products={products}
        loading={loading}
        getAllProducts={getAllProducts}
      />
    </>
  );
}