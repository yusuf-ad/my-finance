import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

function PotsPage() {
  return (
    <>
      <header className="flex justify-between">
        <h1 className="text-gray-900 text-4xl font-bold">Pots</h1>

        <Button className="text-white py-6 font-bold">
          <Plus />
          Add New Pot
        </Button>
      </header>

      <section>
        <p className="text-gray-400 font-bold mt-8">
          You don&apos;t have a pot account yet.
        </p>
      </section>
    </>
  );
}

export default PotsPage;
