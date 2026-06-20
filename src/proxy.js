import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { auth } from './app/lib/auth'

export async function proxy(request) {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    const pathname = request.nextUrl.pathname
    if (pathname.startsWith('/dashboard')) {
        const roleDashboardPath = `/dashboard/${session.user.role}`
        // allow the exact role dashboard or any sub-path under it
        if (!(pathname === roleDashboardPath || pathname.startsWith(roleDashboardPath + '/'))) {
            return NextResponse.redirect(new URL(roleDashboardPath, request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/dashboard/:path*'],
}