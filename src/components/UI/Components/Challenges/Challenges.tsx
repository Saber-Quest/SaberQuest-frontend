import { useEffect, useState } from "react";
import axios from "axios";
import { ChallengeData, SessionUser } from "@lib/types";
import NormalDiff from "./Diffs/Normal";
import HardDiff from "./Diffs/Hard";
import ExpertDiff from "./Diffs/Expert";

export default function ChallengeComp({
  challengeDatas,
  session,
  setSession,
  setMessage,
  setType,
  setShow,
}: {
  challengeDatas: ChallengeData;
  session: SessionUser;
  setSession: (session: SessionUser) => void;
  setMessage: (message: string) => void;
  setType: (type: string) => void;
  setShow: (show: boolean) => void;
}) {

  const [selectedDiff, setSelectedDiff] = useState<number>(0);
  const [showSel, setShowSel] = useState<boolean>(false);
  const [finished, setFinished] = useState<boolean>(false);

  useEffect(() => {
    if (!session) return;
    if (!session.user) return;
    setSelectedDiff(session.user.today.diff);
    setFinished(session.user.today.completed);
    setShowSel(true);
  }, [session]);

  const handleSelectDiff = async (diff: number) => {
    if (!session) return;
    if (session.user?.today.completed) {
      setMessage(
        `You already completed a challenge today!\nYou can't change your difficulty anymore.`
      );
      setType("info");
      setShow(true);
      return;
    }

    await axios
      .put(`${process.env.PUBLIC_URL}/api/profile/setChallenge`, {
        id: diff,
        t: session.jwt,
      })
      .then((response) => {
        if (response.status === 302 || response.status === 200) {
          setSelectedDiff(diff);
          setMessage(`You selected a difficulty!`);
          setType("success");
          setShow(true);
          if (!session.user) return;
          const updatedSession: SessionUser = {
            ...session,
            user: {
              ...session.user,
              today: {
                ...session.user.today,
                diff: diff,
              },
            },
          };
          setSession(updatedSession);
        }
      })
      .catch((error) => {
        setMessage(error.response.data.error);
        setType("error");
        setShow(true);
      });
  };

  const handleFinish = async () => {
    if (!session) return;
    if (session.user?.today.completed) {
      setMessage(`You already completed a challenge today!`);
      setType("info");
      setShow(true);
      return;
    }

    setMessage(`Processing... Please wait!\n\n If nothing happens within 20 seconds, please try again.\n\n Contact a developer if the problem persists.`);
    setType("info");
    setShow(true);

    await axios
      .post(`${process.env.PUBLIC_URL}/api/profile/finishChallenge`, {
        t: session.jwt,
      })
      .then((response) => {
        if (response.status === 302 || response.status === 200) {
          setMessage(`Challenge completed\nGood job!`);
          setType("success");
          setShow(true);
          if (!session.user) return;
          const updatedSession: SessionUser = {
            ...session,
            user: {
              ...session.user,
              today: {
                ...session.user.today,
                completed: true,
              },
            },
          };
          setSession(updatedSession);
        }
      })
      .catch((error) => {
        setMessage(error.response.data.error);
        setType("error");
        setShow(true);
      });
  };

  return (
    <div className="flex flex-col items-center gap-12">
      <div className="chChallenges flex flex-col md:flex-row gap-12">
        <NormalDiff
          challengeDatas={challengeDatas.difficulties.normal}
          desc={challengeDatas.description}
          type={challengeDatas.type}
          selDiff={selectedDiff}
          showSel={showSel}
          finished={finished}
          onSelectDiff={handleSelectDiff}
        />
        <HardDiff
          challengeDatas={challengeDatas.difficulties.hard}
          desc={challengeDatas.description}
          type={challengeDatas.type}
          selDiff={selectedDiff}
          showSel={showSel}
          finished={finished}
          onSelectDiff={handleSelectDiff}
        />
        <ExpertDiff
          challengeDatas={challengeDatas.difficulties.expert}
          desc={challengeDatas.description}
          type={challengeDatas.type}
          selDiff={selectedDiff}
          showSel={showSel}
          finished={finished}
          onSelectDiff={handleSelectDiff}
        />
      </div>
      {showSel && (
        <div 
        className="font-semibold text-[24px] hover:cursor-pointer rounded-2xl bg-[#0000003b] px-4 py-2" 
        onClick={handleFinish}>
          Complete Challenge
        </div>
      )}
    </div>
  );
}
