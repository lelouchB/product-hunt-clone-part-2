import React, {  useState } from "react";
import { useDropzone } from "react-dropzone";
import Head from "next/head";
import { useRouter } from "next/router";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Navbar from "../../components/Navbar";

export default withPageAuthRequired(function AddNewProduct() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [uploadImage, setUploadImage] = useState("");
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    multiple: false,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setUploadImage(reader.result);
      };
      reader.onerror = () => {
        console.error("Something has happend.");
      };

      setFile(URL.createObjectURL(file));
    },
  });

  const createProduct = async ({ name, description, link, uploadImage }) => {
    try {
      await fetch("/api/createProduct", {
        method: "POST",
        body: JSON.stringify({ name, description, link, uploadImage }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    await e.preventDefault();
    await setName("");
    await setDescription("");
    await setLink("");
    await setUploadImage("");
    await setFile("");
    await setLoading(true);
    await createProduct({ name, description, link, uploadImage });
    await router.push("/");
  };

  return (
    <div>
      <Head>
        <title> Add new Product</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className="md:grid  justify-items-center md:gap-6">
        <div className="mt-0  md:mt-0 md:col-span-2">
          <h3 className="text-4xl text-center font-normal leading-normal mt-0 text-indigo-800">
            Add New Product
          </h3>
          {loading ? (
            <div className="text-white px-6 py-4 my-8 border-0 rounded relative mb-4 bg-green-500">
              <span className="text-xl inline-block mr-5 align-middle">
                <i className="fas fa-bell" />
              </span>
              <span className="inline-block align-middle mr-8">
                <b className="capitalize">Uploading!</b> New Product is being
                added.
              </span>
              <button className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none">
                <span>×</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
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
                          required
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
                        required
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
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                          https://
                        </span>
                        <input
                          type="text"
                          name="product_link"
                          id="product_link"
                          value={link}
                          onChange={(e) => setLink(e.target.value)}
                          className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                          placeholder="www.example.com"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Cover photo
                    </label>
                    <div
                      {...getRootProps({ className: "dropzone" })}
                      className="mt-1 flex justify-center px-6 pt-4 pb-5 border-2 border-gray-300 border-dashed rounded-md"
                    >
                      <div className="space-y-1 text-center">
                        {file ? (
                          <aside className=" flex flex-row flex-wrap justify-center mt-2">
                            <span className="flex min-w-0  overflow-hidden">
                              <img
                                src={file}
                                className="block w-auto h-32 w-32"
                              />
                            </span>
                          </aside>
                        ) : (
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}

                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                          >
                            <span>Upload a file</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                              {...getInputProps()}
                              required
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 3MB
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-2 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Add New Product
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
});
