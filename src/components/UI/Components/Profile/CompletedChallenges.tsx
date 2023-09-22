import { useState } from "react";
import { ChallengeHistoryItem } from "@lib/types/AdvancedUser";
import {
  ChallengeDiff as cD,
  ChallengePlatforms as cP,
} from "@lib/enums/Challenge";
import { ItemRarity as iR } from "@lib/enums/ItemRarity";
import Image from "next/image";
import {
  CalendarIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@heroicons/react/20/solid";
import ExtendedChallengeInfo from "./ExtendedChallengeInfo";
import { dateConvert } from "@lib/utils/dateConvert";
import TimeAgo from "react-timeago";

export default function ChallengesPanel({
  challenges,
}: {
  challenges: ChallengeHistoryItem[];
}) {
  const [expandedIndex, setExpandedIndex] = useState(-1);

  const toggleAccordion = (index: number) => {
    if (expandedIndex === index) {
      setExpandedIndex(-1);
    } else {
      setExpandedIndex(index);
    }
  };
  return (
    <>
      <div className="ccMainDiv">
        <ul role="list" className="ccListDivider">
          {challenges.length > 0 ? (
            challenges.map((item, index) => (
              <li key={index} onClick={() => toggleAccordion(index)}>
                <div className="ccChallengeFullInfo">
                  <div className="ccChallengeMiniInfo">
                    <div className="ccChallengeMiniInfoFull">
                      <div className="ccChallengeMiniInfoLeft">
                        <div className="ccMiniCard">
                          <p className="ccMiniChalName">
                            {item.challenge.name}
                          </p>
                          {(item.challenge.difficulty.name === cD.N && (
                            <span className="ccNChalDiff">
                              {item.challenge.difficulty.name}
                            </span>
                          )) ||
                            (item.challenge.difficulty.name === cD.H && (
                              <span className="ccHChalDiff">
                                {item.challenge.difficulty.name}
                              </span>
                            )) ||
                            (item.challenge.difficulty.name === cD.Ex && (
                              <span className="ccExChalDiff">
                                {item.challenge.difficulty.name}
                              </span>
                            ))}
                          {(item.challenge.preference === cP.SS && (
                            <span className="ccSSColor">
                              <Image
                                src="/assets/images/ScoreSaberLogo.svg"
                                alt="BeatLeader"
                                className="mr-[4px]"
                                width={16}
                                height={16}
                              />{" "}
                              ScoreSaber
                            </span>
                          )) ||
                            (item.challenge.preference === cP.BL && (
                              <span className="ccBLColor">
                                <Image
                                  src="/assets/images/BeatLeaderLogo.png"
                                  alt="BeatLeader"
                                  className="mr-[4px]"
                                  width={16}
                                  height={16}
                                />{" "}
                                BeatLeader
                              </span>
                            ))}
                        </div>
                        <div className="ccMiniCalDiv">
                          <div className="ccMiniCalInfo">
                            <CalendarIcon
                              className="ccCalIcon"
                              aria-hidden="true"
                            />
                            {expandedIndex === index ? (
                              dateConvert({ isoDate: item.date, type: 1 })
                            ) : (
                              <TimeAgo date={item.date} />
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="ccMiniItemsDiv">
                        <div className="ccMiniItemsRow">
                          {item.items.map((cItems, cIndex) => (
                            <Image
                              key={cIndex}
                              className={`ccMiniItemsRing ${
                                cItems.rarity === iR.C
                                  ? "ring-commonItem"
                                  : cItems.rarity === iR.U
                                  ? "ring-uncommonItem"
                                  : cItems.rarity === iR.R
                                  ? "ring-rareItem"
                                  : cItems.rarity === iR.E
                                  ? "ring-epicItem"
                                  : cItems.rarity === iR.L
                                  ? "ring-legendaryItem"
                                  : "ring-sqyellow"
                              }`}
                              src={cItems.image}
                              alt={cItems.name}
                              width={24}
                              height={24}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="ccChevronDiv">
                      <button className="ccChevronButton" aria-hidden="true">
                        {expandedIndex === index ? (
                          <ChevronDownIcon />
                        ) : (
                          <ChevronRightIcon />
                        )}
                      </button>
                    </div>
                  </div>
                  {expandedIndex === index && (
                    <>
                      <ExtendedChallengeInfo item={item} />
                    </>
                  )}
                </div>
              </li>
            ))
          ) : (
            <p className="text-center">No completed challenges</p>
          )}
        </ul>
      </div>
    </>
  );
}
