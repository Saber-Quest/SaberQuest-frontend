import { InventoryItem } from "@lib/types";
import { Tab } from "@headlessui/react";
import Image from "next/image";
import { ItemRarity as iR } from "@lib/enums/ItemRarity";

export default function InventoryPanel({
  inventory,
}: {
  inventory: InventoryItem[];
}) {
  return (
    <>
      <Tab.Panel className="mt-10">
        <div className="flex flex-col items-center">
          <div className="flex flex-wrap justify-center gap-5">
            {inventory.length > 0 ? (
              inventory.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={`bg-[#00000000] ${
                      item.rarity === iR.C
                        ? "border-commonItem hover:bg-commonItemfaint"
                        : item.rarity === iR.U
                        ? "border-uncommonItem hover:bg-uncommonItemfaint"
                        : item.rarity === iR.R
                        ? "border-rareItem hover:bg-rareItemfaint"
                        : item.rarity === iR.E
                        ? "border-epicItem hover:bg-epicItemfaint"
                        : item.rarity === iR.L
                        ? "border-legendaryItem hover:bg-legendaryItemfaint"
                        : "border-sqyellow hover:bg-sqyellowfaint"
                    } flex flex-col items-center rounded-3xl p-2 border-2 border-opacity-30 drop-shadow-PFPShadow hover:border-opacity-70 transition-all duration-150 ease-in-out`}
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={150}
                      height={150}
                      className="rounded-full relative"
                    />
                    <p className="text-center drop-shadow-textShadow whitespace-pre-line">
                      {`${item.name}\n(${item.rarity})`}
                    </p>
                    <p>x{item.amount}</p>{" "}
                  </div>
                );
              })
            ) : (
              <p>Inventory Empty</p>
            )}
          </div>
        </div>
      </Tab.Panel>
    </>
  );
}
