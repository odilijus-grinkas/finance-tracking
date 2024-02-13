import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useParams } from "react-router-dom";
// This component is a form for creating new items in groups

// eslint-disable-next-line react/prop-types
export default function NewItem({ groupName, refetchData }) {
  const { flow } = useParams("flow");
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({ name: "", amount: "" });
  const [issues, setIssues] = useState(false);

  function handleCancel() {
    setShow(false);
  }
  function handleShow() {
    setFormData({ name: "", amount: "" });
    setShow(true);
  }
  // Adds field values to state
  function handleChange(event) {
    setIssues(false);
    const name = event.target.name;
    const val = event.target.value;
    setFormData((values) => ({ ...values, [name]: val }));
  }
  // Check if fields are empty
  function isFieldEmpty() {
    const name = formData.name;
    const amount = formData.amount;
    if (name == "" || amount == "") {
      setIssues("Fields cannot be empty.");
      return true;
    } else {
      return false;
    }
  }
  // Check if entered amount is not a number or has >2 decimals
  function isAmountNumber() {
    if (!/^[0-9]+(\.[0-9]{1,2})?$/.test(formData.amount)) {
      setIssues("Only whole numbers with up to 2 decimals allowed.");
      return false;
    } else {
      setIssues(false);
      return true;
    }
  }
  // Submit button handler
  async function handleSubmit(event) {
    event.preventDefault();
    // reject bad fields
    if (isFieldEmpty()) {
      return;
    } else if (!isAmountNumber()) {
      return;
    }
    if (formData.name != "" && formData.amount != "" && !issues) {
      // Adding group name to form data
      const readyFormData = {
        ...formData,
        cashflow: flow,
        groupName: groupName,
        userId: sessionStorage.user,
      };
      try {
        const response = await fetch("http://localhost:3001/item", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(readyFormData),
        });
        // bad response gives error
        if (!response.ok) {
          const parsedResponse = await response.json();
          setIssues(parsedResponse.error);
          return;
        } else {
        // Refetch items if successfully added & close modal
        refetchData(prev=> prev+1)
        handleCancel();
        }
      } catch (err) {
        setIssues("Failed to create item.");
        console.log(err);
      }
    }
  }

  return (
    <>
      <button className="btn btn-primary" onClick={handleShow}>
        + Add New Item
      </button>

      <Modal
        show={show}
        onHide={handleCancel}
        data-bs-theme="dark"
        className="text-light"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add new item to {groupName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div className="">
              <div className="">
                <div>Item Name</div>
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </div>
              <div className="">
                <div className="">Cost €</div>
                <input
                  className="form-control"
                  type="text"
                  name="amount"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </div>
            </div>
            {/* Issue warning bar */}
            {issues ? (
              <div className="alert alert-warning my-2">{issues}</div>
            ) : null}
            {/* Submit & Cancel buttons */}
            <div className="d-flex justify-content-end my-2">
              <input type="submit" className="btn btn-success mx-2" />
              <button className="btn btn-danger" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
