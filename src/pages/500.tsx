import React from "react";
import Header from "@comp/Meta/Title";

export default function FourOFour() {
  return (
    <>
      <Header
        title={`500`}
        contents={`500 - Internal server error`}
        link={`${process.env.PUBLIC_URL}`}
        image={`/assets/images/Logo.png`}
      />
      <div className="pt-20 overflow-visible">
        <div className="404Div transition-all">
          <main className="flex flex-1 mt-[4rem] flex-col items-center text-center">
            <div className="text-center">
              <h1 className="font-bold text-sqyellow text-9xl drop-shadow-logoShadow transition-all">
                500
              </h1>

              <p className="text-2xl font-bold tracking-tight text-sqyellow opacity-[70%] sm:text-4xl hover:drop-shadow-logoShadow transition-all">
                Internal server error!
              </p>

              <p className="mt-4 text-white">
                We&apos;re working on a fix, don&apos;t worry!
              </p>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
