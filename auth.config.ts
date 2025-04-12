// Removed incorrect import for NextAuthConfig
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  providers: [
    
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }: { auth: any; request: { nextUrl: URL } }) {
      const isLoggedIn = !!auth?.user
      const isOnDashboard = nextUrl.pathname.startsWith('/')
      if (isOnDashboard) {
        if (isLoggedIn)  return true
        return false 
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/ ', nextUrl))
        
      }
      return true
    },
  },
}
// satisfies NextAuthConfig