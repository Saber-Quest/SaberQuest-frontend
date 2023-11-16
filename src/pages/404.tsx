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
      <div className="allDiv eOuterDiv">
        <div className="eTransition">
          <main className="eMain">
            <div className="eCenterText">
              <h1 className="eH1Header">404</h1>

              <p className="ePClass">Uh-oh!</p>

              <p className="eSubPClass">We cant find that page.</p>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
