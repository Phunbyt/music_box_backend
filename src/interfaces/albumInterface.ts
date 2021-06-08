export interface AlbumInterface {
    title: string;
    id: string;
    artist: Record<any, string>
    cover: string;
    cover_small: string;
    cover_medium: string;
    cover_xl: string;
    genre_id: string;
    duration?: number;
    nb_tracks: number;
    tracklist: string;
    likes: string[];
    likeCount: number;
    listeningCount: number
}