import Link from "next/link";

export default function Index() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        margin: 10,
        padding: 3,
        alignSelf: "center",
        gap: 20,
      }}
    >
      <div>
        <Link href="/upload">
          <a>Upload</a>
        </Link>
      </div>
      <div>
        <Link href="/graph">
          <a>View Graph</a>
        </Link>
      </div>
    </div>
  );
}
