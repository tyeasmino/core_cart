import NavbarComponent from '@/component/NavbarComponent';
import Products from '@/component/Products';
import React from 'react';

const AllProductsPage = () => {
  return (
    <div>
      <NavbarComponent />

        <div className="max-w-7xl mx-auto py-20">
        <h2 className="text-center text-5xl mb-10">All Product Page</h2>
         
        <Products />
      </div>
    </div>
  );
};

export default AllProductsPage;
