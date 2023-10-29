import { useEffect, useState } from "react";
import axios from "axios";
import { AllowedRecipes, SessionUser } from "@lib/types";
import SingleItem from "./SingleItem";

export default function ItemEntry({
  session,
  setSession,
  recipes,
  setRecipes,
  setMessage,
  setType,
  setShow,
}: {
  session: SessionUser;
  setSession: (session: SessionUser) => void;
  recipes: AllowedRecipes[];
  setRecipes: (recipes: AllowedRecipes[]) => void;
  setMessage: (message: string) => void;
  setType: (type: string) => void;
  setShow: (show: boolean) => void;
}) {
  const recipesPerPage = 7;
  const [numberOfPages, setNumberOfPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const startRecipesIndex = (currentPage - 1) * recipesPerPage;
  const endRecipesIndex = startRecipesIndex + recipesPerPage;
  const recipesToShow = recipes.slice(startRecipesIndex, endRecipesIndex);

  useEffect(() => {
    const calculatedNumberOfPages = Math.ceil(recipes.length / recipesPerPage);
    setNumberOfPages(calculatedNumberOfPages);
  }, [recipes]);

  const handleCraft = (recipe: AllowedRecipes) => {
    if (recipe.canCraft < 1) {
      setMessage("You don't have the required items to craft this item.");
      setType("error");
      setShow(true);
      return;
    }
    let antiSpam = false;

    if (!antiSpam) {
      antiSpam = true;
      axios
        .post(`${process.env.PUBLIC_URL}/api/crafting/craft`, {
          item1: recipe.item1.id,
          item2: recipe.item2.id,
          token: session.jwt,
        })
        .then((response) => {
          if (response.status === 302 || response.status === 200) {
            const recipesToSubtractFrom = recipes.filter((r) => {
              const hasItem1 =
                r.item1.id === recipe.item1.id ||
                r.item2.id === recipe.item1.id;
              const hasItem2 =
                r.item1.id === recipe.item2.id ||
                r.item2.id === recipe.item2.id;

              return hasItem1 || hasItem2;
            });

            const subtractedRecipes = new Set();

            recipesToSubtractFrom.forEach((r) => {
              if (!subtractedRecipes.has(r) && r.canCraft > 1) {
                r.canCraft -= 1;
                subtractedRecipes.add(r);
              } else if (r.canCraft <= 1) {
                recipes.splice(recipes.indexOf(r), 1);
              }
            });

            setRecipes([...recipes]);
            setMessage(`You have crafted:\n\n ${recipe.crafted.name}!`);
            setType("success");
            setShow(true);
            antiSpam = false;
          }
        })
        .catch((error) => {
          const errorMessage = JSON.parse(error.response.request.response);
          setMessage(errorMessage.error);
          setType("error");
          setShow(true);
          antiSpam = false;
        });
    }
  };

  return (
    <>
      <table className="min-w-full divide-y divide-sqyellow table-fixed">
        <thead className="bg-[#0000003b]">
          <tr>
            <th
              scope="col"
              className="py-3.5 pl-1 text-left text-sm font-semibold sm:pl-6"
            >
              Item 1
            </th>
            <th
              scope="col"
              className="py-3.5 pl-1 text-left text-sm font-semibold sm:pl-6"
            >
              Item 2
            </th>
            <th
              scope="col"
              className="py-3.5 pl-1 text-left text-sm font-semibold sm:pl-6"
            >
              Result
            </th>
            <th
              scope="col"
              className="py-3.5 pl-1 text-left text-sm font-semibold sm:pl-6"
            >
              Amount
            </th>
            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
              Craft
            </th>
          </tr>
        </thead>
        {recipesToShow ? (
          recipesToShow.length > 0 ? (
            recipesToShow.map((recipe, index) => (
              <SingleItem
                key={index}
                recipe={recipe}
                index={index}
                handleCraft={handleCraft}
              />
            ))
          ) : (
            <tbody>
              <tr>
                <td
                  colSpan={4}
                  className="py-4 text-center text-white text-sm font-medium"
                >
                  {" "}
                  No recipes available.
                </td>
              </tr>
            </tbody>
          )
        ) : (
          <tbody>
            <tr className="bg-[#0000003d]">
              <td className="flex items-center gap-[15px] whitespace-nowrap py-4 pl-1 pr-3 text-sm font-medium text-white sm:pl-6">
                Loading!
              </td>
              <td />
              <td />
              <td />
            </tr>
          </tbody>
        )}
      </table>
      <div className="ccNavigation">
        <button
          className={`Backward ${currentPage > 1 ? "" : "cursor-not-allowed"}`}
          onClick={() => {
            if (currentPage > 1) {
              const previousPage = currentPage - 1;
              setCurrentPage(previousPage);
            }
          }}
        >
          Back
        </button>

        <div className="PageNumber">{currentPage}</div>

        <button
          className={`Forward ${
            currentPage < numberOfPages ? "" : "cursor-not-allowed"
          }`}
          onClick={() => {
            if (currentPage < numberOfPages) {
              const nextPage = currentPage + 1;
              setCurrentPage(nextPage);
            }
          }}
        >
          Forward
        </button>
      </div>
    </>
  );
}
