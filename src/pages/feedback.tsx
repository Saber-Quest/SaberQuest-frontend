import React, { useState, Fragment, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import Header from "@comp/Meta/Title";
import { SessionUser } from "@lib/types";

const team = [
  { id: 1, name: "General" },
  { id: 2, name: "Frontend" },
  { id: 3, name: "Backend" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function StorePage({
  session,
  setMessage,
  setType,
  setShow,
}: {
  session: SessionUser;
  setMessage: (message: string) => void;
  setType: (type: string) => void;
  setShow: (show: boolean) => void;
}) {
  const [selected, setSelected] = useState(team[0]);

  const onClickHandler = async (text: any) => {
    const message = document.getElementById("message") as HTMLInputElement;

    await axios
      .post(
        `${process.env.PUBLIC_URL}/api/feedback`,
        {
          userinfo: session.user?.userInfo,
          message: message.value,
          type: selected.name,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      )
      .then((res) => {
        message.value = "";
        setMessage("Feedback sent!\n**Thank you!**");
        setType("success");
        setShow(true);
      })
      .catch((error) => {
        setMessage(error.response.data.error);
        setType("error");
        setShow(true);
      });
  };

  return (
    <>
      <Header
        title={`Feedback`}
        link={`${process.env.PUBLIC_URL}/feedback`}
        contents={`Provide feedback to the Dev-team.`}
        image={`${process.env.PUBLIC_URL}/assets/images/Logo.png`}
      />
      <div className="allDiv flex flex-col items-center justify-center px-16 pt-10 drop-shadow-navBarShadow select-none transition-all duration-100 ease-in-out">
        <div className="LeaderboardContainer min-w-[1000px]">
          <div className="LeaderboardList">
            <h1 className="px-4 sm:px-6 lg:px-8 md:chTextHeader text-[28px] mb-5">
              <span className="text-sqyellow">Feedback</span>
            </h1>
            <div className="isolate px-6 lg:px-8 mx-auto max-w-xl">
              <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <div className="relative mt-2.5">
                    <Listbox value={selected} onChange={setSelected}>
                      {({ open }) => (
                        <>
                          <div className="block text-sm font-medium leading-6 text-white">
                            Type
                          </div>
                          <div className="relative mt-2 w-[150px]">
                            <Listbox.Button className="relative w-full cursor-default rounded-md bg-[#131313e5] py-1.5 pl-3 pr-10 text-left text-white shadow-sm ring-0 sm:text-sm sm:leading-6">
                              <span className="block truncate">
                                {selected.name}
                              </span>
                              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronUpDownIcon
                                  className="h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                />
                              </span>
                            </Listbox.Button>

                            <Transition
                              show={open}
                              as={Fragment}
                              leave="transition ease-in duration-100"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            >
                              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-[#131313e5] py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {team.map((person) => (
                                  <Listbox.Option
                                    key={person.id}
                                    className={({ active }) =>
                                      classNames(
                                        active
                                          ? "bg-sqyellow text-black"
                                          : "text-white",
                                        "relative cursor-default select-none py-2 pl-3 pr-9",
                                      )
                                    }
                                    value={person}
                                  >
                                    {({ selected, active }) => (
                                      <>
                                        <span
                                          className={classNames(
                                            selected
                                              ? "font-semibold"
                                              : "font-normal",
                                            "block truncate",
                                          )}
                                        >
                                          {person.name}
                                        </span>

                                        {selected ? (
                                          <span
                                            className={classNames(
                                              active
                                                ? "text-black"
                                                : "text-white",
                                              "absolute inset-y-0 right-0 flex items-center pr-4",
                                            )}
                                          >
                                            <CheckIcon
                                              className="h-5 w-5"
                                              aria-hidden="true"
                                            />
                                          </span>
                                        ) : null}
                                      </>
                                    )}
                                  </Listbox.Option>
                                ))}
                              </Listbox.Options>
                            </Transition>
                          </div>
                        </>
                      )}
                    </Listbox>
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Message
                  </label>
                  <div className="mt-2.5">
                    <textarea
                      name="message"
                      id="message"
                      rows={4}
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sqyellow sm:text-sm sm:leading-6"
                      defaultValue={""}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-10">
                <div
                  onClick={onClickHandler}
                  className="block w-full rounded-md bg-sqyellowfaint px-3.5 py-2.5 text-center text-sm font-semibold text-sqyellow shadow-sm hover:cursor-pointer hover:bg-sqyellow hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sqyellow transition-all duration-100 ease-in-out"
                >
                  Send feedback!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
