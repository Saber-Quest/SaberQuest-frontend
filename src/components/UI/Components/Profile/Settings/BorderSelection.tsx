import { useState, useEffect } from "react";
import Image from "next/image";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Combobox } from "@headlessui/react";
import { Border } from "@lib/types";
import { borders } from "@lib/data/borders";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function BorderDropdown({
  borderSelected,
  onSelectBorder,
}: {
  borderSelected: Border;
  onSelectBorder: (border: Border) => void;
}) {
  const [query, setQuery] = useState("");
  const [selectedBorder, setSelectedBorder] = useState<Border>(borderSelected);

  useEffect(() => {
    setSelectedBorder(borderSelected);
  }, [borderSelected]);

  const filteredBorders =
    query === ""
      ? borders
      : borders.filter((border) => {
          return border.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox
      as="div"
      value={selectedBorder}
      onChange={(border) => {
        setSelectedBorder(border);
        onSelectBorder(border);
      }}
    >
      <Combobox.Label className="block text-sm font-medium leading-6 text-white">
        Border
      </Combobox.Label>
      <div className="relative mt-2 w-[400px]">
        <Combobox.Button className="w-full flex items-center">
          <Combobox.Input
            className="w-full rounded-l-md border-0 bg-[#131313e5] py-1.5 pl-3 pr-12 text-white shadow-sm ring-1 ring-inset ring-[#0000003b] focus:ring-2 focus:ring-inset focus:ring-sqyellow sm:text-sm sm:leading-6"
            onChange={(event) => setQuery(event.target.value)}
            displayValue={(border: Border) => border?.name}
          />
          <div className="relative h-[36px] bg-[#131313e5] flex items-center rounded-r-md px-2 focus:outline-none">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </div>
        </Combobox.Button>

        {filteredBorders.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-[#131313e5] py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredBorders.map((border: Border) => (
              <Combobox.Option
                key={border.id}
                value={border}
                className={({ active }) =>
                  classNames(
                    "relative cursor-default select-none py-2 pl-3 pr-9",
                    active ? "bg-sqyellowfaint text-white" : "text-white"
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <div className="flex items-center">
                      {border.patreon && (
                        <Image
                          src="/assets/images/Patreon.svg"
                          alt="Patreon"
                          width={16}
                          height={16}
                          className="relative top-[0px] mr-2"
                        />
                      )}
                      {border.id === 0 ? (
                        ""
                      ) : (
                        <Image
                          src={`/assets/images/users/borders/${border.imageUrl}`}
                          alt={border.name}
                          className="h-6 w-6 flex-shrink-0 rounded-full"
                          height={24}
                          width={24}
                        />
                      )}
                      <span
                        className={classNames(
                          "ml-3 truncate",
                          selected && "font-semibold"
                        )}
                      >
                        {border.name}{" "}
                        <span className="text-[10px] uppercase">
                          {border.type}
                        </span>
                      </span>
                    </div>

                    {selected && (
                      <span
                        className={classNames(
                          "absolute inset-y-0 right-0 flex items-center pr-4",
                          active ? "text-white" : "text-sqyellow"
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  );
}
