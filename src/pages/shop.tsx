import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import Header from "@comp/Meta/Title";
import { ItemList } from "@lib/types";
import Logo from "public/Logo.svg";
import { ItemRarity as iR } from "@lib/enums/ItemRarity";

export default function StorePage() {
  const [shopItems, setShopItems] = useState<ItemList | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [countdownTime, setCountdownTime] = useState(0);

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

  return (
    <>
      <Header
        title={`The Item-shop | ${process.env.PUBLIC_NAME}`}
        link={`${process.env.PUBLIC_URL}/shop`}
        contents={`Item-shop | Current items in the shop on ${process.env.PUBLIC_NAME}.`}
        image={Logo}
      />
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
            <div className="flex flex-col items-center justify-center px-16 pt-10 mt-14 drop-shadow-navBarShadow select-none transition-all duration-100 ease-in-out">
              <h1 className="md:chTextHeader text-[28px] transition-all duration-75 mb-14">
                Current <span className="text-sqyellow">Shop</span>
              </h1>

              <h1 className="md:chTextHeader text-[28px] transition-all duration-75 mb-14">
                {formatCountdownTime(countdownTime)}
              </h1>
              <div className="flex flex-row gap-5">
                {shopItems.items.map((item, index) => (
                  <>
                    <div
                      key={index}
                      className={`flex flex-col duration-300 transition-all ease-in-out border-opacity-0 hover:border-opacity-100 hover:scale-110 hover:bg-blColorfaint rounded-2xl p-2 w-[150px] max-w-[150px] items-center ${
                        item.rarity === iR.C
                          ? "hover:shadow-[0px_0px_3px_1px_#7A7A7A]"
                          : item.rarity === iR.U
                          ? "hover:shadow-[0px_0px_3px_1px_#5CD722]"
                          : item.rarity === iR.R
                          ? "hover:shadow-[0px_0px_3px_1px_#2594FA]"
                          : item.rarity === iR.E
                          ? "hover:shadow-[0px_0px_3px_1px_#AD00FF]"
                          : item.rarity === iR.L
                          ? "hover:shadow-[0px_0px_3px_1px_#FFD600]"
                          : "hover:shadow-[0px_0px_3px_1px_#7A7A7A]"
                      }`}
                    >
                      <div className="flex flex-col gap-5 items-center">
                        <h1 className="text-[16px] font-medium transition-all duration-75">
                          {item.name}
                        </h1>
                        <h2
                          className={`font-semibold ${
                            item.rarity === iR.C
                              ? "text-commonItem"
                              : item.rarity === iR.U
                              ? "text-uncommonItem"
                              : item.rarity === iR.R
                              ? "text-rareItem"
                              : item.rarity === iR.E
                              ? "text-epicItem"
                              : item.rarity === iR.L
                              ? "text-legendaryItem"
                              : "text-commonItem"
                          }`}
                        >
                          {item.rarity}
                        </h2>
                        <h3>
                          {item.price}{" "}
                          <span className="text-sqyellow font-semibold">
                            QP
                          </span>
                        </h3>
                        <Image
                          className={`w-[78px] h-[78px] transition-all duration-75`}
                          src={item.image}
                          alt={item.name}
                          width={78}
                          height={78}
                        />
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </>
        )
      )}
    </>
  );
}
