'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ShoppingCart, View } from 'lucide-react';
import { useEffect, useState } from 'react';


interface Product {
    id: number;
    name: string;
    short_desc: string;
    price: number;
    image: string;
    category: {
        id: number;
        name: string;
    };
}

const Products = () => {
    const router = useRouter();
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [categories, setCategories] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('https://admin.refabry.com/api/all/product/get')
            .then(response => {
                const data = response.data.data.data;
                setProducts(data);
                setFilteredProducts(data.slice(0, 4)); // initially show only 4
                const unique = [...new Set(data.map((p: Product) => p.category?.name))].filter(
                    (cat): cat is string => typeof cat === 'string'
                );
                setCategories(unique);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
                setLoading(false);
            });
    }, []);


    const handleProductClick = (product) => {
        // Save product data to localStorage
        localStorage.setItem('selectedProduct', JSON.stringify(product));
        // Navigate to the product details page
        router.push(`/products/${product.id}`);
    };
    

      
    const handleCategoryClick = (category: string) => {
        setSelectedCategory(category);
        const filtered = products.filter(p => p.category?.name === category);
        setFilteredProducts(filtered);
    };

    return (
        loading ? (
            <p>Loading products...</p>
        ) : (
            <div >
                <div className="flex gap-3 justify-center flex-wrap mb-10">
                    <button
                        onClick={() => {
                            setSelectedCategory(null);
                            setFilteredProducts(products.slice(0, 4));
                        }}
                        className={`border px-10 py-2 rounded-full text-background font-semibold ${selectedCategory === null ? 'bg-foreground text-theme' : 'bg-gray-100'}`}
                    >
                        ALL
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => handleCategoryClick(cat)}
                            className={`border px-10 py-2 rounded-full text-background font-semibold ${selectedCategory === cat ? 'bg-foreground text-theme' : 'bg-gray-100'}`}
                        >
                            {cat.toUpperCase()}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                        <div  onClick={() => handleProductClick(product)} key={product.id} className="cursor-pointer shadow-xl rounded-md overflow-hidden group hover:shadow-[#2e6cfe60]">
                            <div className="overflow-hidden h-[400px]">
                                <img
                                    src={`https://admin.refabry.com/storage/product/${product.image}`}
                                    alt={product.name}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                            </div>
                            <div className="px-5 py-8">
                                <h3 className="text-xl font-bold mb-3">{product.name}</h3>
                                <p className="mb-3">{product.short_desc.slice(0, 70)}...</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-theme font-semibold">৳ {product.price}</span>
                                    <span className="flex gap-3 items-center">
                                        <View
                                            className="w-4 h-4 cursor-pointer"
                                            onClick={() => handleProductClick(product)}
                                        />
                                        <ShoppingCart className="w-4 h-4" />
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {!selectedCategory && (
                    <div className="text-center mt-10">
                        <button
                            onClick={() => router.push('/products')}
                            className="bg-theme text-white px-10 py-3 rounded-md hover:opacity-90 transition"
                        >
                            See More
                        </button>
                    </div>
                )}
            </div>
        )
    );
};

export default Products;
