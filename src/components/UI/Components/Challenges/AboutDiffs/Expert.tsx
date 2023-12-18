import { ChallengeData } from "@lib/types";
import { ChallengeType as cT } from "@lib/enums/Challenge";

export default function ExpertDiff({
  challengeDatas,
  desc,
  type,
}: {
  challengeDatas: ChallengeData["difficulties"]["expert"];
  desc: ChallengeData["description"];
  type: ChallengeData["type"];
}) {
  return (
    <div className="chChallenges mainDiffDiv">
      <div className={`allHovers ExpertHover`}>
        <h1 className={`chTextHeader text-expertreq`}>Expert</h1>
        <div className={`chExpertDivider chDivider w-full`} />
        <div className="challengeDesc">{desc}</div>
        <div className="challengeDescGoalDiv">
          {(type === cT.Map && (
            <>
              <span>
                <b className="challengeDescGoal">
                  {challengeDatas.challenge[0]}
                </b>{" "}
                maps
              </span>
            </>
          )) ||
            (type === cT.FCN && (
              <>
                <span>
                  <b className="challengeDescGoal">
                    {challengeDatas.challenge[0]}
                  </b>{" "}
                  notes
                </span>
              </>
            )) ||
            (type === cT.PN && (
              <>
                <span>
                  <b className="challengeDescGoal">
                    {challengeDatas.challenge[0]}
                  </b>{" "}
                  notes
                </span>
              </>
            )) ||
            (type === cT.PP && (
              <>
                <div className="flexCol">
                  <div>
                    ScoreSaber:{" "}
                    <b className="challengeDescGoal">
                      {challengeDatas.challenge[0]}
                    </b>
                    pp
                  </div>
                  <div>
                    BeatLeader:{" "}
                    <b className="challengeDescGoal">
                      {challengeDatas.challenge[1]}
                    </b>
                    pp
                  </div>
                </div>
              </>
            )) ||
            (type === cT.FCS && (
              <>
                <div className="flexCol">
                  <div>
                    ScoreSaber:{" "}
                    <b className="challengeDescGoal">
                      {challengeDatas.challenge[0]}
                    </b>
                    *
                  </div>
                  <div>
                    BeatLeader:{" "}
                    <b className="challengeDescGoal">
                      {challengeDatas.challenge[1]}
                    </b>
                    *
                  </div>
                </div>
              </>
            )) ||
            (type === cT.XAS && (
              <>
                <div className="flexCol">
                  <div>
                    ScoreSaber:{" "}
                    <b className="challengeDescGoal">
                      {challengeDatas.challenge[0]}
                    </b>
                    *
                  </div>
                  <div>
                    BeatLeader:{" "}
                    <b className="challengeDescGoal">
                      {challengeDatas.challenge[1]}
                    </b>
                    *
                  </div>
                  <div>
                    Acc:{" "}
                    <b className="challengeDescGoal">
                      {challengeDatas.challenge[2]}
                    </b>
                    %
                  </div>
                </div>
              </>
            )) ||
            (type === cT.XAPP && (
              <>
                <div className="flexCol">
                  <div>
                    ScoreSaber:{" "}
                    <b className="challengeDescGoal">
                      {challengeDatas.challenge[0]}
                    </b>
                    pp
                  </div>
                  <div>
                    BeatLeader:{" "}
                    <b className="challengeDescGoal">
                      {challengeDatas.challenge[1]}
                    </b>
                    pp
                  </div>
                  <div>
                    Acc:{" "}
                    <b className="challengeDescGoal">
                      {challengeDatas.challenge[2]}
                    </b>
                    %
                  </div>
                </div>
              </>
            )) ||
            (type === cT.XAN && (
              <>
                <div className="flexCol">
                  <div>
                    Notes:{" "}
                    <b className="challengeDescGoal">
                      {challengeDatas.challenge[0]}
                    </b>
                  </div>
                  <div>
                    Acc:{" "}
                    <b className="challengeDescGoal">
                      {challengeDatas.challenge[1]}
                    </b>
                    %
                  </div>
                </div>
              </>
            ))}
        </div>
      </div>
    </div>
  );
}
