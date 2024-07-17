import { auth } from '@/auth';

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth;
  const AuthRoutes = ['/search_books'];
  const isAuthRoutes =
    AuthRoutes.includes(pathname) || pathname.endsWith('/memos');

  if (pathname !== '/' && !isLoggedIn) {
    if (isAuthRoutes) {
      const newUrl = new URL('/', req.nextUrl.origin);
      console.log(req);
      return Response.redirect(newUrl);
    }
  }
});
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|not-found|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
