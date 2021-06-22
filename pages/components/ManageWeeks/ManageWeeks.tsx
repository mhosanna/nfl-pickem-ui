import AddNewTile from "../AddNewTile";

function handleCreateWeek() {
  console.log("Handle Create");
}

export default function ManageWeeks() {
  return (
    <AddNewTile label="Add New Week" icon="Plus" onClick={handleCreateWeek} />
  );
}
