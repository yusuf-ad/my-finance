import Header from "@/components/header";
import PotsCard from "@/components/pots/pots-card";
import PotsModal from "@/components/pots/pots-modal";
import { getPots } from "@/server/actions/pots";

async function PotsPage() {
  const res = await getPots();

  if (!res.success) {
    return <p>{res.message}</p>;
  }

  const { pots } = res;

  return (
    <div className="pb-28 lg:pb-10">
      <Header title="Pots">
        <PotsModal selectedThemes={pots.map((pot) => pot.theme)} />
      </Header>

      <section className="my-8">
        {pots.length === 0 ? (
          <p className="text-gray-400 font-bold mt-8">
            You haven&apos;t created a pot yet.
          </p>
        ) : (
          <ul className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {pots.map((pot) => (
              <PotsCard key={pot.id} pot={pot} />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default PotsPage;
