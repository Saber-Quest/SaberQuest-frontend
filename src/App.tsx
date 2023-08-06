import Header from "@comps/Meta/Header";
import "@styles/pages/Frontpage.scss";

export default function App() {
  return (
    <>
      <Header
        page="Frontpage"
        description="SaberQuest is a service that provides daily Beat Saber challenges that you can participate in. Craft and buy items with your points and compete on the leaderboards."
      />
      <div className="fpBody">
        <div className="fpBodyLeft">
          <div className="fpBodyText">
            <h1 className="fpTextHeader">
              Welcome to Saber<span className="fpHeaderHighlight">Quest</span>!
            </h1>
            <p className="fpBodyText">
              Saber<span className="fpBodyHighlight">Quest</span> is a website focused on making your Beat Saber experience
              more enjoyable by giving you fun and <span className="fpBodyHighlight">interactive challenges</span> every day.
            </p>
            <p className="fpBodyText">
              When you complete these challenges you get <span className="fpBodyHighlight">items</span> in your inventory that
              you can <span className="fpBodyHighlight">craft</span> to create new items and get higher on the <span className="fpBodyHighlight">leaderboards</span>.
            </p>
          </div>
          <div className="fpCompletionText">
            <p className="fpBodyText">
              When you pick a challenge, you have <span className="fpBodyHighlight">2 ways of finishing</span> them.
            </p>
          </div>
          <div className="fpCompletionMethods">
            <div className="fpMods">

              <h1 className="fpModsHeader">Beat Saber <span className="fpBodyHighlight">Mods</span></h1>
              <p className="fpModsText">Coming <span className="fpBodyHighlight">Soon</span>!</p>
            </div>
            <div className="fpManual">
              <h1 className="fpManualHeader"><span className="fpBodyHighlight">Manual</span> Submission</h1>
              <p className="fpManualText">
                As to not over-request score-services, when
                you <span className="fpBodyHighlight">complete a challenge</span>, you need to go to
                your profile and click on the “<span className="fpBodyHighlight">Complete Challenge</span>”-button.
              </p>
            </div>
          </div>
        </div>

        <div className="fpBodyRight">
          <div className="fpChallengeText">
            <h1 className="fpTextHeader">
              Example <span className="fpHeaderHighlight">Challenges</span>!
            </h1>
            <h2 className="fpTextSubheader">
              Get a play worth, minimum:
            </h2>
          </div>
          <div className="fpExampleChallenges">
            <div className="fpExampleEasy">
              <p className="fpReqHeader">Easy</p>
              <div className="fpEasyDivider fpDivider" />
              <div className="fpReqs">
                <p className="fpReq"><span className="fpChallengeHighlight">100</span>pp on ScoreSaber</p>
                <p className="fpReq"><span className="fpChallengeHighlight">180</span>pp on BeatLeader</p>
              </div>
            </div>
            <div className="fpExampleMedium">
            <p className="fpReqHeader">Medium</p>
              <div className="fpMediumDivider fpDivider" />
              <div className="fpReqs">
                <p className="fpReq"><span className="fpChallengeHighlight">180</span>pp on ScoreSaber</p>
                <p className="fpReq"><span className="fpChallengeHighlight">260</span>pp on BeatLeader</p>
              </div>
            </div>
            <div className="fpExampleHard">
            <p className="fpReqHeader">Hard</p>
              <div className="fpHardDivider fpDivider" />
              <div className="fpReqs">
                <p className="fpReq"><span className="fpChallengeHighlight">300</span>pp on ScoreSaber</p>
                <p className="fpReq"><span className="fpChallengeHighlight">400</span>pp on BeatLeader</p>
              </div>
            </div>
            <div className="fpExampleExtreme">
            <p className="fpReqHeader">Extreme</p>
              <div className="fpExtremeDivider fpDivider" />
              <div className="fpReqs">
                <p className="fpReq"><span className="fpChallengeHighlight">430</span>pp on ScoreSaber</p>
                <p className="fpReq"><span className="fpChallengeHighlight">500</span>pp on BeatLeader</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
