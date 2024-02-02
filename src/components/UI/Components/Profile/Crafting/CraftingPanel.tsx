import { useEffect, useState } from "react";
import axios from "axios";
import { InventoryItem, AllowedRecipes, SessionUser } from "@lib/types";
import ItemEntry from "./Entries";

export default function CraftingPanel({
  session,
  inventory,
  setSession,
  setMessage,
  setType,
  setShow,
}: {
  session: SessionUser;
  inventory: InventoryItem[];
  setSession: (session: SessionUser) => void;
  setMessage: (message: string) => void;
  setType: (type: string) => void;
  setShow: (show: boolean) => void;
}) {
  const [recipes, setRecipes] = useState<AllowedRecipes[]>([]);

  useEffect(() => {
    axios
      .post(`${process.env.PUBLIC_URL}/api/crafting/recipes`, {
        id: session.id,
      })
      .then((response) => {
        if (response.status === 302 || response.status === 200) {
          setRecipes(response.data.allowedRecipes);
        }
      })
      .catch((error) => {
        console.error("An error occurred, contact a developer!");
        console.error(error);
      });
  }, [session]);

  return (
    <>
      <div className="ccMainDiv">
        <ItemEntry
          session={session}
          setSession={setSession}
          recipes={recipes}
          setRecipes={setRecipes}
          setMessage={setMessage}
          setType={setType}
          setShow={setShow}
        />
      </div>
    </>
  );
}
