"use client"

import GetUserSession from '@/app/auth/getUserSession';
import {Button} from '@/components/ui/button'
import Link from 'next/link';
import AdminNvbar from './admin/adminNavber';
import { useEffect, useState } from 'react';

const MainPage = () => {

  const [role, setUserRole] = useState("");

  useEffect(() => {
    async function getUserRole() {
      const userSession = await GetUserSession();
      if (userSession.message) {
        return "unAuth";
      } else {
        const userRole = userSession.roles[0];
        if (userRole === "Admin") {
          return "Admin";
        } else {
          return "user";
        }
      }
    }

    async function fetchData() {
      const userRole = await getUserRole();
      setUserRole(userRole);
    }
    fetchData();
  }, []);

    return ( 
        <>
       {role === "unAuth" && <div className='h-screen w-full flex flex-col justify-center items-center'>
            <span className='font-bold text-black text-4xl'>برای استفاده از خدمات لطفا ابتدا وارد شوید</span>
            <Link href='/login'>
            <Button>ورود</Button>
            </Link>
        </div>}
        {
            role === 'user' && 
            <div className='h-screen w-full flex flex-col justify-center items-center'>
            <span className='font-bold text-black text-4xl'>کاربر گرامی خوش آمدید، برای مدیریت دستگاه ها میتوانید وارد </span>
            <Link href='/devices'>
            <Button>مدیریت دستگاه ها</Button>
            </Link>
        </div>
        }
         {
            role === 'Admin' && 
            <div className='h-screen w-full flex flex-col gap-10 justify-center items-center'>
            <span className='font-bold text-black text-3xl'>کاربر گرامی خوش آمدید، برای مدیریت دستگاه ها میتوانید وارد بخش مدیریت دستگاه ها شوید </span>
            <Link href='/devices'>
            <Button>مدیریت دستگاه ها</Button>
            </Link>
            <span className='font-bold text-black text-3xl'>و همچنین برای مدیریت کاربران و دستگاه ها میتوانید وارد بخش داشیورد ادمینی شوید</span>
            <Link href='/admin'>
            <Button>داشبورد ادمین</Button>
            </Link>
        </div>
        }
        </>
     );
}
 
export default MainPage;