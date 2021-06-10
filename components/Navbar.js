import React from "react";
import { useUser } from "@auth0/nextjs-auth0";
import Link from "next/link";

export default function Navbar() {
  const { user} = useUser();
 
  return (
    <div className="relative bg-white">
      <div className="max-w-7xl mx-auto px-2 sm:px-3">
        <div className="flex flex-col md:flex-row justify-between items-center border-b-2 border-gray-100 py-6  md:space-x-10 ">
          <div className="flex  justify-start lg:w-0 lg:flex-1">
            <Link href="/">
              <a>
                <img
                  className="h-10 w-auto sm:h-12"
                  src="https://res.cloudinary.com/singhashutoshk/image/upload/v1622888633/product-hunt-clone/b2beawbhpjcy7kwnipo4.svg"
                  alt=""
                />
              </a>
            </Link>
            <Link href="/">
              <a>
                <h1 className="leading-normal text-3xl md:text-4xl font-serif tracking-tight font-bold ml-1 text-gray-800">
                  <span className="block text-purple-600 xl:inline">
                    Product Hunt Clone
                  </span>
                </h1>
              </a>
            </Link>
          </div>
          {user ? (
            <Link href="/products/insert">
              <a className="inline-flex font-medium text-gray-500 bg-transparent  text-indigo-500 font-semibold px-3 py-2 my-1 border border-indigo-500 rounded">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 hover:bg-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="#6366F1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Add Product
              </a>
            </Link>
          ) : null}

          {user ? (
            <div className=" flex items-center justify-end md:flex-1 lg:w-0">
              <Link href="/user/profile">
                <a className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
                  My Profile
                </a>
              </Link>

              <Link href="/api/auth/logout">
                <a className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-400 hover:bg-red-600">
                  Log Out
                </a>
              </Link>
            </div>
          ) : (
            <Link href="/api/auth/login">
              <a className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-purple-600 hover:bg-purple-700">
                Login
              </a>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}