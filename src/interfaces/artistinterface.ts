export interface artist{
    artistName: string;
    artistId: string;
    artistLink: string;
    artistPicture: string;
    pictureSmall: string;
    pictureMedium: string;
    pictureBig: string;
    pictureXl: string;
    noOfAlbums: number;
    noOfFan: number;
    radio: boolean;
    trackList: string;
    type: string;
    liked: number[];
    listened: number[];
    likeCount: number;
    listeningCount: number;
}