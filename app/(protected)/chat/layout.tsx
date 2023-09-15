
import Head from 'next/head';

export default ChatLayout;

function ChatLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <div className="flex h-screen text-primary bg-primary">
      <Head>
        <title>Fistbump Chat</title>
      </Head>

      <div className="flex-none w-1/3 p-4 border-r border-primary">
      </div>

      <div className="flex-1">
        <h1 className="
          border-b
          border-primary
          font-bold
          px-4
          text-xl
          w-full
        ">Chat</h1>
        <div className="p-4" >
        {children}
        </div>
      </div>
    </div>);
}