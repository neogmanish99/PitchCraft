export interface StartupCardType {
    _id: string | number;
    _createdAt: string;
    views: number;
    author: {
        _id: string | number;
        name?: string;
        image?: string;
    };
    description: string;
    image: string;
    category: string;
    title: string;
}
