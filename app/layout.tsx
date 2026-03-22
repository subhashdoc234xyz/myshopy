import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ShoppingBag, Menu } from 'lucide-react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'MyShop | Premium Tech Accessories',
    description: 'Shop the best tech accessories with MyShop.',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={`${inter.className} bg-gray-50 text-gray-900 min-h-screen flex flex-col`}>
                <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-purple-light/30">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex items-center gap-2 cursor-pointer group">
                                <ShoppingBag className="w-8 h-8 text-purple-dark group-hover:text-purple transition-colors" />
                                <span className="font-bold text-xl tracking-tight text-purple-dark">myshop</span>
                            </div>
                            <div className="hidden md:flex items-center gap-8">
                                <a href="#" className="text-gray-600 hover:text-purple-dark transition-colors font-medium">Products</a>
                                <a href="#" className="text-gray-600 hover:text-purple-dark transition-colors font-medium">Categories</a>
                                <a href="#" className="text-gray-600 hover:text-purple-dark transition-colors font-medium">About</a>
                            </div>
                            <div className="md:hidden flex items-center">
                                <Menu className="w-6 h-6 text-gray-600" />
                            </div>
                        </div>
                    </div>
                </nav>

                <main className="flex-grow">
                    {children}
                </main>

                <footer className="bg-white border-t border-gray-200 mt-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center text-gray-500">
                        <p>&copy; {new Date().getFullYear()} MyShop. All rights reserved.</p>
                    </div>
                </footer>
            </body>
        </html>
    )
}
