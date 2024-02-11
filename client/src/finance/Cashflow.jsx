import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import CashGroup from "./CashGroups";

export default function Cashflow() {
  // Take flow parameter from URL that contains income or expense
  const { flow } = useParams("flow");
  const [flowData, setFlowData] = useState();

  // expects "income" or "expense"
  const fetchData = async (cashflow) => {
    const response = await fetch("http://localhost:3001/" + cashflow);
    const parsed = await response.json();
    return parsed;
  };

  useEffect(() => {
    // resetting flowData, so old data isn't reused
    setFlowData(undefined);
    // Fetching and setting data to flowData variable
    async function fetchAndSetData() {
      let fetchedData = await fetchData(flow);
      setFlowData(fetchedData);
    }
    fetchAndSetData();
    // useEffect re-runs each time the URL parameter "flow" changes
  }, [flow]);

  // eslint-disable-next-line no-extra-boolean-cast
  return Boolean(flowData) ? (
    <div>
      <div>Date i.e 2024-02</div>
      <CashGroup flowData={flowData}/>
    </div>
  ) : (
    <div className="text-center">
      <div className="spinner-border"></div>
    </div>
  );
}
