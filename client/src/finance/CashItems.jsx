import ItemPage from "./modalButtons/ItemPage";
// eslint-disable-next-line react/prop-types
export default function CashItems({ flowData, itemGroup, setRefetch={setRefetch}, cashflow}) {
  // takes all items that belong to specified group
  function itemsOfOneGroup(flowData, group) {
    const items = [];
    for (let obj of flowData) {
      if (obj.item_group == group) {
        items.push(obj);
      }
    }
    return items;
  }
  const items = itemsOfOneGroup(flowData, itemGroup);
  return (
    <>
      {items.map((item) => {
        return (
          <li key={item.id}>
            <ItemPage itemData={item} setRefetch={setRefetch} />- € <span className={(cashflow == "income") ? "text-success" : "text-danger"}> {item.amount}</span>
          </li>
        );
        // return <li key={item.id}>{item.name} - €{item.amount}</li>
      })}
    </>
  );
}
