// TypeScript interfaces for music app

export interface Artist {
    id: string;
    name: string;
    genre: string;
}

export interface Album {
    id: string;
    title: string;
    artistId: string;
    releaseDate: string;
}

export interface Song {
    id: string;
    title: string;
    albumId: string;
    duration: number; // duration in seconds
}

export interface SearchState {
    query: string;
    results: (Artist | Album | Song)[];
    isLoading: boolean;
    error?: string;
}