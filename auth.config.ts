import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs";

import { LoginSchema } from "@/schemas"
import { getUserByEmail } from "@/data/user";

export default { 
    providers: [
        Credentials({
            async authorize(credentials) {
                const validatedFields = LoginSchema.safeParse(credentials);
                if (validatedFields.success) {
                    const { email, password } = validatedFields.data;

                    const user = await getUserByEmail(email);
                    if (!user || !user.password) return null;

                    const passwordMatch = await bcrypt.compare(password, user.password);
                    if (passwordMatch) return user;

                }
                return null;
            }
        })
    ],
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const pathname = nextUrl.pathname;

            if (pathname.startsWith('/dashboard-escuela')) {
                if (!isLoggedIn) return false;
                if (auth.user.role !== 'SCHOOL') {
                    return Response.redirect(new URL('/', nextUrl));
                }
                return true;
            }

            if (pathname === '/dashboard' && auth?.user?.role === 'SCHOOL') {
                return Response.redirect(new URL('/dashboard-escuela', nextUrl));
            }

            return true;
        },
    },
} satisfies NextAuthConfig