import React from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";

export default function Vote({ votes, refreshVotes, productId }) {
  const router = useRouter();
  const { user, error, isLoading } = useUser();

  const voteOfThisUser = user && votes ? votes.filter(function(vote){
    return vote.Sub == user.sub;
  }) : null;

  const upvoteThisProduct = async (e) => {
    await e.preventDefault();
    if (!user) {
      router.push("/api/auth/login");
    } else {
      await fetch("/api/upvote", {
        method: "PUT",
        body: JSON.stringify({ id: productId }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      refreshVotes();
    }
  };


  const downvoteThisProduct = async (e) => {
    await e.preventDefault();
    await fetch("/api/downvote", {
      method: "PUT",
      body: JSON.stringify({ id: voteOfThisUser[0].id }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    refreshVotes();

  };
  if (!votes || isLoading || error) return <div>...</div>


  return (
    <div className="flex">
      {user && votes.some((elem) => elem.Sub === user.sub) ? (
        <button
          className="flex border shadow-sm border-purple-800 rounded-md p-1"
          onClick={downvoteThisProduct}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 20 20"
            fill="purple"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
              clipRule="evenodd"
            />
          </svg>
          <p className="text-purple-700">
            {  votes.length}
          </p>
        </button>
      ) : (
        <button
          className="flex border  border-gray p-1   shadow-sm  rounded-md"
          onClick={upvoteThisProduct}
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
              d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z"
            />
          </svg>
          <p className="text-gray-600">
            { votes.length}
            </p>
        </button>
      )}
    </div>
  );
}