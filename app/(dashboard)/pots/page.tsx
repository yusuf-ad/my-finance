import Header from "@/components/header";
import PotsModal from "@/components/pots-modal";

function PotsPage() {
  return (
    <>
      <Header title="Pots">
        <PotsModal />
      </Header>

      <section>
        <p className="text-gray-400 font-bold mt-8">
          You don&apos;t have a pot account yet.
        </p>
      </section>
    </>
  );
}

export default PotsPage;
