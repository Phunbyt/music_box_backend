export interface albumInterface {
    title: String;
    id: String;
    artist: {
        id: String;
        name: String;
    };
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