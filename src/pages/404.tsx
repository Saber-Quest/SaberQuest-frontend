import React from "react";
import Header from "@comp/Meta/Title";

export default function FourOFour() {
  return (
    <>
      <Header
        title={`404`}
        contents={`404 - Page not found`}
        link={`${process.env.PUBLIC_URL}`}
        image={`${process.env.PUBLIC_URL}/assets/images/Logo.png`}
      />
      <div className="pt-20 overflow-visible">
        <div className="404Div transition-all">
          <main className="flex flex-1 mt-[4rem] flex-col items-center text-center">
            <div className="text-center">
              <h1 className="font-bold text-sqyellow text-9xl drop-shadow-logoShadow transition-all">
                404
              </h1>

              <p className="text-2xl font-bold tracking-tight text-sqyellow opacity-[40%] sm:text-4xl hover:drop-shadow-logoShadow transition-all">
                Uh-oh!
              </p>

              <p className="mt-4 text-white">We cant find that page.</p>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
