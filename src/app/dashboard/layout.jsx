// import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
// import React from 'react';

// const DashboardLayout = ({children}) => {
//     return (
//         <div className='flex min-h-screen'>
//             <DashboardSidebar></DashboardSidebar>
//             <div className=' flex-1'>{children}</div>
//         </div>
//     );
// };

// export default DashboardLayout;

import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import React from 'react';

const DashboardLayout = ({children}) => {
    return (
        // 🛠️ ফিক্স: মোবাইলে ওপর-নিচে (flex-col) এবং বড় স্ক্রিনে পাশাপাশি (lg:flex-row) বসবে
        <div className='flex flex-col lg:flex-row min-h-screen w-full'>
            <DashboardSidebar></DashboardSidebar>
            <div className='flex-1 w-full'>{children}</div>
        </div>
    );
};

export default DashboardLayout;