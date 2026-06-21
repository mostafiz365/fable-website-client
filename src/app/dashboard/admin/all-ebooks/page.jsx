import { getBooks } from '@/lib/api/books';
import React from 'react';

const AllEbooksPage = async() => {
    const books = await getBooks();
    return (
        <div>
            <h2>Here out All Ebooks : {books.length}</h2>
        </div>
    );
};

export default AllEbooksPage;