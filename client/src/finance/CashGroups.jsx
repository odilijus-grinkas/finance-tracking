import CashItems from "./CashItems";
import NewItemButton from "./modalButtons/NewItemButton";
import DeleteGroupButton from "./modalButtons/DeleteGroupButton";

// This component creates and returns groups with items that belonging to each group.
// eslint-disable-next-line react/prop-types
export default function CashGroups({ flowData, setRefetch, cashflow }) {
  // Takes flowData and returns all unique groups
  function itemGroups(objectArray) {
    console.log(objectArray);
    const groups = [];
    for (let obj of objectArray) {
      let groupName = obj.group_name;
      // replace null with ungrouped
      (groupName == null) ? groupName = "ungrouped" : null;
      // do not add repeating groups
      if (!groups.some((innerArr) => innerArr.includes(groupName))) {
        groups.push(groupName);
      }
    }
    groups.sort();
    // move ungrouped to top of the list if it exists
    if(groups.includes("ungrouped")){
      const newGroups = ["ungrouped"];
      for (let e of groups){
        (e!="ungrouped") ? newGroups.push(e) : null;
      }
      return newGroups;
    } else {
    return groups;
    }
  }

  return (
    <>
      <table className="table table-striped table-dark">
        <tbody>
          {itemGroups(flowData).map((elem, index) => {
            let groupName = elem;
            let groupId = index;
            return (
              <tr key={groupId}>
                <td>
                  <h4>{groupName}</h4>
                  <ul className="list-group">
                    <CashItems flowData={flowData} itemGroup={groupName} setRefetch={setRefetch} cashflow={cashflow} />
                  </ul>
                </td>
                {/* Section that renders each item that belongs to its respected groupName */}
                <td>
                  {/* <NewItemButton
                    cashflow={cashflow}
                    setRefetch={setRefetch}
                    userId={sessionStorage.getItem("user")}
                    group={groupName}
                    buttonStyle="groupNewItemButton my-2"
                    buttonIcon="bi bi-plus-lg"
                    buttonTitle="ADD ITEM"
                  /> */}
                {(groupName == "ungrouped") ? null : 
                <DeleteGroupButton cashflow={cashflow} userId={sessionStorage.getItem("user")} groupName={groupName} setRefetch={setRefetch}/>
                }
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
