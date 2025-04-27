'use client';
import Products from "./Products";


const AllProducts = () => {
    return (

        <div id="products" className="max-w-7xl mx-auto my-20">
            <h2 className="text-center text-5xl mb-10">Most Viewed Products</h2>

            <Products />
        </div>

    );
};

export default AllProducts;
