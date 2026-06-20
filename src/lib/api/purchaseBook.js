import { serverFetch } from "../core/server";

export const getAllPurchasedBooks = async () => {
    return serverFetch('/api/purchase');
}

// 🔥 ২. writerId দিয়ে পারচেজ বুক গেট করার অ্যাকশন
export const getPurchasedBooksByWriter = async (writerId) => {
    return serverFetch(`/api/purchase/writer/${writerId}`);
}

// 🔥 ৩. userId দিয়ে পারচেজ বুক গেট করার অ্যাকশন
export const getPurchasedBooksByUser = async (userId) => {
    return serverFetch(`/api/purchase/user/${userId}`);
}