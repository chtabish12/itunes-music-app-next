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
        // iTunes API doesn't use 'entity' parameter, use 'media' instead
        const url = `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&media=music&limit=20`;
        
        console.log('Fetching from iTunes API:', url);
        
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0'
            }
        });

        if (!response.ok) {
            const text = await response.text();
            console.error(`iTunes API returned ${response.status}:`, text);
            throw new Error(`iTunes API error: ${response.status}`);
        }

        const data = await response.json();
        console.log(`Found ${data.results?.length || 0} results for "${term}"`);
        return NextResponse.json(data);
        
    } catch (error) {
        const errorMsg = error instanceof Error ? error.message : String(error);
        console.error(`iTunes API error for term "${term}":`, errorMsg);
        return NextResponse.json(
            { error: 'Failed to fetch from iTunes API' },
            { status: 500 }
        );
    }
}