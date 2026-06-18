import { serverFetch } from "../core/server";


export const getBooks = async() =>{
    return serverFetch('/api/books');
}

export const getBookByUserId = async (userId) => {
    return serverFetch(`/api/my/books?userId=${userId}`);
}

export const getBookById = async (id) =>{
    return serverFetch(`/api/books/${id}`);
}

