import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const term = searchParams.get('term');

    if (!term) {
        return NextResponse.json(
            { error: 'Missing search term' },
            { status: 400 }
        );
    }

    try {
        const response = await fetch(
            `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&entity=song,album,artist&limit=20`
        );

        if (!response.ok) {
            throw new Error('iTunes API request failed');
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error(`iTunes API error for term "${term}":`, error instanceof Error ? error.message : error);
        return NextResponse.json(
            { error: 'Failed to fetch from iTunes API' },
            { status: 500 }
        );
    }
}
