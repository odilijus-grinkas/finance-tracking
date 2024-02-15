import CashItems from "./CashItems";
import NewItemButton from "./modalButtons/NewItemButton";
import DeleteGroupButton from "./modalButtons/DeleteGroupButton";

// This component creates and returns groups with items that belonging to each group.
// eslint-disable-next-line react/prop-types
export default function CashGroups({ flowData, setRefetch, cashflow }) {
  // Takes flowData and returns all unique groups
  function itemGroups(array) {
    const groups = [];
    let index = 1;
    for (let obj of array) {
      // do not add repeating groups
      if (!groups.some((innerArr) => innerArr.includes(obj.item_group))) {
        groups.push([index, obj.item_group]);
        index++;
      }
    }
    return groups;
  }

  const groups = itemGroups(flowData);

  return (
    <>
      <table className="table table-striped table-dark">
        <tbody>
          {groups.map((e) => {
            let groupId = e[0];
            let groupName = e[1];
            return (
              <tr key={groupId}>
                <td>
                  <h4>{groupName}</h4>
                  <ul className="list-group">
                    <CashItems flowData={flowData} itemGroup={groupName} setRefetch={setRefetch} cashflow={cashflow} />
                  </ul>
                </td>
                {/* <td><NewItem groupName={groupName} refetchData={refetchData}/></td> */}
                <td>
                  <NewItemButton
                    cashflow={cashflow}
                    setRefetch={setRefetch}
                    userId={sessionStorage.getItem("user")}
                    group={groupName}
                    buttonStyle="groupNewItemButton my-2"
                    buttonIcon="bi bi-plus-lg"
                    buttonTitle="ADD ITEM"
                  />
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
