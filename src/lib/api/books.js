import { serverFetch } from "../core/server";

export const getPublishedBooks = async () => {
    return serverFetch('/api/books');
}

export const getFeaturedBooks = async () =>{
    return serverFetch('/api/featured-books')
}

export const getBookById = async (id) =>{
    return serverFetch(`/api/books/${id}`);
}

