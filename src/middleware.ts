// request를 intercept해서 authentication을 check한다.

import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// createRouteMatcher를 사용하여 경로가 /settings 하위 경로와 일치하는지 확인하는 함수 isProtectedRoute를 생성
const isProtectedRoute = createRouteMatcher(['/settings(.*)']);

export default clerkMiddleware((auth, req) => {
  // 인증되지 않은 사용자는 로그인 페이지로 리다이렉트되거나 401 에러가 발생
  if (isProtectedRoute(req)) auth().protect();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
