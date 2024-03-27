import Head from "next/head";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import { getSession } from "@auth0/nextjs-auth0";

function HomePage() {
  const { isLoading, error, user } = useUser();

  if (isLoading) return <div>Loading....</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div>
      <Head>
        <title>CHAT APP </title>
      </Head>
      <div className=" flex items-center justify-center min-h-screen w-full bg-[#343541] text-white text-center ">
        {!!user && (
          <Link href="/api/auth/logout">
            Logout
          </Link>
        )}
        {!user && (
          <div className=" flex gap-5">
            <Link href="/api/auth/login" className=" btn">
              Login
            </Link>
            <Link href="/api/auth/signup" className=" btn">
              Signup
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx.req, ctx.res);
  if (session && session.user) {
    return {
      redirect: {
        destination: "/chat"
      }
    };
  }
  return {
    props: {},
  };
}

