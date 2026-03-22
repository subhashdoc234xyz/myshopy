"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Star } from 'lucide-react';
import Image from 'next/image';

interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
}

export default function Home() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch('/api/products');
                if (!res.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await res.json();
                if (data.error) {
                    throw new Error(data.error);
                }
                setProducts(data);
            } catch (err: any) {
                setError(err.message || 'Something went wrong while connecting to the database.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="w-full">
            {/* Hero Section */}
            <motion.section
                className="bg-purple-dark text-white py-24 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                {/* Abstract background shapes */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 bg-gradient-to-br from-purple-dark via-purple to-purple-light opacity-80" />

                <div className="max-w-3xl mx-auto items-center justify-center flex flex-col gap-6 relative z-10">
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="text-4xl md:text-6xl font-extrabold tracking-tight"
                    >
                        Elevate Your <span className="text-purple-200">Tech Lifestyle</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="text-lg md:text-xl text-purple-100 max-w-2xl"
                    >
                        Discover premium tech accessories designed to inspire and perform. Upgrade your everyday carry with MyShop.
                    </motion.p>
                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-6 px-8 py-3 bg-white text-purple-dark font-bold rounded-full shadow-lg hover:shadow-xl transition-all"
                        onClick={() => {
                            document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                    >
                        Shop Now
                    </motion.button>
                </div>
            </motion.section>

            {/* Product Grid */}
            <section id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">Featured Products</h2>
                        <div className="h-1.5 w-24 bg-purple mt-3 rounded-full"></div>
                    </div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="animate-pulse bg-white rounded-2xl p-4 h-[420px] shadow-sm border border-gray-100 flex flex-col gap-4">
                                <div className="bg-gray-200 h-56 w-full rounded-xl"></div>
                                <div className="bg-gray-200 h-6 w-3/4 rounded-md"></div>
                                <div className="bg-gray-200 h-4 w-full rounded-md mt-auto"></div>
                                <div className="bg-gray-200 h-4 w-5/6 rounded-md"></div>
                                <div className="bg-gray-200 h-12 w-full rounded-xl mt-4"></div>
                            </div>
                        ))}
                    </div>
                ) : error ? (
                    <div className="bg-red-50 border border-red-200 text-red-600 rounded-2xl p-8 text-center shadow-sm max-w-2xl mx-auto">
                        <h3 className="text-xl font-bold mb-3">Oops! Something went wrong.</h3>
                        <p className="mb-4">{error}</p>
                        <p className="text-sm font-medium">Please verify that you have configured your DATABASE_URL in the .env file and run `npm run db:seed`.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ y: -8 }}
                                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 group flex flex-col h-full"
                            >
                                <div className="relative h-64 w-full overflow-hidden bg-gray-100">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md p-2 rounded-full shadow-lg text-yellow-500 flex items-center gap-1 text-xs font-bold px-3">
                                        <Star className="w-3.5 h-3.5 fill-current" /> 4.9
                                    </div>
                                </div>

                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="font-bold text-xl text-gray-900 line-clamp-1 pr-2">{product.name}</h3>
                                        <span className="font-extrabold text-xl text-purple-dark">${product.price.toFixed(2)}</span>
                                    </div>
                                    <p className="text-gray-500 text-sm mb-6 line-clamp-2 flex-grow leading-relaxed">{product.description}</p>

                                    <motion.button
                                        whileTap={{ scale: 0.95 }}
                                        className="w-full py-3.5 bg-purple-50 text-purple-dark hover:bg-purple-dark hover:text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors duration-300 shadow-sm"
                                    >
                                        <ShoppingCart className="w-5 h-5" />
                                        Add to Cart
                                    </motion.button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}
