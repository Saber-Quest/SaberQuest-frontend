import { ChallengeData } from "@lib/types";
import { ChallengeType as cT } from "@lib/enums/Challenge";

export default function HardDiff({
  challengeDatas,
  desc,
  type,
  selDiff,
  showSel,
  finished,
  onSelectDiff,
}: {
  challengeDatas: ChallengeData["difficulties"]["hard"];
  desc: ChallengeData["description"];
  type: ChallengeData["type"];
  selDiff: number;
  showSel: boolean;
  finished: boolean;
  onSelectDiff: (diff: number) => void;
}) {
  return (
    <div className="chChallenges mainDiffDiv">
      <div
        className={`${
          showSel ? "hover:cursor-pointer" : ""
        } allHovers HardHover`}
        onClick={() => onSelectDiff(2)}
      >
        <h1 className={`chTextHeader text-hardreq`}>Hard</h1>
        <div className={`chHardDivider chDivider w-full`} />
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
        {selDiff == 2 && showSel && (
          <div className="flexCol challengeSelFin">
            {finished ? "Finished" : "Selected"}
          </div>
        )}
      </div>
    </div>
  );
}
