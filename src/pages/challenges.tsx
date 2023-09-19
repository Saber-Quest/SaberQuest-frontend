import { useState, useEffect } from "react";
import { ChallengeData } from "@lib/types/Challenges";
import React from "react";
import Header from "@comp/Meta/Title";
import Logo from "public/Logo.svg";

export default function Challenges() {
  const [challenges, setChallenges] = useState<ChallengeData[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [url, setUrl] = useState<string>("");
  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  return (
    <>
      <Header
        title={`Challenges`}
        link={url}
        contents={`Challenges | The list of current Challenges on ${process.env.PUBLIC_NAME}.`}
        image={Logo}
      />
      <div className="flex flex-col items-center justify-center px-16 pt-10 mt-14 drop-shadow-navBarShadow select-none transition-all duration-100 ease-in-out">
        <h1 className="md:chTextHeader text-[28px] transition-all duration-75 mb-5">
          Current <span className="text-sqyellow">Challenges</span>
        </h1>
        <div className="chChallenges flex flex-col md:flex-row gap-12">
          <div className="flex flex-col items-center rounded-xl p-5 hover:shadow-[0px_0px_3px_1px_#FFD941] transition-all duration-300 ease-in-out">
            <h1 className={`chTextHeader text-[#FFD941]`}>Normal</h1>
            <div className="chNormalDivider chDivider w-full" />
            <div>Play a certain amount of maps:</div>
            <div className="pt-5 text-[32px] justify-center flex font-semibold">
              3
            </div>
          </div>
          <div
            className={`flex flex-col items-center rounded-xl p-5 hover:shadow-[0px_0px_3px_1px_#E93B3B] transition-all duration-300 ease-in-out`}
          >
            <h1 className={`chTextHeader text-[#E93B3B]`}>Hard</h1>
            <div className="chHardDivider chDivider w-full" />
            <div>Play a certain amount of maps: </div>
            <div className="pt-5 text-[32px] font-semibold">8</div>
          </div>
          <div
            className={`flex flex-col items-center rounded-xl p-5 hover:shadow-[0px_0px_3px_1px_#B74BF5] transition-all duration-300 ease-in-out`}
          >
            <h1 className={`chTextHeader text-[#B74BF5]`}>Expert</h1>
            <div className="chExpertDivider chDivider w-full" />
            <div>Play a certain amount of maps:</div>
            <div className="pt-5 text-[32px] justify-center flex font-semibold">
              15
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
