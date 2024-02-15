/* eslint-disable react/prop-types */
import FormModal from "../../formModal/FormModal";
import FormInput from "../../formModal/FormInput";
import {
  DateFormInput,
  DecimalFormInput,
} from "../../formModal/FormInputWrappers";
export default function ItemPage({ itemData, setRefetch }) {
  // Creating title based on item's name
  const title = `Edit ${itemData.name}`;
  // returns YYYY-MM-DD
  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed, so add 1
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  async function submitFunction(formData) {
    const readyForm = { ...formData, id: itemData.id };
    try {
      const response = await fetch("http://localhost:3001/item", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(readyForm),
      });
      if (!response.ok) {
        return response;
      } else {
        setRefetch((tick) => tick + 1);
        return response;
      }
    } catch (err) {
      return err;
    }
  }
  async function deleteButtonHandler(e, handleCancel) {
    e.preventDefault();
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await fetch("http://localhost:3001/item", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: itemData.id }),
        });
        setRefetch((old) => old + 1);
        handleCancel(e);
      } catch (err) {
        return;
      }
    } else return;
  }
  return (
    <FormModal
      title={title}
      buttonName={itemData.name}
      submitFunction={submitFunction}
      deleteButton={deleteButtonHandler}
      buttonStyle="itemPageButton"
    >
      <FormInput
        inputTitle="Transaction Name"
        defaultValue={itemData.name}
        inputName="name"
      />
      <DecimalFormInput inputTitle="Amount" defaultValue={itemData.amount} />
      <DateFormInput
        inputTitle="Time of Transaction"
        defaultValue={formatDate(itemData.date)}
      />
    </FormModal>
  );
}
