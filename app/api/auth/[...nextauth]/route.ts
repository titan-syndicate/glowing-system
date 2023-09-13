import NextAuth, { AuthOptions, Account, Profile } from "next-auth"
import GithubProvider from "next-auth/providers/github"

let authOptions : AuthOptions | undefined = undefined;
if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
authOptions = {
  providers: [
    GithubProvider({
      authorization: {
        params: {
          scope: 'read:user read:org'
        }
      },
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ account, profile } : { account: Account | null, profile ?: Profile }) {
      if (!account || !profile) {
        return false
      }

      const orgsResponse = await fetch(`https://api.github.com/orgs/titan-syndicate/members/${profile.login}`, {
        headers: {
          Authorization: `token ${account.access_token}`,
        },
      });

      // check for 204 informs membership https://docs.github.com/en/free-pro-team@latest/rest/orgs/members?apiVersion=2022-11-28#check-organization-membership-for-a-user
      if (orgsResponse.status !== 204) {
        return false
      }

      return true;
    },
    async redirect({url, baseUrl} : { url: string, baseUrl: string} ) {
      // If the redirection is happening after a successful sign-in:
      if (url === baseUrl || url === `${baseUrl}/login`) {
        return `${baseUrl}/chat`;
      }
      return url;
    }
  }
}

if ((!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET ) && process.env.NODE_ENV !== "development")
  throw new Error("Missing GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET env var")
}

let handler = () => ({});
if (authOptions) {
  handler = NextAuth(authOptions);
}

export { authOptions, handler as GET, handler as POST }