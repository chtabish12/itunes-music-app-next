'use client';
import React from 'react';
import { useAppSelector } from '@/lib/redux/hooks';
import { selectSearchResults } from '@/lib/redux/searchSlice';
import ResultCard from './ResultCard';

const ResultsList = () => {
 const results = useAppSelector(selectSearchResults);
 return (
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
 {results.map((result: any) => (
 <ResultCard key={result.trackId || result.collectionId} result={result} />
 ))}
 </div>
 );
};

export default ResultsList;