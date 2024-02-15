/* eslint-disable react/prop-types */
import { useEffect } from "react";
export default function FormInput({
  // Title of input field that's displayed to user.
  inputTitle = "value",
  // The name input's value is stored as into formData
  inputName,
  inputType = "text",
  defaultValue = "",
  // Validator function is passed a value & it must return {valid: false, error: string} or {valid: true} 
  // depending if the value it receives passes, it may also edit setIssues (to remove some issues if needed)
  validator,
  // Other props are provided by FormModal, which are meant to interact with it directly.
  setFormData,
  setIssues,
  // Whether field should be uneditable
  disabled = false
}) {
  // Sets formData with input's values
  function handleChange(event) {
    const name = event.target.name;
    const val = event.target.value;
    setFormData((formData) => {
      return { ...formData, [name]: val.trim() };
    });

    // Checking and setting issues if validator present
    if (validator) {
      const validated = validator(val, setIssues);
      if (!validated.valid) {
        setIssues((issues) => {
          return { ...issues, [name]: validated.error };
        });
      } else {
        setIssues((issues) => {
          return { ...issues, [name]: null };
        });
      }
    }
  }
  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  // Add this input's initial data to the formData
  useEffect(() => {
    // If input name isn't provided, use inputTitle instead.
    if (!inputName){
      // eslint-disable-next-line react-hooks/exhaustive-deps
      inputName = inputTitle;
    }
    setFormData((oldFormData) => {
      return { ...oldFormData, [inputName]: defaultValue ? defaultValue : "" };
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <div>{capitalizeFirstLetter(inputTitle)}:</div>
      <input
        className="form-control"
        type={inputType}
        name={inputName}
        defaultValue={defaultValue}
        disabled = {disabled}
        onChange={(e) => {
          handleChange(e);
        }}
      />
    </div>
  );
}
