import { NextResponse } from 'next/server'

export const config = {
    matcher: ['/sistema/:path*', '/alumnos/:path*'],
}

export const middleware = async (request) => {
    const user = request.cookies.get('user')

    if (!user || !user.value) {
        return NextResponse.redirect(new URL('/sesion', request.url))
    }
}
