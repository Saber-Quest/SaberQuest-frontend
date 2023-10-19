import { ItemRarity as iR } from "@lib/enums/ItemRarity";

export default function Rarities({ rarity }: { rarity: iR }) {
  return (
    <>
      {rarity === iR.C && <CommonRarity />}
      {rarity === iR.U && <UncommonRarity />}
      {rarity === iR.R && <RareRarity />}
      {rarity === iR.E && <EpicRarity />}
      {rarity === iR.L && <LegendaryRarity />}
    </>
  );
}

function CommonRarity() {
  return (
    <>
      <div className="border-2 border-commonItem rounded-full flex items-center w-[120px] bg-commonItemfaint">
        <div className="rounded-full h-[12px] w-[12px] bg-commonItem m-[2px] ml-1" />
        <span className="w-[75%]">Common</span>
      </div>
    </>
  );
}

function UncommonRarity() {
  return (
    <>
      <div className="border-2 border-uncommonItem rounded-full flex items-center w-[120px] bg-uncommonItemfaint">
        <div className="rounded-full h-[12px] w-[12px] bg-uncommonItem m-[2px] ml-1" />
        <span className="w-[80%]">Uncommon</span>
      </div>
    </>
  );
}

function RareRarity() {
  return (
    <>
      <div className="border-2 border-rareItem rounded-full flex items-center w-[120px] bg-rareItemfaint">
        <div className="rounded-full h-[12px] w-[12px] bg-rareItem m-[2px] ml-1" />
        <span className="w-[75%]">Rare</span>
      </div>
    </>
  );
}

function EpicRarity() {
  return (
    <>
      <div className="border-2 border-epicItem rounded-full flex items-center w-[120px] bg-epicItemfaint">
        <div className="rounded-full h-[12px] w-[12px] bg-epicItem m-[2px] ml-1" />
        <span className="w-[75%]">Epic</span>
      </div>
    </>
  );
}

function LegendaryRarity() {
  return (
    <>
      <div className="border-2 border-legendaryItem rounded-full flex items-center w-[120px] bg-legendaryItemfaint">
        <div className="rounded-full h-[12px] w-[12px] bg-legendaryItem m-[2px] ml-1" />
        <span className="w-[80%]">Legendary</span>
      </div>
    </>
  );
}
