import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-svh">
      <h1 className="text-4xl font-semibold">Sweet Confession 💌</h1>
      <p className="text-lg font-medium mt-4">
        Share your sweet confessions with your special someone.
      </p>
    </div>
  );
}
