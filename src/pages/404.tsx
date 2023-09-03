import React from "react";
import Header from "@comp/Meta/Title";
import Link from "next/link";

export default function FourOFour() {
  return (
    <>
      <Header
        title={`404`}
        contents={`404 - Page not found`}
        link={`${process.env.PUBLIC_URL}`}
        image={`${process.env.PUBLIC_URL}/Logo.svg`}
      />
      <div className="max-w-7xl mx-auto pt-10 pb-10 px-4 sm:px-6 lg:px-8">
        <div className="404Div transition-all">
          <main className="flex flex-1 mt-[4rem] flex-col items-center text-center">
            <div className="text-center">
              <h1 className="font-black text-gray-900 dark:text-gray-200 text-9xl">
                404
              </h1>

              <p className="text-2xl font-bold tracking-tight text-gray-500 dark:opacity-[20%] sm:text-4xl">
                Uh-oh!
              </p>

              <p className="mt-4 text-gray-500">We cant find that page.</p>

              <Link
                href="/"
                className="inline-block px-5 py-3 mt-6 text-sm font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring"
              >
                Go Back Home
              </Link>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
