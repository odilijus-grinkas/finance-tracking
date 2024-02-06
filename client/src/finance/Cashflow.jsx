import { useEffect, useState } from "react";
export default function Cashflow(){
  const [data, setData] = useState();
  useEffect(() => { // make this a separate reusable function??
    async function fetchData() {
      const response = await fetch("http://localhost:3001/items");
      const parsed = await response.json()
      console.log("HI----------")
      setData(parsed.data[0].name)
    }
    fetchData();
  }, []); // [] if effect doesn't need props or state?????
  console.log(data)
  return(
    <div>
      <div>Date i.e 2024-02</div>
      <table>
        <thead><th>Income | Expense</th></thead>
        <tbody>
           {/* Add data here? somewhere else? */}
        </tbody>
      </table>
      {data}
    </div>
  );
}