import { Button } from "@/components/ui/button";
import Link from "next/link";

export const runtime = "edge"; // 'nodejs' is the default
export const preferredRegion = "fra1"; // only execute this function on fra1

const NotFound = () => {
  return (
    <div className="h-screen flex flex-row items-center">
      <div className="flex flex-1 flex-col items-center h-52 place-content-evenly">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Not Found
        </h2>
        <p>Could not find requested resource</p>
        <Link href="/">
          <Button>Return Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
