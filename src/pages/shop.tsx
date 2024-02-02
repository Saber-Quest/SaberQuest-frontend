import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import Header from "@comp/Meta/Title";
import { ItemList, Item, SessionUser } from "@lib/types";
import { ItemRarity as iR } from "@lib/enums/ItemRarity";
import Rarities from "@ui/Shop/Rarities";

// I added this comment so I can restart the service :D 
// We'll keep it for memory's sake! ^v^

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
      (timeRemaining % (1000 * 60 * 60)) / (1000 * 60),
    );
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const onClickHandler = async (item: Item) => {
    if (userQP < item.price) {
      setMessage(
        `You cannot afford "${item.name}".\n\n You're missing ${
          item.price - userQP
        } QP.`,
      );
      setType("error");
      setShow(true);
    } else {
      if (!session) return;

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
    await axios
      .get(`${process.env.PUBLIC_URL}/api/profile/${session.id}`)
      .then((response) => {
        if (response.status === 302 || response.status === 200) {
          if (!session.user) {
            setMessage(
              "An error occured while updating your profile on the frontend.\n\nPlease reload website to reflect changes.",
            );
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
      })
      .catch((error) => {
        setMessage(error.response.data.error);
        setType("error");
        setShow(true);
      });
  };

  return (
    <>
      <Header
        title={`Shop`}
        link={`${process.env.PUBLIC_URL}/shop`}
        contents={`Shop | The shop on ${process.env.PUBLIC_NAME}.`}
        image={`${process.env.PUBLIC_URL}/assets/images/Logo.png`}
      />
      <div className="allDiv flex flex-col items-center justify-center px-0 xl:px-16 py-10 drop-shadow-navBarShadow select-none transition-all duration-300 ease-in-out">
        <div className="ShopContainer">
          <h1 className="chpH1Text lg:chTextHeader p-4">
            <span>
              Current <span className="text-sqyellow">Shop</span>
            </span>{" "}
            {formatCountdownTime(countdownTime)}
          </h1>
          <div className="ShopHeader">
            <div className="ShopHeaderText SHI font-semibold">Item</div>
            <div className="ShopHeaderText SHR font-semibold">Rarity</div>
            <div className="ShopHeaderText SHP font-semibold">Price</div>
            <div className="ShopHeaderText SHB font-bold text-sqyellow">{userQP} QP</div>
          </div>
          <div className="border-t-[1px] border-sqyellow overflow-hidden">
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
                  {shopItems.items.map((item, index) => (
                    <div key={index}>
                      <div key={index} className={`ShopEntry ${index === shopItems.items.length - 1 ? 'rounded-b-lg border-b-0' : ''} ${(index + 1) % 2 === 0 ? undefined : "bg-[#0000003d]"} border-b border-[#0000003d]`}>
                        <div className="ShopEntryText SHI text-sm font-medium">
                          <Image
                            className="w-auto h-auto"
                            src={item.image}
                            alt={item.name}
                            width={32}
                            height={32}
                          />
                          {item.name}
                        </div>
                        <div className="ShopEntryText SHR text-center">
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
                        </div>
                        <div className="ShopEntryText SHP text-sm text-center font-bold text-sqyellow">
                          {item.price} QP
                        </div>
                        <div className="ShopEntryText SHB text-sm font-medium">
                          <div
                            onClick={() => onClickHandler(item)}
                            className="text-sqyellow hover:text-[#ffd15269] underline transition-colors duration-200 hover:cursor-pointer"
                          >
                            Buy
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
