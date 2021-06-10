import React, { useState } from "react";
import Head from "next/head";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { getProductById } from "../../lib/api";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";

const UpdateProduct = ({ product }) => {
  const router = useRouter();

  const [name, setName] = useState(product.Name);
  const [link, setLink] = useState(product.Link);
  const [description, setDescription] = useState(product.Description);
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading</div>;
  if (error) return <div>{error.message}</div>;

  const handleSubmit = async (e) => {
    await e.preventDefault();
    const data = await fetch("/api/updateProduct", {
      method: "POST",
      body: JSON.stringify({ id: router.query.id, name, description, link }),
      headers: {
        "Content-Type": "application/json",
      }
    });
    await router.replace("/");
  };

  if (user) {
    return (
      <div>
        <Head>
          <title> Update Product : {product.Name} </title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navbar />
        <div className="md:grid  justify-items-center md:gap-6">
          <div className="mt-0  md:mt-0 md:col-span-2">
            <h3 className="text-4xl text-center font-normal leading-normal mt-0 text-indigo-800">
              Update Product: {product.Name}
            </h3>
            <form>
              <div className="shadow-md sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 sm:col-span-2">
                      <label
                        htmlFor="product_name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Name of the Product
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                          type="text"
                          name="product_name"
                          id="product_name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          autoComplete="given-name"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="product_description"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Description
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="product_description"
                        name="product_description"
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Brief description for your Product."
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 sm:col-span-2">
                      <label
                        htmlFor="product_link"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Link
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                          type="text"
                          name="product_link"
                          id="product_link"
                          value={link}
                          onChange={(e) => setLink(e.target.value)}
                          className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-md sm:text-sm border-gray-300"
                          placeholder="www.example.com"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-2 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Update
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
};

export default UpdateProduct;

export const getServerSideProps = withPageAuthRequired({
  returnTo: "/api/auth/login",
  async getServerSideProps(ctx) {
    const data = await getProductById(ctx.params.id);

    return {
      props: {
        product: data,
      },
    };
  },
});