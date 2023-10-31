import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import Header from "@comp/Meta/Title";
import { ItemList, Item, SessionUser } from "@lib/types";
import { ItemRarity as iR } from "@lib/enums/ItemRarity";
import Rarities from "@ui/Shop/Rarities";

export default function StorePage({
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
  const [shopItems, setShopItems] = useState<ItemList | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [countdownTime, setCountdownTime] = useState(0);
  const [userQP, setUserQP] = useState<number>(0);

  useEffect(() => {
    if (!session) return;
    if (!session.user) return;
    if (sessionCheck) {
      setUserQP(session.user.stats.qp);
    }
  }, [session, sessionCheck]);

  useEffect(() => {
    if (countdownTime === 0) {
      axios
        .get(`${process.env.API_URL}/items/shop`)
        .then((response) => {
          if (response.status === 302 || response.status === 200) {
            setError(false);
            if (response.data !== null) {
              setShopItems(response.data);
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
    if (shopItems === null) return;

    const interval = setInterval(() => {
      let newCountdownTime = countdownTime - 1000;
      if (newCountdownTime < 0) {
        newCountdownTime = 0;
      }

      setCountdownTime(newCountdownTime);

      if (newCountdownTime === 0) {
        axios.get(`${process.env.API_URL}/items/shop`).then((response) => {
          if (response.status === 302 || response.status === 200) {
            newCountdownTime = response.data.reset_time - new Date().getTime();
            setCountdownTime(shopItems.reset_time - new Date().getTime());
          }
        });
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [shopItems, countdownTime]);

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

  const onClickHandler = async (item: Item) => {
    console.log(item);
    if (userQP < item.price) {
      setMessage(
        `You cannot afford "${item.name}".\n\n You're missing ${
          item.price - userQP
        } QP.`
      );
      setType("error");
      setShow(true);
    } else {
      if (!session) return console.log("No JWT token found for the user!");
      
      await axios
        .post(`${process.env.PUBLIC_URL}/api/shop/buy`, {
          token: session.jwt,
          itemId: item,
        })
        .then((response) => {
          if (response.status === 302 || response.status === 200) {
            setMessage(`You have successfully bought "${item.name}".`);
            setType("success");
            setShow(true);
            setUserQP(userQP - item.price);
            updateSession();
          }
        })
        .catch((error) => {
          setMessage(error.response.data.error);
          setType("error");
          setShow(true);
        });
    }
  };

  const updateSession = async () => {
    await axios.get(`${process.env.PUBLIC_URL}/api/profile/${session.id}`)
      .then((response) => {
        if (response.status === 302 || response.status === 200) {
          if (!session.user) {
            setMessage("An error occured while updating your profile on the frontend.\n\nPlease reload website to reflect changes.");
            setType("error");
            setShow(true);
            return;
          }
          const updatedSession: SessionUser = {
            ...session,
            user: {
              ...session.user,
              stats: response.data.stats,
              inventory: response.data.inventory,
            },
          };
          setSession(updatedSession);
        }
      }).catch((error) => {
        setMessage(error.response.data.error);
        setType("error");
        setShow(true);
      });
  };

  return (
    <>
      <Header
        title={`Leaderboard`}
        link={`${process.env.PUBLIC_URL}/shop`}
        contents={`Leaderboard | Leaderboard on ${process.env.PUBLIC_NAME}.`}
        image={`${process.env.PUBLIC_URL}/assets/images/Logo.png`}
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
              shopItems !== null &&
              !loading && (
                <>
                  <h1 className="px-4 sm:px-6 lg:px-8 md:chTextHeader text-[28px] transition-all duration-75 mb-5 flex justify-between">
                    <span>
                      Current <span className="text-sqyellow">Shop</span>
                    </span>{" "}
                    {formatCountdownTime(countdownTime)}
                  </h1>
                  <div className="px-4 sm:px-6 lg:px-8">
                    <div className="mt-8 flex flex-col">
                      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                          <div className="overflow-hidden shadow md:rounded-lg">
                            <table className="min-w-full divide-y divide-sqyellow">
                              <thead className="bg-[#0000003b]">
                                <tr>
                                  <th
                                    scope="col"
                                    className="py-3.5 pl-1 pr-3 text-left text-sm font-semibold sm:pl-6"
                                  >
                                    Item
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-3 py-3.5 text-center text-sm font-semibold"
                                  >
                                    Rarity
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-3 py-3.5 text-center text-sm font-semibold"
                                  >
                                    Price
                                  </th>
                                  <th
                                    scope="col"
                                    className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                                  >
                                    {userQP} QP
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {shopItems.items.map((item, index) => (
                                  <tr
                                    key={index}
                                    className={
                                      (index + 1) % 2 === 0
                                        ? undefined
                                        : "bg-[#0000003d]"
                                    }
                                  >
                                    <td className="flex items-center gap-[15px] whitespace-nowrap py-4 pl-1 pr-3 text-sm font-medium text-white sm:pl-6">
                                      <Image
                                        className="w-auto h-auto"
                                        src={item.image}
                                        alt={item.name}
                                        width={32}
                                        height={32}
                                      />
                                      {item.name}
                                    </td>
                                    <td className="w-[15%] whitespace-nowrap px-3 py-4 text-sm text-center text-white">
                                      <Rarities
                                        rarity={
                                          item.rarity === iR.C
                                            ? iR.C
                                            : item.rarity === iR.U
                                            ? iR.U
                                            : item.rarity === iR.R
                                            ? iR.R
                                            : item.rarity === iR.E
                                            ? iR.E
                                            : item.rarity === iR.L
                                            ? iR.L
                                            : iR.C
                                        }
                                      />
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-center font-bold text-sqyellow">
                                      {item.price} QP
                                    </td>
                                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-center text-sm font-medium sm:pr-6">
                                      <div
                                        onClick={() => onClickHandler(item)}
                                        className="text-[#ffd15269] hover:text-sqyellow transition-colors duration-200 hover:cursor-pointer"
                                      >
                                        Buy
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
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
