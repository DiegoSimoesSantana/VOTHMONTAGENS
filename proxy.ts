import { NextRequest, NextResponse } from "next/server";

const ACCESS_COOKIE = "voth_maintenance_access";
const PUBLIC_FILE = /\.(.*)$/;

export function proxy(request: NextRequest) {
  const maintenanceEnabled = (process.env.MAINTENANCE_MODE ?? "").trim() === "true";

  if (!maintenanceEnabled) {
    return NextResponse.next();
  }

  const { pathname, search } = request.nextUrl;

  const isAllowedPath =
    pathname === "/maintenance" ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/icon") ||
    pathname.startsWith("/apple-icon") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/img") ||
    PUBLIC_FILE.test(pathname);

  if (isAllowedPath) {
    return NextResponse.next();
  }

  const expectedPassword = (process.env.MAINTENANCE_PASSWORD ?? "voth@123").trim();
  const hasAccess = request.cookies.get(ACCESS_COOKIE)?.value === expectedPassword;

  if (hasAccess) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = "/maintenance";
  url.searchParams.set("next", `${pathname}${search}`);

  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
