import React from "react";
import Header from "@comp/Meta/Title";

export default function FourOFour() {
  return (
    <>
      <Header
        title={`500`}
        contents={`500 - Internal server error`}
        link={`${process.env.PUBLIC_URL}`}
        image={`${process.env.PUBLIC_URL}/assets/images/Logo.png`}
      />
      <div className="allDiv eOuterDiv">
        <div className="eTransition">
          <main className="flexCol eMain">
            <div className="eCenterText">
              <h1 className="eH1Header">500</h1>

              <p className="ePClass">Internal server error!</p>

              <p className="eSubPClass">
                We&apos;re working on a fix, don&apos;t worry!
              </p>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
