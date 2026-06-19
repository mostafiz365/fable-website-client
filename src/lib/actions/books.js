'use server'

import { serverMutation } from "../core/server";

export const createBook = async (newBookData) => {
    return serverMutation('/api/books', newBookData);
}


// ১. বইয়ের ডাটা এডিট করার জন্য
export const updateEbookInfo = async (bookId, updatedData) => {
    return serverMutation(`/api/ebooks/${bookId}`, updatedData, "PATCH");
}

// ২. পাবলিশ/আনপাবলিশ স্ট্যাটাস আপডেট করার জন্য
export const updateEbookStatus = async (bookId, status) => {
    return serverMutation(`/api/ebooks/status/${bookId}`, { status }, "PATCH");
}

// ৩. বই সম্পূর্ণ মুছে ফেলার জন্য
export const deleteEbook = async (bookId) => {
    return serverMutation(`/api/ebooks/${bookId}`, {}, "DELETE"); // যদি serverMutation মেথড সাপোর্ট করে
}