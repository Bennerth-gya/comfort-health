import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { SignJWT } from 'jose'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json()

    if (!password || password !== process.env.PHARMACIST_SECRET_KEY) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
    }

    const secret = new TextEncoder().encode(process.env.PHARMACIST_SECRET_KEY)
    const token = await new SignJWT({ role: 'pharmacist' })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('24h')
      .sign(secret)

    // Next.js 16: cookies() is async
    const cookieStore = await cookies()
    cookieStore.set('pharmacist_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Pharmacist login error:', error)
    return NextResponse.json({ error: 'Login failed' }, { status: 500 })
  }
}
