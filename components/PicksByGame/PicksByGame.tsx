import useWeekSelect from "../../lib/useWeekSelect";
import Spacer from "../Spacer";

export default function PicksByGame() {
  const { weekSelector, selectedWeek, loading, error } = useWeekSelect();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  if (!selectedWeek) {
    return null;
  }
  return (
    <>
      <Spacer size={45} />
      {weekSelector}
    </>
  );
}
