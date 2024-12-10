import PotsModal from "@/components/pots-modal";

function PotsPage() {
  return (
    <>
      <header className="flex justify-between">
        <h1 className="text-gray-900 text-4xl font-bold">Pots</h1>

        <PotsModal />
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
