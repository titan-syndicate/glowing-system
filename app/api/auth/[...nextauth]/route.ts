import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

let authOptions;
if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
}

if ((!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET ) && process.env.NODE_ENV !== "development")
  throw new Error("Missing GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET env var")
}

let handler = () => ({});
if (authOptions) {
  handler = NextAuth(authOptions);
}

export { authOptions, handler as GET, handler as POST }