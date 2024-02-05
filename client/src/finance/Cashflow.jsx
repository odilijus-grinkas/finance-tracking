import { useEffect, useState } from "react";
export default function Cashflow(){
  // const [data, setData] = useState();
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:3001/items");
      const parsed = await response.json()
      console.log("HI----------")
      console.log(parsed)
    }
    fetchData();
  }, []); // [] if effect doesn't need props or state
  return(
    <div>
      <div>Date i.e 2024-02</div>
      THE EXPENSE OR INCOME: 
    </div>
  );
}