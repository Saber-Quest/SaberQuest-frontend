import { useEffect, useState } from "react";
import { AdvancedUser, SessionUser } from "@lib/types";
import CraftingPanel from "@ui/Profile/Crafting/CraftingPanel";
import Header from "@comp/Meta/Title";

export default function CraftingPage({
  session,
  setSession,
  setMessage,
  setType,
  setShow,
}: {
  session: SessionUser;
  notFound: boolean;
  setSession: (session: SessionUser) => void;
  setMessage: (message: string) => void;
  setType: (type: string) => void;
  setShow: (show: boolean) => void;
}) {
  const [userData, setUser] = useState<AdvancedUser | null>(null);

  useEffect(() => {
    if (session && session.user) {
      setUser(session.user);
    }
  }, [session]);

  return (
    <>
      <Header
        title={`Crafting-page`}
        link={`/profile/crafting`}
        contents={`The crafting-page on ${process.env.PUBLIC_NAME}.`}
        image={`${process.env.PUBLIC_URL}/assets/images/Logo.png`}
      />
      <div className="flex flex-col items-center justify-center w-full h-full">
        {session && userData && (
          <CraftingPanel
            session={session}
            inventory={userData.inventory}
            setSession={setSession}
            setMessage={setMessage}
            setType={setType}
            setShow={setShow}
          />
        )}
      </div>
    </>
  );
}
