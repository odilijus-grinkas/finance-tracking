import FormModal from "../formModal/FormModal";
import FormInput from "../formModal/FormInput";

export default function PassRecover() {
  function submitFunction(formData){
    window.alert("An email has been sent to " + formData.email);
    return {ok:true}
  }
  return (
    <FormModal buttonName="Reset Password" title="Password Recovery" buttonStyle="passRecoveryButton" submitFunction={submitFunction}>
      <FormInput inputTitle="Email You Registered With" inputName="email"/>
    </FormModal>
  );
}
