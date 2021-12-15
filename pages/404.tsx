import Link from "next/link";

export default function Custom404() {
  return (
    <main>
      <h1>404 - That page does not seem to exist...</h1>
      <iframe
        src="https://giphy.com/embed/zExQgiifA69oTnoRPR"
        width="550"
        height="362"
        frameBorder="0"
        allowFullScreen
      ></iframe>
      <Link href="/">
        <button className="btn-blue">Find something to READNEXT</button>
      </Link>
    </main>
  );
}
