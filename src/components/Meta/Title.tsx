import Head from "next/head";

export default function Header({
  title,
  image,
  link,
  contents,
}: {
  title: string;
  image: any;
  link: string;
  contents: string;
}) {
  return (
    <>
      <Head>
        <title key="title">{`${process.env.PUBLIC_NAME} - ${title}`}</title>
        <link rel="icon" href="/Logo.svg" />
      </Head>
      {/* Open Graph */}
      <meta name="theme-color" content="#ffa600" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={contents} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={link} />
      <meta property="og:site_name" content={process.env.PUBLIC_NAME} />
      <meta property="og:type" content="website" />
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={contents} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:url" content={link} />
    </>
  );
}
