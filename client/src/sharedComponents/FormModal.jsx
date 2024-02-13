import { useState } from "react";
import Modal from "react-bootstrap/Modal";
// This component is a form for creating new items in groups

// eslint-disable-next-line react/prop-types
export default function FormModal({handleSubmit, issues, title, buttonTitle, inputComponents }) {
  const [show, setShow] = useState(false);

  function handleCancel() {
    setShow(false);
  }
  function handleShow() {
    setShow(true);
  }

  return (
    <>
      <button className="btn btn-primary" onClick={handleShow}>
        {buttonTitle}
      </button>

      <Modal
        show={show}
        onHide={handleCancel}
        data-bs-theme="dark"
        className="text-light"
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            {inputComponents.map((e)=>{
              <div>e</div>
            })}
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
