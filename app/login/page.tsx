"use client";
import React from 'react';
import { signIn } from 'next-auth/react';
import GithubIcon from './github-icon';

const LoginPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <div className="mb-4">
          {/* Replace below div with your SVG */}
          <div className="w-24 h-24 bg-gray-300 rounded-full">
            Fistbump SVG
          </div>
        </div>
        <h2 className="mb-4 text-2xl font-bold">Fistbump!</h2>
        <button
          className="flex items-center gap-4 px-4 py-2 font-semibold rounded hover:bg-gray-50 border-solid border-2 border-black"
          onClick={() => signIn('github')}>
          <GithubIcon />
          Login with GitHub
        </button>

      </div>
    </div>
  );
}

export default LoginPage;
