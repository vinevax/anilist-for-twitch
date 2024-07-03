export type MediaListEntry = {
    media: {
        id: number;
        title: {
            english: string;
            native: string;
            romaji: string;
        }
        episodes: number;
        coverImage: {
            large: string;
        }
        siteUrl: string;
    }
    progress: number;
}

export enum ListStatus {
    CURRENT = 'current',
    PLANNING = 'planning',
    COMPLETED = 'completed',
}

export type Language = "romaji" | "native" | "english";

export enum ListType {
    ANIME = "ANIME",
    MANGA = "MANGA",
}