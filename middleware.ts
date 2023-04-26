/* eslint-disable consistent-return */
import { NextRequest, NextResponse } from 'next/server';
import { getUserBySession } from '@user/user-service';
import { findCurrentPage } from '@shared/application/router';
import { AUTH_COOKIE } from '@shared/application/config';



export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = request.cookies.get(AUTH_COOKIE);

  const redirect = (url: string) =>
    NextResponse.redirect(new URL(url, request.url));

  const currentPage = findCurrentPage(pathname);

  if (currentPage?.roles?.length) {
    try {
      if (!session?.value) {
        return redirect('/');
      }

      const user = await getUserBySession(session.value);
      const hasRole = currentPage.roles.some(role => role === user?.role);

      if (!user || !hasRole) {
        return redirect('/');
      }
    } catch (error) {
      return redirect('/');
    }
  }

  if (currentPage?.redirectIfIsAuthenticated && session?.value) {
    return redirect('/');
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next).*)',
    // Optional: only run on root (/) URL
    // '/'
  ],
};
