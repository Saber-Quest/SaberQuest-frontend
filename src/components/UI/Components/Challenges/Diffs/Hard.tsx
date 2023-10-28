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
    <div className="chChallenges flex flex-col md:flex-row gap-12">
      <div
        className={`${showSel ? 'hover:cursor-pointer' : ''} flex flex-col items-center rounded-xl p-5 hover:shadow-[0px_0px_3px_1px_#E93B3B] transition-all duration-300 ease-in-out`}
        onClick={() => onSelectDiff(2)}
      >
        <h1 className={`chTextHeader text-hardreq`}>Hard</h1>
        <div className={`chHardDivider chDivider w-full`} />
        <div className="max-w-[300px] text-center">{desc}</div>
        <div className="pt-5 text-[24px] justify-center flex">
          {(type === cT.Map && (
            <>
              <span>
                <b className="text-sqyellow font-semibold">
                  {challengeDatas.challenge[0]}
                </b>{" "}
                maps
              </span>
            </>
          )) ||
            (type === cT.FCN && (
              <>
                <span>
                  <b className="text-sqyellow font-semibold">
                    {challengeDatas.challenge[0]}
                  </b>{" "}
                  notes
                </span>
              </>
            )) ||
            (type === cT.PN && (
              <>
                <span>
                  <b className="text-sqyellow font-semibold">
                    {challengeDatas.challenge[0]}
                  </b>{" "}
                  notes
                </span>
              </>
            )) ||
            (type === cT.PP && (
              <>
                <div className="flex flex-col">
                  <div>
                    ScoreSaber:{" "}
                    <b className="text-sqyellow font-semibold">
                      {challengeDatas.challenge[0]}
                    </b>
                    pp
                  </div>
                  <div>
                    BeatLeader:{" "}
                    <b className="text-sqyellow font-semibold">
                      {challengeDatas.challenge[1]}
                    </b>
                    pp
                  </div>
                </div>
              </>
            )) ||
            (type === cT.FCS && (
              <>
                <div className="flex flex-col">
                  <div>
                    ScoreSaber:{" "}
                    <b className="text-sqyellow font-semibold">
                      {challengeDatas.challenge[0]}
                    </b>
                    *
                  </div>
                  <div>
                    BeatLeader:{" "}
                    <b className="text-sqyellow font-semibold">
                      {challengeDatas.challenge[1]}
                    </b>
                    *
                  </div>
                </div>
              </>
            )) ||
            (type === cT.XAS && (
              <>
                <div className="flex flex-col">
                  <div>
                    ScoreSaber:{" "}
                    <b className="text-sqyellow font-semibold">
                      {challengeDatas.challenge[0]}
                    </b>
                    *
                  </div>
                  <div>
                    BeatLeader:{" "}
                    <b className="text-sqyellow font-semibold">
                      {challengeDatas.challenge[1]}
                    </b>
                    *
                  </div>
                  <div>
                    Acc:{" "}
                    <b className="text-sqyellow font-semibold">
                      {challengeDatas.challenge[2]}
                    </b>
                    %
                  </div>
                </div>
              </>
            )) ||
            (type === cT.XAPP && (
              <>
                <div className="flex flex-col">
                  <div>
                    ScoreSaber:{" "}
                    <b className="text-sqyellow font-semibold">
                      {challengeDatas.challenge[0]}
                    </b>
                    pp
                  </div>
                  <div>
                    BeatLeader:{" "}
                    <b className="text-sqyellow font-semibold">
                      {challengeDatas.challenge[1]}
                    </b>
                    pp
                  </div>
                  <div>
                    Acc:{" "}
                    <b className="text-sqyellow font-semibold">
                      {challengeDatas.challenge[2]}
                    </b>
                    %
                  </div>
                </div>
              </>
            )) ||
            (type === cT.XAN && (
              <>
                <div className="flex flex-col">
                  <div>
                    ScoreSaber:{" "}
                    <b className="text-sqyellow font-semibold">
                      {challengeDatas.challenge[0]}
                    </b>{" "}
                    notes
                  </div>
                  <div>
                    BeatLeader:{" "}
                    <b className="text-sqyellow font-semibold">
                      {challengeDatas.challenge[1]}
                    </b>
                    notes
                  </div>
                  <div>
                    Acc:{" "}
                    <b className="text-sqyellow font-semibold">
                      {challengeDatas.challenge[2]}
                    </b>
                    %
                  </div>
                </div>
              </>
            ))}
        </div>
        {selDiff == 2 && showSel && (
          <div className="uppercase font-bold text-[24px] text-sqyellow drop-shadow-logoShadow flex flex-col items-center justify-center w-full mt-5">
            {finished ? 'Finished' : 'Selected'}
          </div>
        )}
      </div>
    </div>
  );
}
