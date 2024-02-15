// accepts from in YYYY/MM/DD format & title for this balance.
import { useEffect, useState } from "react";
import "../../styles/balanceDisplay.css"
// eslint-disable-next-line react/prop-types
export default function Balance({ userId, refresh }) {
  const [data, setData] = useState();

  // Fetches items based on path
  async function fetchItems(path) {
    try {
      const response = await fetch(`http://localhost:3001/${path}`);
      const parsedResponse = await response.json();
      return parsedResponse;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  // Sums all "amount" values in array<object>
  function totalAmount(arr) {
    let sum = 0;
    for (let obj of arr) {
      if (obj.amount) {
        sum += +obj.amount;
      }
    }
    return sum;
  }
  async function remainingBalance() {
    const income = await fetchItems("income/" + userId);
    const expense = await fetchItems("expense/" + userId);
    const totalIncome = totalAmount(income).toFixed(2);
    const totalExpense = totalAmount(expense).toFixed(2);
    const remainingBalance = (totalIncome - totalExpense).toFixed(2);
    setData({
      balance: remainingBalance,
      income: totalIncome,
      expense: totalExpense,
    });
    return <></>;
  }
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    remainingBalance();
  }, [refresh]);

  return (
    <div className="balanceDisplay">
      <h2>Total Balance</h2>
      {data ? (
        <div>
          <h3 className={data.balance<0 ? "text-warning" : "text-info"}>€{data.balance}</h3>
          <div className=" text-success"><i className="bi bi-graph-up-arrow"> </i>{data.income}</div>
          <div className="text-danger"><i className="bi bi-graph-down-arrow"> </i>{data.expense}</div>
        </div>
      ) : (
        <div className="spinner-border"></div>
      )}
    </div>
  );
}
