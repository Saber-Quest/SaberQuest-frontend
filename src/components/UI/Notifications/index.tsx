import { Fragment, useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import {
  CheckCircleIcon,
  XCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/20/solid";

interface NotificationData {
  show: boolean;
  message: string;
  type: string;
  timer: number;
}

interface NotificationProps {
  dataArray: NotificationData;
  setMessage: (message: string) => void;
  setType: (type: string) => void;
  setShow: (show: boolean) => void;
  setTimer: (timer: number) => void;
}

export function Notification({
  dataArray,
  setMessage,
  setType,
  setShow,
  setTimer,
}: NotificationProps) {
  useEffect(() => {
    if (dataArray.show) {
      setTimeout(() => {
        setShow(false);
      }, dataArray.timer);
    }
  }, [dataArray.show, dataArray.timer, setShow]);

  return (
    <>
      <div
        aria-live="assertive"
        className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6 z-[10000]"
      >
        <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
          <Transition
            show={dataArray.show}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-[#141414ef] shadow-lg ring-2 ring-sqyellow ring-opacity-5">
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    {dataArray.type === "success" ? (
                      <CheckCircleIcon
                        className="h-6 w-6 text-green-400"
                        aria-hidden="true"
                      />
                    ) : dataArray.type === "error" ? (
                      <XCircleIcon
                        className="h-6 w-6 text-red-400"
                        aria-hidden="true"
                      />
                    ) : dataArray.type === "warning" ? (
                      <InformationCircleIcon
                        className="h-6 w-6 text-yellow-400"
                        aria-hidden="true"
                      />
                    ) : (
                      <InformationCircleIcon
                        className="h-6 w-6 text-blue-400"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="text-sm font-medium text-white whitespace-pre-line">
                      {dataArray.message}
                    </p>
                  </div>
                  <div className="ml-4 flex flex-shrink-0">
                    <button
                      type="button"
                      className="inline-flex rounded-md bg-[#141414f6] text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={() => {
                        setShow(false);
                      }}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  );
}
