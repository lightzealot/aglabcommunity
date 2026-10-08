import { getSessionCookie } from "better-auth/cookies";
import { NextResponse, type NextRequest } from "next/server";

const PUBLIC = ["/login", "/registro", "/recuperar", "/restablecer", "/recursos"];
// La página de inicio ("/") la ve cualquiera; el propio componente decide si muestra feed o landing.

// Solo verifica que exista la cookie de sesión; la validación real
// (aprobado / admin) se hace en los layouts del servidor.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasSession = !!getSessionCookie(request);
  const isPublic = pathname === "/" || PUBLIC.some((p) => pathname === p || pathname.startsWith(p + "/"));

  if (!hasSession && !isPublic) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|icon.png|apple-icon.png|logo.png|sitemap.xml|robots.txt|cursos/covers/).*)"],
};
