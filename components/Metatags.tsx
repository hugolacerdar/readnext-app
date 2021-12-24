import Head from "next/head";

interface MetatagsProps {
  title: string;
  description: string;
  image: string;
}

export default function Metatags({ title, description, image }: MetatagsProps) {
  return (
    <Head>
      <title>{title} | READNEXT</title>
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@hugolacerdar" />
      <meta name="twitter:title" content={`${title} | READNEXT`} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="./public/readme/feed.png" />
      <meta property="og:title" content={`${title} | READNEXT`} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content="./public/readme/feed.png" />
    </Head>
  );
}
