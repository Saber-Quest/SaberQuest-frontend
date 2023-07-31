import { Helmet } from "react-helmet";

export default function Header({
  page,
  description,
}: {
  page: string;
  description: string;
}) {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <title>SaberQuest • {page}</title>
      <meta name="description" content={description} />
      <meta name="theme-color" content="#000000" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta content="SaberQuest" property="og:title" />
      <meta
        content="SaberQuest is a service that provides daily Beat Saber challenges that you can participate in. Craft and buy items with your points and compete on the leaderboards."
        property="og:description"
      />
      <meta
        content="https://cdn.discordapp.com/attachments/830384076703793162/1071811817027944530/icon.png"
        property="og:image"
      />
    </Helmet>
  );
}
