import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const term = searchParams.get('term');
    const entity = searchParams.get('entity') || 'song';
    const limit = searchParams.get('limit') || '20';

    if (!term) {
        return NextResponse.json(
            {
                error: 'Missing search term'
            },
            { status: 400 }
        );
    }

    try {
        const response = await fetch(
            `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&entity=${entity}&limit=${limit}`
        );

        if (!response.ok) {
            throw new Error('iTunes API request failed');
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('iTunes API error:', error);
        return NextResponse.json(
            {
                error: 'Failed to fetch from iTunes API'
            },
            { status: 500 }
        );
    }
}