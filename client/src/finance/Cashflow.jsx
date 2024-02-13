import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import CashGroups from "./CashGroups";

export default function Cashflow() {
  // Take flow parameter from URL that contains income or expense
  const { flow } = useParams("flow");
  const [flowData, setFlowData] = useState();
  const [refetch, setRefetch] = useState(0);

  const navigate = useNavigate();

  // expects "income" or "expense"
  const fetchData = async function (cashflow) {
    try {
      const userId = sessionStorage.getItem("user");
      const response = await fetch(`http://localhost:3001/${cashflow}/${userId}`);
      const parsed = await response.json();
      // triggered if cashflow part in URL is unrelated.
      if (!response.ok) {
        navigate("/404");
      } else {
        return parsed;
      }
    } catch (err) {
      console.log("Could not fetch, has the server started?");
    }
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flow, refetch]);

  // eslint-disable-next-line no-extra-boolean-cast
  return Boolean(flowData) ? (
    <div>
      <div>Date i.e 2024-02</div>
      <CashGroups flowData={flowData} refetchData={setRefetch} />
    </div>
  ) : (
    <div className="text-center">
      <div className="spinner-border"></div>
    </div>
  );
}
