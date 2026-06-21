import { serverFetch } from "../core/server";


export const getBooks = async() =>{
    return serverFetch('/api/all-books');
}

// এই ফাংশনটি কল করলেই এখন ব্যাকএন্ড থেকে শুধুমাত্র পাবলিশড বইগুলো চলে আসবে
export const getPublishedBooks = async () => {
    return serverFetch('/api/books');
}

export const getBookByUserId = async (userId) => {
    return serverFetch(`/api/my/books?userId=${userId}`);
}

export const getBookById = async (id) =>{
    return serverFetch(`/api/books/${id}`);
}

