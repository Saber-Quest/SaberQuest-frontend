import React, { Fragment, useEffect } from "react";
import { Transition } from "@headlessui/react";
import {
  CheckCircleIcon,
  XCircleIcon,
  InformationCircleIcon,
  XMarkIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import ReactMarkdown from "react-markdown";

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
      <div aria-live="assertive" className="notifOuterDiv">
        <div className="transfDiv">
          <Transition
            show={dataArray.show}
            as={Fragment}
            enter="transf enter"
            enterFrom="transf enterFrom"
            enterTo="transf enterTo"
            leave="transf leave"
            leaveFrom="transf leaveFrom"
            leaveTo="transf leaveTo"
          >
            <div className="notifInnerDiv">
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    {dataArray.type === "success" ? (
                      <CheckCircleIcon
                        className="icon success"
                        aria-hidden="true"
                      />
                    ) : dataArray.type === "error" ? (
                      <XCircleIcon className="icon error" aria-hidden="true" />
                    ) : dataArray.type === "warning" ? (
                      <ExclamationTriangleIcon
                        className="icon warning"
                        aria-hidden="true"
                      />
                    ) : (
                      <InformationCircleIcon
                        className="icon info"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                  <div className="notifTextDiv">
                    <span className="notifTextP">
                      <ReactMarkdown>{dataArray.message}</ReactMarkdown>
                    </span>
                  </div>
                  <div className="notifCloseBtnDiv">
                    <button
                      type="button"
                      className="notifCloseBtn"
                      onClick={() => {
                        setShow(false);
                      }}
                    >
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
