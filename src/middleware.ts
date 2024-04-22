
import { NextRequest, NextResponse } from "next/server";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
  adminRoutes,
} from "./route";
import { cookies } from 'next/headers'

import Cookies from 'js-cookie';
import GetUserSession from '@/app/auth/getUserSession'

async function getUserRole() {
    const userSession =await GetUserSession()
    if(userSession.message){
        return 'unAuth'
    }else {
        const userRole = userSession.roles[0];
        if(userRole === 'Admin') {
            return 'Admin'
        }else {
            return 'user'
        }
    }
  }

const authMiddleware = async (req:NextRequest, res:NextResponse,next : (err?: Error) => void) => {
    const userRole =await getUserRole()
    const cookieStore = cookies()
    const token = cookieStore.get('token')
    const expireDateUtc = cookieStore.get('expireDateUtc')
  let isLoggedIn = true
  if (!token ||!expireDateUtc) {
    isLoggedIn= false 
    console.log('middleware false')
    
  }else {
      const now = new Date().toISOString();
      const expireDateUtcValue = expireDateUtc?.value;
      if (expireDateUtc && now > expireDateUtcValue) {
    //     cookies().delete('token')
    // cookies().delete('expireDateUtc')
    req.cookies.delete('token')
    req.cookies.delete('expireDateUtc')
        isLoggedIn= false 
      }
  }




    const { nextUrl } = req;
    console.log(nextUrl.pathname)
const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoutes = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isAdminRoute = adminRoutes.includes(nextUrl.pathname);

  if(isAdminRoute) {
    console.log('role: ',userRole)
    if(userRole !== 'Admin') {
        return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null
  }

  if (isApiAuthRoute) {
    return null;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
        console.log('this middlewere execute')
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }

  if(!isLoggedIn && !isPublicRoutes) {
    return Response.redirect(new URL("/login", nextUrl));
  }
  console.log('middleware run2')

  return null

  
};

export default authMiddleware;


// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

