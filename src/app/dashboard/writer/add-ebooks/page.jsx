import React from 'react';
import AddEbookForm from './AddEbookForm';
import { getUserSession } from '@/lib/core/session';

const AddEbookHomePage = async() => {
    const user = await getUserSession();
    return (
        <div>
            <AddEbookForm user={user}></AddEbookForm>
        </div>
    );
};

export default AddEbookHomePage;