"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react';

const LoginPage: React.FC = () => {
  return (
    <div>
      <button onClick={() => signIn('github')}>Sign in with GitHub</button>
    </div>
  );
}

export default LoginPage;
