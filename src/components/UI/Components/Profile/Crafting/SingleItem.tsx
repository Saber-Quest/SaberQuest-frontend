import CraftingRarities from "./CraftRarities";
import { ItemRarity as iR } from "@lib/enums/ItemRarity";
import { AllowedRecipes } from "@lib/types";

export default function SingleItem({
  recipe,
  index,
  handleCraft,
}: {
  recipe: AllowedRecipes;
  index: number;
  handleCraft: (recipe: AllowedRecipes) => void;
}) {
  return (
    <>
      <tbody>
        <tr
          key={index}
          className={index % 2 === 0 ? "bg-[#0000003d]" : undefined}
        >
          <td className="py-4 pl-1 text-sm font-medium text-white sm:pl-6">
            <CraftingRarities
              rarity={
                recipe.item1.rarity === iR.C
                  ? iR.C
                  : recipe.item1.rarity === iR.U
                    ? iR.U
                    : recipe.item1.rarity === iR.R
                      ? iR.R
                      : recipe.item1.rarity === iR.E
                        ? iR.E
                        : recipe.item1.rarity === iR.L
                          ? iR.L
                          : iR.C
              }
              name={`${recipe.item1.name}`}
            />
          </td>
          <td className="py-4 pl-1 text-sm font-medium text-white sm:pl-6">
            <CraftingRarities
              rarity={
                recipe.item2.rarity === iR.C
                  ? iR.C
                  : recipe.item2.rarity === iR.U
                    ? iR.U
                    : recipe.item2.rarity === iR.R
                      ? iR.R
                      : recipe.item2.rarity === iR.E
                        ? iR.E
                        : recipe.item2.rarity === iR.L
                          ? iR.L
                          : iR.C
              }
              name={`${recipe.item2.name}`}
            />
          </td>
          <td className="py-4 pl-1 text-sm font-medium text-white sm:pl-6">
            <CraftingRarities
              rarity={
                recipe.crafted.rarity === iR.C
                  ? iR.C
                  : recipe.crafted.rarity === iR.U
                    ? iR.U
                    : recipe.crafted.rarity === iR.R
                      ? iR.R
                      : recipe.crafted.rarity === iR.E
                        ? iR.E
                        : recipe.crafted.rarity === iR.L
                          ? iR.L
                          : iR.C
              }
              name={`${recipe.crafted.name}`}
            />
          </td>
          <td className="py-4 pl-1 text-sm font-medium text-white sm:pl-6">
            {recipe.canCraft}x
          </td>
          <td className="relative py-4 pl-3 pr-4 text-center text-sm font-medium sm:pr-6">
            <div
              onClick={() => handleCraft(recipe)}
              className="text-[#ffd15269] hover:text-sqyellow transition-colors duration-200 hover:cursor-pointer"
            >
              Craft!
            </div>
          </td>
        </tr>
      </tbody>
    </>
  );
}
