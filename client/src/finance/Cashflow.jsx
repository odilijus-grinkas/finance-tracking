import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Balance from "./balance/Balance";
import NewItemButton from "./modalButtons/NewItemButton";
import SortByDateButton from "./modalButtons/SortByDateButton";
import "../styles/buttons.css"

import CashGroups from "./CashGroups";
// Generates table of income/expense as well as buttons to interact with them.
export default function Cashflow() {
  // Take flow parameter from URL that contains income or expense
  const { flow, from, to } = useParams();
  const [flowData, setFlowData] = useState();
  const [refetch, setRefetch] = useState(0);

  const navigate = useNavigate();

  // expects "income" or "expense"
  async function fetchData(cashflow, date = "") {
    try {
      const userId = sessionStorage.getItem("user");
      const response = await fetch(
        `http://localhost:3001/${cashflow}/${userId}/${date}`
      );
      // triggered if cashflow part in URL is unrelated.
      if (!response.ok) {
        navigate("/404");
      } else {
        const parsed = await response.json();
        return parsed;
      }
    } catch (err) {
      console.log("Could not fetch, has the server started?");
      navigate("/");
    }
  }

  useEffect(() => {
    // resetting flowData, so old data isn't reused
    setFlowData(undefined);
    // Fetching and setting data to flowData variable
    async function fetchAndSetData() {
      let fetchedData = await fetchData(flow, from ? `${from}/${to}` : "");
      setFlowData(fetchedData);
    }
    fetchAndSetData();
    // useEffect re-runs each time the URL parameter "flow" changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flow, refetch, from, to]);

  // eslint-disable-next-line no-extra-boolean-cast
  return Boolean(flowData) ? (
    <>
    {/* Add new item & sort by date uttons */}
      <div className="d-flex justify-content-between right-panel-options">
        <NewItemButton
          cashflow={flow}
          userId={sessionStorage.getItem("user")}
          setRefetch={setRefetch}
          buttonStyle="rightPanelNewItemButton"
          buttonIcon="bi bi-currency-exchange"
          buttonTitle="New"
        />
        {from && to ? (
          <Link to={`/cash/${flow}`} className="sortByDateButton"><i className="bi bi-x-lg"></i> Clear</Link>
        ) : flow ? (
          <SortByDateButton
            flowParam={flow}
            userId={sessionStorage.getItem("user")}
          />
        ) : null}

        {/* <SortByDateButton flowParam={flow} userId={sessionStorage.getItem("user")}/> */}
      </div>
      <div className="right-panel-cashflow">
        <CashGroups
          flowData={flowData}
          setRefetch={setRefetch}
          cashflow={flow}
        />
      </div>
      <Balance userId={sessionStorage.getItem("user")} refresh={refetch}/>
    </>
  ) : (
    <div className="text-center">
      <div className="spinner-border"></div>
    </div>
  );
}
