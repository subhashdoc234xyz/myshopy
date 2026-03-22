import { NextResponse } from 'next/server';
// CRITICAL: Use relative import for Prisma client to avoid alias resolution errors in API routes
import { prisma } from '../../../lib/prisma';

export async function GET() {
    try {
        const products = await prisma.product.findMany({
            orderBy: {
                createdAt: 'asc'
            }
        });

        return NextResponse.json(products);
    } catch (error) {
        console.error("Database connection error:", error);
        return NextResponse.json(
            { error: "Failed to fetch products. Please ensure the database string is correct and DB is reachable." },
            { status: 500 }
        );
    }
}
