import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const term = searchParams.get('term');
  const offset = parseInt(searchParams.get('offset') || '0', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);

  if (!term) {
    return NextResponse.json({ error: 'Missing search term' }, { status: 400 });
  }

  try {
    // iTunes API doesn't support offset natively; fetch offset+limit and slice
    const fetchLimit = offset + limit;
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&media=music&limit=${fetchLimit}`;

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
      },
    });

    if (!response.ok) {
      const text = await response.text();
      console.error(`iTunes API returned ${response.status}:`, text);
      throw new Error(`iTunes API error: ${response.status}`);
    }

    const data = await response.json();
    const results = (data.results || []).slice(offset, offset + limit);
    console.log(`Found ${results.length} results (offset=${offset}) for "${term}"`);
    return NextResponse.json({ results, resultCount: data.resultCount });
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error(`iTunes API error for term "${term}":`, errorMsg);
    return NextResponse.json({ error: 'Failed to fetch from iTunes API' }, { status: 500 });
  }
}
