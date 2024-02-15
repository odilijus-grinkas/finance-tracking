import "../../styles/buttons.css"
// Removes group and places items that belong to it in "ungrouped"
// eslint-disable-next-line react/prop-types
export default function DeleteGroupButton({ groupName, userId, cashflow, setRefetch }) {
  async function handleClick() {
    if (
      window.confirm(
        "Do you really want to delete this group? It will leave its items ungrouped."
      )
    ) {
      try {
        const response = await fetch("http://localhost:3001/group", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({groupName: groupName, cashflow: cashflow, userId: userId}),
        });
        if (response.ok){
          setRefetch(tick => tick+1)
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  return <button onClick={handleClick} className="deleteGroupButton"><i className="bi bi-trash3"></i>Delete Group</button>;
}
