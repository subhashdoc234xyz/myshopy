import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    await prisma.product.deleteMany()

    const products = [
        {
            name: "Wireless ANC Headphones",
            price: 299.99,
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop",
            description: "Premium over-ear noise cancelling headphones with 30-hour battery life."
        },
        {
            name: "Minimalist Smartwatch",
            price: 199.50,
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop",
            description: "Sleek smartwatch with heart rate monitoring, GPS, and custom watch faces."
        },
        {
            name: "Mechanical Keyboard",
            price: 149.00,
            image: "https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=1000&auto=format&fit=crop",
            description: "Tenkeyless mechanical keyboard with tactile switches and RGB backlighting."
        },
        {
            name: "Ergonomic Mouse",
            price: 89.99,
            image: "https://images.unsplash.com/photo-1527814050087-179f8c920f01?q=80&w=1000&auto=format&fit=crop",
            description: "Wireless ergonomic mouse designed for all-day comfort and precision."
        },
        {
            name: "USB-C Hub",
            price: 45.00,
            image: "https://images.unsplash.com/photo-1616422285623-13ff0162193c?q=80&w=1000&auto=format&fit=crop",
            description: "7-in-1 USB-C hub with HDMI, SD card reader, and power delivery."
        },
        {
            name: "Desk Mat",
            price: 29.99,
            image: "https://images.unsplash.com/photo-1605814545939-f9ba321550c8?q=80&w=1000&auto=format&fit=crop",
            description: "Large premium vegan leather desk mat for a clean setup."
        }
    ]

    for (const product of products) {
        await prisma.product.create({
            data: product
        })
    }

    console.log("Database seeded successfully with 6 products.")
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
