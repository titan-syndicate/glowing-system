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