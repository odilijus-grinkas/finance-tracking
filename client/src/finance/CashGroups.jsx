import CashItems from "./CashItems";
import NewItem from "./NewItem";

// This component creates and returns groups with items belonging to each group.
// eslint-disable-next-line react/prop-types
export default function CashGroups({flowData, refetchData}){

  // Takes flowData and returns all unique groups
  function itemGroups(array) {
    const groups = [];
    let index = 1;
    for (let obj of array) {
      // do not add repeating groups
      if (!groups.some(innerArr => innerArr.includes(obj.item_group))){
        groups.push([index, obj.item_group]);
        index++;
      }
    }
    return groups;
  }
  
  const groups = itemGroups(flowData);

  return(
    <>
      <table className="table table-striped table-dark">
        <tbody>
          {groups.map((e)=>{
              let groupId = e[0];
              let groupName = e[1];
              return (
              <tr key={groupId}>
                <td>
                <h4>{groupName}</h4>
                  <ul>
                    <CashItems flowData={flowData} itemGroup={groupName}/>
                  </ul>
                </td>
                <td><NewItem groupName={groupName} refetchData={refetchData}/></td>
                <td>Delete Group</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}