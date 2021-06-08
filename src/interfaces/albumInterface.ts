export interface AlbumInterface {
    title: String;
    id: String;
    artist: Record<any, string>
    cover: String;
    cover_small: String;
    cover_medium: String;
    cover_xl: String;
    genre_id: String;
    duration?: Number;
    nb_tracks: Number;
    tracklist: String;
    likes: String[];
    likeCount: Number;
    listeningCount: Number
}