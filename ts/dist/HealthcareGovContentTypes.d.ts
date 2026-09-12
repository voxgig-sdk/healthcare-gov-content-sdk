export interface ContentCollection {
    glossary?: any[];
}
export interface ContentCollectionLoadMatch {
    content_type: string;
    callback?: string;
}
export interface Index {
    bite?: string;
    categories?: any[];
    esbite?: string;
    estitle?: string;
    state?: any[];
    tags?: any[];
    title?: string;
    topics?: any[];
    url?: string;
}
export interface IndexListMatch {
    callback?: string;
}
export interface PostTitle {
    author?: string;
    categories?: any[];
    content?: string;
    date?: string;
    lang?: string;
    layout?: string;
    order?: number;
    tags?: any[];
    title?: string;
    topics?: any[];
    url?: string;
}
export interface PostTitleListMatch {
    post_title: string;
    callback?: string;
}
