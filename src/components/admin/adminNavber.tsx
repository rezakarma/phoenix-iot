"use client";

import ClearToken from "@/app/auth/clearToken";
import GetUserSession from "@/app/auth/getUserSession";
import isLogin from "@/app/auth/isLogin";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from 'next/navigation';
const AdminNvbar = () => {
  const [role, setUserRole] = useState("");
  const [login, setLoggin] = useState(false);
  const router = useRouter()
  const currentPath = usePathname();
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

  const logOut = () => {
    const tokenCleared = ClearToken()
    if(tokenCleared) {
        console.log('token pak shod')
        router.push('/login')
    }else {
        console.log('token pak nashod')

    }
  }

  return (
    <div className="w-full h-12 flex flex-row gap-2 m-2 justify-between">
      {role === "Admin" && (
        <div>
          <Link href="/admin">
            <Button variant={currentPath === '/admin' ? 'default': 'ghost'}>داشبورد ادمین</Button>
          </Link>

          <Link href="/devices">
            <Button variant={currentPath === '/devices' ? 'default': 'ghost'}>مدیریت دستگاها</Button>
          </Link>
        </div>
      )}
      {role === "user" && (
        <div className="w-full h-12 flex gap-2 m-2">
          <Link href="/devices">
            <Button variant={currentPath === '/devices' ? 'default': 'ghost'}>مدیریت دستگاها</Button>
          </Link>
        </div>
      )}
      {role === "unAuth" && (
        <Link href="/login">
          <Button variant={currentPath === '/login' ? 'default': 'ghost'}>ورود</Button>
        </Link>
      )}

      {role !== "unAuth" && (
     
          <Button className="" onClick={logOut}>خروج</Button>
      )}
    </div>
  );
};
export default AdminNvbar;
