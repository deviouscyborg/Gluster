export interface Game1 {
    "title": string,
    "link": string,
    "publisherLink": string,
    "description": string,
    "thumb": string,
    "thumbBig": string,
    "teaser": string,
    "teaserBig": string,
    "image620": string,
    "portrait": boolean,
    "categories": string,
    "languages": string[],
    "online_since": string,
    "screenshots": string[]
}

export interface Game {
    "package_id": string,
    "name": string,
    "description": string,
    "thumb": string,
    "thumb_60": string,
    "thumb_120": string,
    "thumb_180": string,
    "link": string,
    "date": string,
    "aspect_ratio": number,
    "related": gameQuick[],
    "categories": string[],
    "orientation": string,
    "highscores_enabled": false
}

export interface gameQuick {
    "id": string,
    "name": string,
    "thumb": string
}
