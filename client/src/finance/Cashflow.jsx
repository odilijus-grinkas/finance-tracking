import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Balance from "./balance/Balance";
import NewItemButton from "./modalButtons/NewItemButton";
import SortByDateButton from "./modalButtons/SortByDateButton";
import "../styles/buttons.css";

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
      // If from/to url is specified, fetches according to date range.
      let fetchedData = await fetchData(flow, from ? `${from}/${to}` : "");
      setFlowData(fetchedData);
    }
    fetchAndSetData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flow, refetch, from, to]);

  return flowData ? (
    <>
      {/* Add new item button */}
      <div className="d-flex justify-content-between right-panel-options">
        <NewItemButton
          cashflow={flow}
          userId={sessionStorage.getItem("user")}
          setRefetch={setRefetch}
          buttonStyle="rightPanelNewItemButton"
          buttonIcon="bi bi-currency-exchange"
          buttonTitle="New"
        />
        {/* Text to distinguish if we're looking looking at income or expenses */}
        {flow == "income" ? (
          <div className="text-success flow-distinction">
            <i className="bi bi-arrow-bar-down"></i>Income
          </div>
        ) : (
          <div className="text-danger flow-distinction">
            <i className="bi bi-arrow-bar-up"></i>Expenses
          </div>
        )}
        {/* Sort by date button seciton that changes to Clear button that removes sorting*/}
        {from && to ? (
          <Link to={`/cash/${flow}`} className="sortByDateButton">
            <i className="bi bi-x-lg"></i> Clear
          </Link>
        ) : flow ? (
          <SortByDateButton
            flowParam={flow}
            userId={sessionStorage.getItem("user")}
          />
        ) : null}
      </div>
      {/* Section that shows all groups (and items within them) */}
      {flowData.length < 1 ? (
        // If transactions are absent in the specified date, displays "No transactions" text.
        <h3 className="text-center py-5">
          No transactions at this time, create a new one!
        </h3>
      ) : (
        <div className="right-panel-cashflow">
          <CashGroups
            flowData={flowData}
            setRefetch={setRefetch}
            cashflow={flow}
          />
        </div>
      )}
      {/* Balance section, placed here for refresh simplicity */}
      <Balance userId={sessionStorage.getItem("user")} refresh={refetch} />
    </>
  ) : (
    <div className="text-center">
      <div className="spinner-border"></div>
    </div>
  );
}
