import { InventoryItem } from "@lib/types";
import { Tab } from "@headlessui/react";
import Image from "next/image";

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
                    className="flex flex-col items-center rounded-3xl p-2 border-2 border-sqyellow border-opacity-0 drop-shadow-PFPShadow hover:border-opacity-30 transition-all duration-150 ease-in-out"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={150}
                      height={150}
                      className="rounded-full relative"
                    />
                    <p className="text-center drop-shadow-textShadow">
                      {item.name}
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
