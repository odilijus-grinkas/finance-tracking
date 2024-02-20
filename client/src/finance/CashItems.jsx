import ItemPage from "./modalButtons/ItemPage";
// eslint-disable-next-line react/prop-types
export default function CashItems({ flowData, itemGroup, setRefetch={setRefetch}, cashflow}) {
  // takes all items that belong to specified group
  function itemsOfOneGroup(flowData, group) {
    // If the group is "ungrouped" - treat it as null instead to place items without a group in the same ungrouped category.
    (group == 'ungrouped') ? group = null : null
    console.log(group);
    const items = [];
    for (let obj of flowData) {
      if (obj.group_name == group) {
        items.push(obj);
      }
    }
    return items;
  }
    
  return (
    <>
      {itemsOfOneGroup(flowData, itemGroup).map((item, index) => {
        return (
          <li key={index}>
            <ItemPage itemData={item} setRefetch={setRefetch} />- € <span className={(cashflow == "income") ? "text-success" : "text-danger"}> {item.amount}</span>
          </li>
        );
        // return <li key={item.id}>{item.name} - €{item.amount}</li>
      })}
    </>
  );
}
