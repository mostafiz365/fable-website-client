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


// ================= ADMIN EXCLUSIVE CLIENT SIDE APIS =================

// ১. অ্যাডমিন কর্তৃক বইয়ের লাইভ স্ট্যাটাস (published / unpublished) টগল করার ক্লায়েন্ট API
export const adminUpdateEbookStatus = async (bookId, status, adminEmail) => {
    return serverMutation(
        `/api/admin/ebooks/status/${bookId}`, 
        { status, adminEmail }, // বডিতে স্ট্যাটাস এবং অ্যাডমিন ইমেইল পাঠানো হলো
        "PATCH"
    );
}

// ২. অ্যাডমিন কর্তৃক যেকোনো বই সম্পূর্ণ মুছে ফেলার ক্লায়েন্ট API
export const adminDeleteEbook = async (bookId, adminEmail) => {
    return serverMutation(
        `/api/admin/ebooks/${bookId}?email=${adminEmail}`, // URL-এ কুয়েরি প্যারামিটার হিসেবে ইমেইল পাঠানো হলো
        {}, 
        "DELETE"
    );
}