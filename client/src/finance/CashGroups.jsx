import CashItems from "./CashItems";
import {Link} from "react-router-dom";
// This component creates and returns groups with items belonging to each group.
// eslint-disable-next-line react/prop-types
export default function CashGroup({flowData}){

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
              return (
              <tr key={e[0]}>
                <td>
                <h4>{e[1]}</h4>
                  <ul>
                    <CashItems flowData={flowData} itemGroup={e[1]}/>
                  </ul>
                </td>
                <td><Link to="#">Add New Item</Link></td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}