import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {

    const url = "https://davidwalsh.name/feed"
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        const xml = await response.text();
        return new NextResponse(
            xml,
            {
                headers: {
                    'Content-Type': 'application/xml', // Preserve RSS format
                    // Cache headers for efficiency
                    'Cache-Control': 'public, max-age=300, s-maxage=600', // 5-10 min
                }
            }
        )
    } catch (error) {
        return NextResponse.json({ error: error?.message }, { status: 500 });
    }
}