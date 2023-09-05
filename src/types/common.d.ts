export interface IUser {
    name?: string | null;
    email?: string | null;
    image?: string | null;
};

export interface IPost {
    id: string;
    content: string;
    published: boolean;
    createdAt: string;
    updatedAt: string;
    authorId: string;
    author: IUser;
};

export type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';
