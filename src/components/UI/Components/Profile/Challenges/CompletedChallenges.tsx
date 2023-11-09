import { useState } from "react";
import { ChallengeHistoryItem } from "@lib/types";
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
  const challengesPerPage = 5;
  const [expandedIndex, setExpandedIndex] = useState(-1);
  const [numberOfPages] = useState<number>(
    Math.ceil(challenges.length / challengesPerPage)
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const startChallengeIndex = (currentPage - 1) * challengesPerPage;
  const endChallengeIndex = startChallengeIndex + challengesPerPage;
  const challengesToShow = challenges.slice(
    startChallengeIndex,
    endChallengeIndex
  );

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
          {challengesToShow.length > 0 ? (
            challengesToShow.map((item, index) => (
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
                              key={index - cIndex}
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
        {numberOfPages > 1 && (
          <div className="ccNavigation">
            <button
              className={`Backward ${
                currentPage > 1 ? "" : "cursor-not-allowed"
              }`}
              onClick={() => {
                if (currentPage > 1) {
                  const previousPage = currentPage - 1;
                  setCurrentPage(previousPage);
                }
              }}
            >
              Back
            </button>

            <div className="PageNumber">{currentPage}</div>

            <button
              className={`Forward ${
                currentPage < numberOfPages ? "" : "cursor-not-allowed"
              }`}
              onClick={() => {
                if (currentPage < numberOfPages) {
                  const nextPage = currentPage + 1;
                  setCurrentPage(nextPage);
                }
              }}
            >
              Forward
            </button>
          </div>
        )}
      </div>
    </>
  );
}
