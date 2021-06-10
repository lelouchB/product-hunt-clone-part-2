import Head from "next/head";
import Product from "../components/Product";
import Navbar from "../components/Navbar";
import { useUser } from "@auth0/nextjs-auth0";
import { getAllProducts } from "../lib/api";

export default function Home({ products }) {
  const { user, error, isLoading } = useUser();

  if (isLoading) {
    return (
      <div className="mx-auto my-64 text-gray-800 text-center text-3xl">
        Loading
      </div>
    );
  }

  return (
    <div className="contianer px-3">
      <Head>
        <title>Product Hunt Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <span className="mb-4"></span>
      {products.length>0 &&
        products.map((product) => (
          <Product
            key={product.id}
            id={product.id}
            name={product.Name}
            link={product.Link}
            publicId={product.PublicId}
            description={product.Description}
            check={user && product.Sub === user.sub ? true : false}
          />
        ))}
    </div>
  );
}

export async function getServerSideProps() {
  const products = await getAllProducts();
  return {
    props: { products },
  };
}