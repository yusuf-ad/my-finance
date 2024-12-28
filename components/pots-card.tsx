import { Plus } from "lucide-react";
import { Dots } from "./icons";
import { Button } from "./ui/button";
import { Pot } from "@/server/actions/pots";
import { parseTheme } from "@/lib/utils";

function PotsCard({ pot }: { pot: Pot }) {
  const { code, color } = parseTheme(pot.theme);

  return (
    <li className=" bg-white p-6 rounded-lg shadow-sm flex-1">
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-3 items-center">
          <div
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: code }}
          ></div>
          <h3 className="text-gray-900 font-semibold">{pot.name} </h3>
        </div>
        <Dots className="h-5 w-5 text-gray-500" />
      </div>

      <div className="space-y-4 my-8">
        <div className="flex justify-between items-center">
          <h4 className="font-semibold text-gray-700">Total Saved</h4>

          <span className="text-3xl tracking-wide font-bold text-gray-900">
            ${pot.totalSaved.toFixed(2)}
          </span>
        </div>

        <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
          <div
            className="h-2.5 rounded-l-full transition-all duration-500"
            style={{
              width: `10%`,
              backgroundColor: `red`,
            }}
          ></div>
        </div>

        <div className="flex justify-between text-sm">
          <p className="text-gray-600">91.67% saved</p>
          <p className="text-gray-600">Target of ${pot.target}</p>
        </div>
      </div>

      <div className="flex gap-4">
        <Button className="flex-1 py-6 font-bold bg-lightBeige text-gray-900 hover:bg-white  border-2 border-transparent hover:border-black">
          <Plus /> Add Money
        </Button>

        <Button className="flex-1 py-6 font-bold bg-lightBeige text-gray-900 hover:bg-white  border-2 border-transparent hover:border-black">
          Withdraw
        </Button>
      </div>
    </li>
  );
}

export default PotsCard;
