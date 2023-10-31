import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import rateLimit from "@lib/api/ratelimit";
import { InventoryItem, Item, ItemRecipes } from "@lib/types";
import { AllowedRecipes } from "@lib/types/ItemCrafting";

const ratelimit: any = 5;
const limiter = rateLimit({
  interval: 10 * 1000,
  uniqueTokenPerInterval: 200,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await limiter.check(res, ratelimit, "CACHE_TOKEN");
    try {
      if (req.method === "POST") {
        const { id }: { id: string } = req.body;

        if (!id) {
          return res.status(400).json({ error: "Missing ID" });
        }

        let inventory: InventoryItem[] = [];
        let recipes: ItemRecipes[] = [];
        let knownItems: Item[] = [];

        await axios
          .get(`${process.env.API_URL}/profile/${id}/inventory`)
          .then((response) => {
            inventory = response.data;
          })
          .catch(() => {
            return res
              .status(400)
              .json({ error: "Could not fetch user-inventory from database." });
          });

        await axios
          .get(`${process.env.API_URL}/crafting/recipes`)
          .then((response) => {
            recipes = response.data;
          })
          .catch(() => {
            return res
              .status(400)
              .json({ error: "Could not fetch recipe-table from the database." });
          });

        await axios
          .get(`${process.env.API_URL}/items/all`)
          .then((response) => {
            knownItems = response.data;
          })
          .catch(() => {
            return res
              .status(400)
              .json({ error: "Could not fetch items-table from the database." });
          });

        const transformedRecipes: ItemRecipes[] = recipes.map((recipe) => {
          const item1 = knownItems.find((item) => item.id === recipe.item1_id);
          const item2 = knownItems.find((item) => item.id === recipe.item2_id);
          const crafted = knownItems.find(
            (item) => item.id === recipe.crafted_id
          );

          return {
            item1_id: recipe.item1_id,
            item1_name: item1?.name,
            item1_image: item1?.image,
            item1_rarity: item1?.rarity,
            item2_id: recipe.item2_id,
            item2_name: item2?.name,
            item2_image: item2?.image,
            item2_rarity: item2?.rarity,
            crafted_id: recipe.crafted_id,
            crafted_name: crafted?.name,
            crafted_image: crafted?.image,
            crafted_rarity: crafted?.rarity,
          };
        });

        let allowedRecipes: AllowedRecipes[] = [];

        for (const transformedRecipe of transformedRecipes) {
          const { item1_id, item2_id } = transformedRecipe;

          const item1 = inventory.find((item) => item.id === item1_id);
          const item2 = inventory.find((item) => item.id === item2_id);

          if (item1 && item2 && item1.amount >= 2 && item2.amount >= 2) {
            
            const canCraft = Math.min(
              Math.floor(item1.amount / 2),
              Math.floor(item2.amount / 2)
            );

            const recipeWithCanCraft: AllowedRecipes = {
              item1: {
                id: item1_id,
                name: transformedRecipe.item1_name || "",
                image: transformedRecipe.item1_image || "",
                rarity: transformedRecipe.item1_rarity || "",
              },
              item2: {
                id: item2_id,
                name: transformedRecipe.item2_name || "",
                image: transformedRecipe.item2_image || "",
                rarity: transformedRecipe.item2_rarity || "",
              },
              crafted: {
                id: transformedRecipe.crafted_id,
                name: transformedRecipe.crafted_name || "",
                image: transformedRecipe.crafted_image || "",
                rarity: transformedRecipe.crafted_rarity || "",
              },
              canCraft,
            };
            allowedRecipes.push(recipeWithCanCraft);
          }
        }

        allowedRecipes = allowedRecipes.filter(
          (recipe) => recipe.canCraft >= 1
        );

        return res.status(200).json({ allowedRecipes });
      } else {
        return res.status(400).json({ error: "Invalid request method" });
      }
    } catch (error) {
      return res.status(500).json({ error: "Something bad happened" });
    }
  } catch (error) {
    return res.status(429).json({ error: "Rate limit exceeded.\n Slow down!" });
  }
}