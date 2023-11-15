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
        title={`Daily challenges`}
        link={`${process.env.PUBLIC_URL}/challenges`}
        contents={`Daily Challenges | Current challenges on ${process.env.PUBLIC_NAME}.`}
        image={`/assets/images/Logo.png`}
      />
      <div className="flex flex-col items-center justify-center px-16 pt-10 mt-14 drop-shadow-navBarShadow select-none transition-all duration-100 ease-in-out">
        <div className="LeaderboardContainer min-w-[1000px]">
          <div className="LeaderboardList">
            {loading ? (
              <div className="flex flex-col items-center justify-center w-full h-full">
                <div className="w-16 h-16 mb-2">Loading....</div>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center w-full h-full">
                <div className="w-[120px] h-16 mb-2">No data found.</div>
              </div>
            ) : (
              challenges !== null &&
              !loading && (
                <>
                  <h1 className="px-4 sm:px-6 lg:px-8 md:chTextHeader text-[28px] transition-all duration-75 mb-5 flex justify-between">
                    <span>
                      Current <span className="text-sqyellow">Challenges</span>
                    </span>{" "}
                    {formatCountdownTime(countdownTime)}
                  </h1>
                  <div className="px-4 sm:px-6 lg:px-8">
                    <div className="mt-8 flex flex-col">
                      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
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
                  </div>
                </>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
}
