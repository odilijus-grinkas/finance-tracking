import FormInput from "./FormInput";
import { useState } from "react";

// Checks for whole numbers with up to 2 decimals.
// eslint-disable-next-line react/prop-types
function DecimalFormInput({ inputTitle = "value", ...otherProps }) {
  function decimalValidator(value) {
    if (!/^[0-9]+(\.[0-9]{1,2})?$/.test(value)) {
      return {
        valid: false,
        error: "Only whole numbers with up to 2 decimals allowed.",
      };
    } else if (value > 99999999) {
      return {valid: false, error: "Number value is too large."}
    } else {
      return { valid: true };
    }
  }
  return (
    <FormInput
      inputTitle={inputTitle}
      inputName="amount"
      validator={decimalValidator}
      {...otherProps}
    />
  );
}
// Checks for valid dates & adds current date as default value
// eslint-disable-next-line react/prop-types
function DateFormInput({ inputTitle = "date", inputName="date", FromToValidator, ...otherProps }) {
  return (
    <FormInput
      inputTitle={inputTitle}
      defaultValue={currentDate()}
      validator={FromToValidator ? FromToValidator : dateValidator}
      inputType="date"
      inputName={inputName}
      {...otherProps}
    />
  );
}
// Makes 2 dates: From & To and makes sure From is not greater than To.
function FromToDateFormInput({ ...otherProps }) {
  const [inputFields, setInputFields] = useState({
    from: currentDate(),
    to: currentDate(),
  });
  
  function isFromGreater(from, to) {
    if (from > to) {
      return {
        valid: false,
        error: "'From' date cannot be greater than 'To' date.",
      }
    } else {
      return {valid: true}
    }
  }
  function fromValidator(val, setIssues) {
    setIssues((old)=>{ return { ...old, to : null, from : null} })
    setInputFields((old) => {
      return { ...old, from: val };
    });
    return isFromGreater(val, inputFields.to);
  }
  function toValidator(val, setIssues) {
    setIssues((old)=>{ return { ...old, to : null, from : null} })
    setInputFields((old) => {
      return { ...old, to: val };
    });
    return isFromGreater(inputFields.from, val);
  }

  return (
    <>
      <DateFormInput
        inputTitle="from"
        inputName="from"
        FromToValidator={fromValidator}
        {...otherProps}
      />
      <DateFormInput
        inputTitle="to"
        inputName="to"
        FromToValidator={toValidator}
        {...otherProps}
      />
    </>
  );
}

function dateValidator(value) {
  const date = new Date(value);
  const year = date.getFullYear();
  if (year < 1970) {
    return { valid: false, error: "Date cannot be before 1970." };
  } else if (year > 2100) {
    return { valid: false, error: "Date cannot be later than 2100." };
  } else {
    return { valid: true };
  }
}
function currentDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
export { DecimalFormInput, DateFormInput, FromToDateFormInput };
