"use client"

import { usePathname } from 'next/navigation'
import AdminSideBarItem from './adminSideBarItem';
import { useState } from 'react';
import { number } from 'zod';
const menuItem = [
    {title:'مدیریت کاربران', href:'/admin/manage-users'},
    {title:'مدیریت دستگاها', href:'/admin/manage-device'},
    {title:'متصل کردن کاربر به دستگاه', href:'/admin'},
]

const AdminSideBar = () => {
    
  const [activeItem, setActiveItem] = useState(2);

  const handleItemClick = (itemId: number) => {
    setActiveItem(itemId);
    console.log(itemId)
  };

    const sideBarItemClass = 'font-bold text-black scale-115 bg-gray-100 rounded-xl'

    return ( 
        <div className="h-full w-full">
            <div className='h-1/5 bg-black '></div>
            <ul className='flex flex-col justify-start gap-5 mt-4'>
                {menuItem.map((item,index) => (
                    <AdminSideBarItem key={index} className={activeItem === index ? sideBarItemClass : ''} title={item.title} href={item.href} onClick={() => handleItemClick(index)}/>
                ))}
                
                
            </ul>

        </div>
     );
}
 
export default AdminSideBar;