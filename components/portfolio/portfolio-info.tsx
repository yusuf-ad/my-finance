import Link from "next/link";
import { Github, Linkedin } from "lucide-react";

export function PortfolioInfo() {
  return (
    <div className="mt-8 p-6 bg-orange-100 rounded-lg text-center w-full">
      <p className="font-semibold text-gray-600 mb-4">
        This is a portfolio project by{" "}
        <Link
          href="https://github.com/yusuf-ad"
          className="text-blue-500 hover:underline"
        >
          Yusuf Ad
        </Link>
      </p>
      <div className="flex justify-center space-x-4">
        <Link
          target="_blank"
          href="https://github.com/yusuf-ad"
          className="flex items-center text-white hover:text-gray-200 bg-black font-semibold py-3 px-4 rounded-lg"
        >
          <Github className="w-5 h-5 mr-1" />
          <span className="text-sm">GitHub</span>
        </Link>
        <Link
          target="_blank"
          href="https://www.linkedin.com/in/yusuf-ad-05101829a/"
          className="flex items-center text-white hover:text-gray-200 bg-blue-700 font-semibold py-3 px-4 rounded-lg"
        >
          <Linkedin className="w-5 h-5 mr-1" />
          <span className="text-sm">LinkedIn</span>
        </Link>
      </div>
    </div>
  );
}
