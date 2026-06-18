import { getBookById } from '@/lib/api/books';
import React from 'react';

const EbookDetailsPage = async({params}) => {
    const {id} = await params;
    const book = await getBookById(id);
    console.log(book);
    return (
        <div>
            <h2>Here is your Book Details Page..</h2>
        </div>
    );
};

export default EbookDetailsPage;