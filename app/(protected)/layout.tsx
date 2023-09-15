"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { SessionProvider } from "next-auth/react";

function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // don't enforce login in dev mode unless FORCE_PROTECTED is set to true
    if (process.env.NODE_ENV === "development" && process.env.NEXT_PUBLIC_FORCE_PROTECTED !== "true") {
      console.log('Auth skipped for local dev. To run with auth locally sync-secrets then npm run dev-protected');
      return;
    }

    if (status === "unauthenticated") {
      router.push('/login');
    }
  }, [status, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }
  return (
    <>{children}</>
  )
}

export default function ProtectedLayout({ children, pageProps }) {
  return (
    <SessionProvider session={pageProps?.session}>
      <Layout {...pageProps} >
        {children}
      </Layout>
    </SessionProvider>
  );
}