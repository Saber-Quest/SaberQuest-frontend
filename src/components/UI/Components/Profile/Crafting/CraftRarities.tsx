import { ItemRarity as iR } from "@lib/enums/ItemRarity";

export default function CraftingRarities({
  rarity,
  name,
}: {
  rarity: iR;
  name: string;
}) {
  return (
    <>
      {rarity === iR.C && (
        <div>
          <CommonRarity name={name} />
        </div>
      )}
      {rarity === iR.U && (
        <div>
          <UncommonRarity name={name} />
        </div>
      )}
      {rarity === iR.R && (
        <div>
          <RareRarity name={name} />
        </div>
      )}
      {rarity === iR.E && (
        <div>
          <EpicRarity name={name} />
        </div>
      )}
      {rarity === iR.L && (
        <div>
          <LegendaryRarity name={name} />
        </div>
      )}
    </>
  );
}

function CommonRarity({ name }: { name: string }) {
  return (
    <>
      <div className="w-fit border-2 border-commonItem rounded-full flex items-center bg-commonItemfaint">
        <div className="rounded-full min-h-[12px] min-w-[12px] bg-commonItem m-[2px] ml-1 mr-2" />
        <span className="mr-2">{name}</span>
      </div>
    </>
  );
}

function UncommonRarity({ name }: { name: string }) {
  return (
    <>
      <div className="w-fit border-2 border-uncommonItem rounded-full flex items-center bg-uncommonItemfaint">
        <div className="rounded-full min-h-[12px] min-w-[12px] bg-uncommonItem m-[2px] ml-1 mr-2" />
        <span className="mr-2">{name}</span>
      </div>
    </>
  );
}

function RareRarity({ name }: { name: string }) {
  return (
    <>
      <div className="w-fit border-2 border-rareItem rounded-full flex items-center bg-rareItemfaint">
        <div className="rounded-full min-h-[12px] min-w-[12px] bg-rareItem m-[2px] ml-1 mr-2" />
        <span className="mr-2">{name}</span>
      </div>
    </>
  );
}

function EpicRarity({ name }: { name: string }) {
  return (
    <>
      <div className="w-fit border-2 border-epicItem rounded-full flex items-center bg-epicItemfaint">
        <div className="rounded-full min-h-[12px] min-w-[12px] bg-epicItem m-[2px] ml-1 mr-2" />
        <span className="mr-2">{name}</span>
      </div>
    </>
  );
}

function LegendaryRarity({ name }: { name: string }) {
  return (
    <>
      <div className="w-fit border-2 border-legendaryItem rounded-full flex items-center bg-legendaryItemfaint">
        <div className="rounded-full min-h-[12px] min-w-[12px] bg-legendaryItem m-[2px] ml-1 mr-2" />
        <span className="mr-2">{name}</span>
      </div>
    </>
  );
}
