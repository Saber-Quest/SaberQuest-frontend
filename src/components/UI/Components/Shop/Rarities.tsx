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
      <div className="outerPill common">
        <div className="innerPill common" />
        <span className="pillTexts">Common</span>
      </div>
    </>
  );
}

function UncommonRarity() {
  return (
    <>
      <div className="outerPill uncommon">
        <div className="innerPill uncommon" />
        <span className="pillText">Uncommon</span>
      </div>
    </>
  );
}

function RareRarity() {
  return (
    <>
      <div className="outerPill rare">
        <div className="innerPill rare" />
        <span className="pillText">Rare</span>
      </div>
    </>
  );
}

function EpicRarity() {
  return (
    <>
      <div className="outerPill epic">
        <div className="innerPill epic" />
        <span className="pillText">Epic</span>
      </div>
    </>
  );
}

function LegendaryRarity() {
  return (
    <>
      <div className="outerPill legendary">
        <div className="innerPill legendary" />
        <span className="w-full">Legendary</span>
      </div>
    </>
  );
}
