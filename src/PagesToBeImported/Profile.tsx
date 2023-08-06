import Header from "@comps/Meta/Header";

export default function Profile() {
  return (
    <>
      <Header
        page="Frontpage"
        description="SaberQuest is a service that provides daily Beat Saber challenges that you can participate in. Craft and buy items with your points and compete on the leaderboards."
      />
      <div>
        <h1 className="text-white">This is written in Profile.tsx</h1>
      </div>
    </>
  );
}