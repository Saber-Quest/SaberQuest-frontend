import React, { useState, useEffect } from "react";
import { ChallengeData, SessionUser } from "@lib/types";
import axios from "axios";
import Header from "@comp/Meta/Title";
import ChallengeComp from "@ui/Challenges/Challenges";

export default function Challenges({
  session,
  sessionCheck,
  setSession,
  setMessage,
  setType,
  setShow,
}: {
  session: SessionUser;
  sessionCheck: boolean;
  setSession: (session: SessionUser) => void;
  setMessage: (message: string) => void;
  setType: (type: string) => void;
  setShow: (show: boolean) => void;
}) {
  const [challenges, setChallenges] = useState<ChallengeData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
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
      (timeRemaining % (1000 * 60 * 60)) / (1000 * 60),
    );
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };
  return (
    <>
      <Header
        title={`Daily challenges`}
        link={`${process.env.PUBLIC_URL}/challenges`}
        contents={`Daily Challenges | Current challenges on ${process.env.PUBLIC_NAME}.`}
        image={`${process.env.PUBLIC_URL}/assets/images/Logo.png`}
      />
      <div className="mx-auto mt-5 mb-12 max-w-[90rem]">
        <div className="chpInnerDiv p-4">
          {challenges !== null && !loading && (
            <>
              <h1 className="chpH1Text lg:chTextHeader">
                <span>
                  Current <span className="text-sqyellow">Challenges</span>
                </span>{" "}
                {formatCountdownTime(countdownTime)}
              </h1>
              <div className="chpCCompOuterDiv">
                <div className="mt-8 flexCol">
                  <div className="chpCCompChildDiv">
                    <ChallengeComp
                      challengeDatas={challenges}
                      session={session}
                      setSession={setSession}
                      setMessage={setMessage}
                      setType={setType}
                      setShow={setShow}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
