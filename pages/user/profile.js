// pages/user/profile.js
import Head from "next/head";
import { useUser, withPageAuthRequired, getSession } from "@auth0/nextjs-auth0";
import Product from "../../components/Product";
import Navbar from "../../components/Navbar";
import {getProductsByUserSub} from "../../lib/api"

export default function Profile({products}) {
  const { user, error, isLoading } = useUser();

  if (isLoading) {
    return (
      <div className="mx-auto my-64 text-gray-800 text-center text-3xl">
        Loading
      </div>
    );
  }
  if (error) return <div>{error.message}</div>;

  return (
    <div className="contianer px-2">
      <Head>
        <title> User: {user.name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className="flex space-x-4 px-4 my-10 justify-around">
        <div className="h-36 w-96 rounded-3xl  shadow-lg relative flex flex-col 
				items-center justify-between md:items-start p-5 transition-all duration-150">
          <img
            className="rounded-full w-20 h-20 shadow-sm absolute -top-8
						 transform md:scale-110 duration-700"
            src={user.picture}
            alt={user.name}
          />

          <div className=" align-middle text-2xl font-semibold text-gray-800 
							text-center m-auto md:m-0 md:mt-8">
            {user.name}
          </div>
          <ul className="text-lg text-gray-600 font-light md:block">
            <li>Products: {products ? products.length : 0}</li>
          </ul>
        </div>
      </div>

      {products.length>0 ? (
        products.map((product) => (
          <Product
            key={product.id}
            id={product.id}
            name={product.Name}
            link={product.Link}
            description={product.Description}
            publicId={product.PublicId}
            check={true}
          />
        ))
      ) : (
        <div className="mx-auto my-12 text-gray-800 text-center text-3xl">
          You are yet to create your first Product.
        </div>
      )}
    </div>
  );
}


export const getServerSideProps = withPageAuthRequired({
  returnTo: "/api/auth/login",
  async getServerSideProps(ctx) {
    const sub = await getSession(ctx.req).user.sub;
    const data = await getProductsByUserSub(sub);
    return {
      props: {
        products: data,
      },
    };
  },
});