import { createContext } from 'react';

import { AuthStatus, IPost, IUser } from '@/types/common';

interface IPostContext {
    postList: IPost[] | undefined;
    setPostList: (postList: IPost[]) => void;
};

const PostContext = createContext<IPostContext>({
    postList: undefined,
    setPostList: () => {},
});

interface IUserContext {
    user: IUser | undefined;
    setUser: (user: IUser) => void;
};

const UserContext = createContext<IUserContext>({
    user: undefined,
    setUser: () => {},
});

interface IStatusContext {
    authStatus: AuthStatus;
    setAuthStatus: (authStatus: AuthStatus) => void;
}

const AuthStatusContext = createContext<IStatusContext>({
    authStatus: 'unauthenticated',
    setAuthStatus: () => {},
});

export { PostContext, UserContext, AuthStatusContext };