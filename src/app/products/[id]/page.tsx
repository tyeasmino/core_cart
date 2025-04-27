

'use client';

import { useEffect, useState } from 'react';
import NavbarComponent from '@/component/NavbarComponent';

interface Product {
  image: string;
  name: string;
  category: {
    name: string;
  };
  short_desc: string;
  price: number;
}


const ProductDetails = () => {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    // Get product data from localStorage
    const storedProduct = localStorage.getItem('selectedProduct');
    if (storedProduct) {
      setProduct(JSON.parse(storedProduct));
    }
  }, []);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <NavbarComponent />

      <div className="max-w-6xl mx-auto my-20 flex flex-col md:flex-row items-start justify-between gap-20">
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={`https://admin.refabry.com/storage/product/${product.image}`}
            alt={product.name}
            className="w-full md:w-[500px] h-[400px] object-cover rounded-lg mb-10"
          />
        </div>

        <div className="md:w-1/2">
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-2">Category: {product.category?.name}</p>
          <p className="text-lg mb-4 text-justify">{product.short_desc}</p>
          <p className="text-theme text-xl font-semibold mb-2">Price: ৳ {product.price}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
