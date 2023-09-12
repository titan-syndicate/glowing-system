import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

if (!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET) {
  throw new Error("Missing GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET env var")
}

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
}
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }