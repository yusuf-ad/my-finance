import { JarLight } from "@/components/icons";
import { parseTheme } from "@/lib/utils";
import { getPots } from "@/server/actions/pots";

export default async function PotsContent() {
  const res = await getPots();

  if (!res.success) {
    return <p className="text-gray-400 text-sm font-bold">{res.message}</p>;
  }

  if (res.pots.length === 0) {
    return <p className="text-gray-400 text-sm font-bold">No data provided</p>;
  }

  return (
    <div className="flex gap-4">
      <div className="bg-lightBeige w-1/2 px-4 py-4 flex items-center gap-4 rounded-xl shadow-sm">
        <JarLight />
        <div>
          <h4 className="text-sm text-gray-500 mb-3">Pots</h4>
          <p className="text-3xl font-bold text-gray-900">$0</p>
        </div>
      </div>

      <ul className="grid grid-cols-2 gap-4 flex-grow">
        {res.pots.map((pot) => (
          <li key={pot.id} className="flex items-center gap-4 col-span-1">
            <div
              className="w-1 h-10"
              style={{ backgroundColor: parseTheme(pot.theme).code }}
            ></div>
            <div className="flex flex-col font-semibold text-xs gap-1 items-start">
              <span className="text-gray-600">{pot.name}</span>
              <span className="font-bold">${pot.totalSaved.toFixed(2)}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
