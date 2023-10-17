import { ChallengeData } from "@lib/types";
import NormalDiff from "./Diffs/Normal";
import HardDiff from "./Diffs/Hard";
import ExpertDiff from "./Diffs/Expert";

export default function ChallengeComp({
  challengeDatas,
}: {
  challengeDatas: ChallengeData;
}) {
  return (
    <div className="chChallenges flex flex-col md:flex-row gap-12">
      <NormalDiff
        challengeDatas={challengeDatas.difficulties.normal}
        desc={challengeDatas.description}
        type={challengeDatas.type}
      />
      <HardDiff
        challengeDatas={challengeDatas.difficulties.hard}
        desc={challengeDatas.description}
        type={challengeDatas.type}
      />
      <ExpertDiff
        challengeDatas={challengeDatas.difficulties.expert}
        desc={challengeDatas.description}
        type={challengeDatas.type}
      />
    </div>
  );
}
