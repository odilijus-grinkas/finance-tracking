import CashItems from "./CashItems";
import NewItemButton from "./modalButtons/NewItemButton";
import DeleteGroupButton from "./modalButtons/DeleteGroupButton";

// This component creates and returns groups with items that belonging to each group.
// eslint-disable-next-line react/prop-types
export default function CashGroups({ flowData, setRefetch, cashflow }) {
  // Takes flowData and returns all unique groups
  function itemGroups(objectArray) {
    const groups = [];
    let containsNull = false;
    console.log(objectArray);
    for (let obj of objectArray) {
      let groupName = obj.group_name;
      const groupId = obj.group_id;
      // replace null with ungrouped
      if (groupName == null) {
        groupName = "ungrouped";
        containsNull = true;
      }
      // do not add repeating groups
      if (!groups.some((innerObj) => innerObj.groupName === groupName)) {
        groups.push({ groupName: groupName, groupId: groupId });
      }
    }
    // sort groups alphabetically
    groups.sort((a, b) => {
      return a.groupName.localeCompare(b.groupName);
    });
    // If 'ungrouped' exists, places it at the top of the array.
    if (containsNull) {
      let ungroupedIndex = groups.findIndex(
        (item) => item.groupName === "ungrouped"
      );
      let ungroupedItem = groups.splice(ungroupedIndex, 1)[0];
      groups.unshift(ungroupedItem);
    }
    // move ungrouped to top of the list if it exists
    return groups;
  }

  return (
    <>
      <table className="table table-striped table-dark">
        <tbody>
          {itemGroups(flowData).map((group, index) => {
            let groupName = group.groupName;
            let groupId = group.groupId; // this may be null
            return (
              <tr key={index}>
                <td>
                  <h4>{groupName}</h4>
                  {/* Section for all items that belong to their respective groupName */}
                  <ul className="list-group">
                    <CashItems
                      flowData={flowData}
                      itemGroup={groupName}
                      setRefetch={setRefetch}
                      cashflow={cashflow}
                    />
                  </ul>
                </td>
                {/* ADD ITEM button (for inserting items into the group it's rendered at) */}
                <td>
                  <NewItemButton
                    cashflow={cashflow}
                    setRefetch={setRefetch}
                    userId={sessionStorage.getItem("user")}
                    group={groupName}
                    buttonStyle="groupNewItemButton my-2"
                    buttonIcon="bi bi-plus-lg"
                    buttonTitle="ADD ITEM"
                    groupId={groupId}
                  />
                  {/* Delete group button (does not appear on 'ungrouped' category.) */}
                  {groupName == "ungrouped" ? null : (
                    <DeleteGroupButton
                      cashflow={cashflow}
                      userId={sessionStorage.getItem("user")}
                      groupName={groupName}
                      setRefetch={setRefetch}
                    />
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
