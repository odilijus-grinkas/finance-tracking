import FormModal from "../../formModal/FormModal";
import FormInput from "../../formModal/FormInput";
// import submitFunction from "../../formModal/submitFunction";
import {
  DecimalFormInput,
  DateFormInput,
} from "../../formModal/FormInputWrappers";
// Posts new item to DB & refetches data. If group is provided it will use it as value and not allow user to change it.
// eslint-disable-next-line react/prop-types
export default function NewItemButton({cashflow, userId, setRefetch, group, buttonTitle, buttonStyle, buttonIcon,}) {
  async function submitFunction(fieldData) {
    let addGroup;
    if (group) {
      addGroup = { group: group };
    } else {
      addGroup = {};
    }
    const readyFormData = {
      ...fieldData,
      cashflow: cashflow,
      userId: userId,
      ...addGroup,
    };
    console.log("hi")
    console.log(readyFormData)
    try {
      const response = await fetch("http://localhost:3001/item", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(readyFormData),
      });
      if (response.ok) {
        setRefetch((old) => old + 1);
      }
      return response;
    } catch (err) {
      return err;
    }
  }
  // Make buttonTitle (with cashflow) if not provided
  if (!buttonTitle) {
    const cashflowString = cashflow;
    buttonTitle = `New ${
      cashflowString.charAt(0).toUpperCase() + cashflowString.slice(1)
    }`;
  }
  return (
    <>
      <FormModal
        title="Create New Transaction"
        buttonName={buttonTitle}
        submitFunction={submitFunction}
        buttonStyle={buttonStyle}
        buttonIcon={buttonIcon}
      >
        <FormInput inputTitle="transaction name" inputName="name" />
        <DecimalFormInput inputTitle="value(€)" />
        <DateFormInput inputTitle="transaction date" />
        {/* If group is provided, it will use its value instead of this field */}
        <FormInput
          inputTitle="category"
          inputName="group"
          disabled={group ? true : false}
          defaultValue={group ? group : ""}
        />
      </FormModal>
    </>
  );
}
