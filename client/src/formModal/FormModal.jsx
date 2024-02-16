/* eslint-disable react/prop-types */
import { useState, Children, cloneElement, useEffect } from "react";
import "../styles/buttons.css";
import Modal from "react-bootstrap/Modal";
// Takes FormInput or FormInputWrapper as children, which add input fields to this component.
// eslint-disable-next-line react/prop-types
export default function FormModal({
  //<FormInput> components
  children,
  // modal title
  title,
  // Function that gets run upon form submission. Receives formData & is expected to return fetch response or Error instance.
  submitFunction = () => {},
  // Name & style for button that displays modal
  buttonName = "Form Button",
  buttonStyle = "btn btn-primary",
  buttonIcon,
  // Inserts additional form details i.e {groupName:"food"}
  extraFormData = null,
  // Expects function, is passed formData. Inserts delete button near submit.
  deleteButton,
}) {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({});
  const [issues, setIssues] = useState({});
  function handleClick() {
    setShow(true);
  }
  // Passing necessary props to children components
  const mappedChildren = Children.map(children, (child) =>
    cloneElement(child, {
      setFormData: setFormData,
      setIssues: setIssues,
    })
  );

  function formHasEmptyField() {
    for (let data in formData) {
      if (formData[data].trim() == "") {
        setIssues((oldIssues) => {
          return { ...oldIssues, emptyField: "Cannot have empty fields." };
        });
        return true;
      }
    }
    setIssues((oldIssues) => {
      return { ...oldIssues, emptyField: null };
    });
    return false;
  }
  // Check if issues exist. Can take exception array to ignore specific issues
  function isIssues(exception) {
    for (let issue in issues) {
      if (exception) {
        if (exception.includes(issue)) continue;
      }
      if (issues[issue]) {
        return true;
      }
    }
    return false;
  }
  function displayIssues() {
    const issueStrings = [];
    for (let issue in issues) {
      if (issue != "" && issues[issue] != null) {
        issueStrings.push(issues[issue]);
      }
    }
    return (
      <>
        {issueStrings.map((elem, index) => (
          <div key={index} className="alert alert-warning my-2">
            {elem}
          </div>
        ))}
      </>
    );
  }
  // Close modal
  function handleCancel(event) {
    event.preventDefault();
    setShow(false);
  }
  // Calls submitFunction if no empty field or issues
  async function handleSubmit(event) {
    event.preventDefault();
    // Check for non-submit related issues
    if (formHasEmptyField() || isIssues(["submitIssue", "emptyField"])) {
      return;
    } else {
      const response = await submitFunction(formData);
      // If submit returned bad response, display as issue.
      if (response instanceof Error) {
        setIssues((oldIssues) => {
          return { ...oldIssues, submitIssue: response.name };
        });
        return;
      } else if (!response.ok) {
        const parsedResponse = await response.json();
        setIssues((oldIssues) => {
          return { ...oldIssues, submitIssue: parsedResponse.error };
        });
        return;
      } else {
        handleCancel(event);
      }
    }
  }
  // Prepare modal by adding extraFormData & clearing issue states
  useEffect(() => {
    issues ? setIssues({}) : null;

    extraFormData
      ? setFormData((oldFormData) => {
          return { ...oldFormData, extraFormData };
        })
      : null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);
  return (
    <>
      <button onClick={handleClick} className={buttonStyle}>
        {buttonIcon ? <i className={buttonIcon}> </i> : null}
        {buttonName}
      </button>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        data-bs-theme="dark"
        className="text-light"
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Extra delete button*/}
          <div className="d-flex justify-content-end">
            {deleteButton ? (
              <button
                className="btn btn-danger mx-2"
                onClick={(e) => {
                  deleteButton(e, handleCancel, formData);
                }}
              >
                <i className="bi bi-trash3"></i>
              </button>
            ) : null}
          </div>
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            {/* {children} */}
            {mappedChildren}
            {/* Issue warning bar */}
            {isIssues() ? displayIssues() : null}
            {/* Submit & Cancel buttons */}
            <div className="d-flex justify-content-end my-2">
              <input type="submit" className="btn btn-success mx-2" />
              <button className="btn btn-secondary" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
