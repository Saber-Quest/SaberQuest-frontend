import React, { useState, useEffect } from "react";
import { ChallengeData } from "@lib/types";
import axios from "axios";
import Header from "@comp/Meta/Title";
import Logo from "public/Logo.svg";
import ChallengeComp from "@comp/UI/Components/Challenges/Challenges";

export default function Challenges() {
  const [challenges, setChallenges] = useState<ChallengeData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [url, setUrl] = useState<string>("");
  const [countdownTime, setCountdownTime] = useState(0);

  useEffect(() => {
    if (countdownTime === 0) {
      axios
        .get(`${process.env.API_URL}/challenge/daily`)
        .then((response) => {
          if (response.status === 302 || response.status === 200) {
            setError(false);
            if (response.data !== null) {
              setChallenges(response.data);
              setCountdownTime(response.data.reset_time - new Date().getTime());
            }
          } else {
            setError(true);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("An error occurred, contact a developer!");
          console.error(error);
          setError(true);
        });
      setUrl(window.location.href);
    }
  }, [countdownTime]);

  useEffect(() => {
    if (challenges === null) return;

    const interval = setInterval(() => {
      let newCountdownTime = countdownTime - 1000;
      if (newCountdownTime < 0) {
        newCountdownTime = 0;
      }

      setCountdownTime(newCountdownTime);

      if (newCountdownTime === 0) {
        axios.get(`${process.env.API_URL}/challenge/daily`).then((response) => {
          if (response.status === 302 || response.status === 200) {
            newCountdownTime = response.data.reset_time - new Date().getTime();
            setCountdownTime(challenges.reset_time - new Date().getTime());
          }
        });
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [challenges, countdownTime]);

  const formatCountdownTime = (timeRemaining: any) => {
    const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
    const minutes = Math.floor(
      (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <>
      <Header
        title={`Daily challenges | ${process.env.PUBLIC_NAME}`}
        link={`${process.env.PUBLIC_URL}/challenges`}
        contents={`Daily Challenges | Current challenges on ${process.env.PUBLIC_NAME}.`}
        image={Logo}
      />
      {loading ? (
        ""
      ) : error ? (
        <div className="flex flex-col items-center justify-center w-full h-full">
          <div className="w-[120px] h-16 mb-2">No data found.</div>
        </div>
      ) : (
        challenges !== null &&
        !loading && (
          <>
            <div className="flex flex-col items-center justify-center px-16 pt-10 mt-14 drop-shadow-navBarShadow select-none transition-all duration-100 ease-in-out">
              <h1 className="md:chTextHeader text-[28px] transition-all duration-75 mb-14">
                Current <span className="text-sqyellow">Challenges</span>
              </h1>

              <h1 className="md:chTextHeader text-[28px] transition-all duration-75 mb-14">
                Resets in: {formatCountdownTime(countdownTime)}
              </h1>

              <ChallengeComp challengeDatas={challenges} />
            </div>
          </>
        )
      )}
    </>
  );
}
