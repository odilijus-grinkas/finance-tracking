import FormModal from "../../formModal/FormModal";
import { FromToDateFormInput } from "../../formModal/FormInputWrappers";
import { useNavigate } from "react-router-dom";

// Takes user's id and cashflow parameter. If dates are good - changes link to appropriate API.
// eslint-disable-next-line react/prop-types
export default function SortByDateButton({ userId, flowParam }) {
  const navigate = useNavigate();
  async function submitFunction(formData) {
    navigate(`/cash/${flowParam}/${userId}/${formData.from}/${formData.to}`);
    return {ok:true}
  }

  return (
    <FormModal
      title="Sort income & expense by date"
      buttonName="Sort By Date"
      submitFunction={submitFunction}
      buttonIcon={"bi bi-calendar"}  
      buttonStyle="sortByDateButton"      
    >
      <FromToDateFormInput />
    </FormModal>
  );
}
