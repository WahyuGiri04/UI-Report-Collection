import Image from "next/image";

export function LoadingPage() {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs  bg-opacity-10"
      style={{ WebkitBackdropFilter: "blur(8px)" }}
    >
      <div className="flex flex-col items-center justify-center bg-transparent">
        {/* <img src="/loading.gif" alt="Loading..." className="h-full w-full" /> */}
        <Image
          src="/loading.gif"
          alt="Loading..."
          width={100} // sesuaikan ukuran asli gambar loading
          height={100} // sesuaikan juga tinggi
          className="h-full w-full"
          unoptimized
        />
        <span className="text-gray-700">Loading...</span>
      </div>
    </div>
  );
}
