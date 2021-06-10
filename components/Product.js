import React from "react";
import { Image, Transformation } from "cloudinary-react";
import { useUser } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import useSWR from "swr";
import Vote from "./Vote";

export default function Product({
  name,
  id,
  publicId,
  description,
  link,
  check,
}) {
  const router = useRouter();
  const { user, error, isLoading } = useUser();
  const { data, mutate } = useSWR(`/api/getVotesByProductId/${id}`);

  const deleteThisProduct = async (e) => {
    const votesId =
      data &&
      data.map((vote) => {
        return vote.id;
      });

    await fetch("/api/deleteProduct", {
      method: "DELETE",
      body: JSON.stringify({ id, publicId, votesId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    await router.reload();
  };
  return (
    <div className="max-w-md mx-auto my-4 bg-white rounded-xl shadow-xl overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <Image
            className="h-48 w-full object-cover md:w-48"
            publicId={publicId}
            cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
            alt={name}
            format="webp"
            secure
          >
            <Transformation width="800" gravity="auto" crop="fill" />
          </Image>
        </div>
        <div className="p-8 w-full">
          <div className="flex justify-between  items-start">
            <a
              href={link}
              className="block mt-1 text-xl font-semibold leading-tight font-medium  text-indigo-700 hover:underline"
            >
              {name}
            </a>
            <Vote votes={data} refreshVotes={mutate} productId={id} />
          </div>
          <p className="mt-2 text-gray-600 w-10/12">{description} </p>

          {check && (
            <div className=" flex justify-end">
              <button
                className="mx-1 h-6 w-6"
                onClick={() =>
                  router.push({
                    pathname: "/update/[id]",
                    query: {
                      id: id,
                    },
                  })
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="gray"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </button>
              <button onClick={deleteThisProduct} className="px-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="gray"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}