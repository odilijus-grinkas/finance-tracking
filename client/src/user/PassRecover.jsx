import FormModal from "../formModal/FormModal";
import FormInput from "../formModal/FormInput";

export default function PassRecover() {
  // If email exists, will send it a token and give alert message announcing this.
  async function submitFunction(formData) {
    try {
      const response = await fetch("http://localhost:3001/pass_reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email }),
      });
      if (response.ok) {
        const parsed = await response.json()
        window.alert(`An email has been sent to ${formData.email}. Pretend you received it and use this link to reset password: http://localhost:3000/auth/${parsed.token}`);
        return {ok: true};
      } else {
        return response;
      }
    } catch (err) {
      return err;
    }
  }
  function emailValidator(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailPattern.test(email)) {
      return { valid: true };
    } else {
      return { valid: false, error: "Must be a valid email." };
    }
  }
  return (
    <FormModal
      buttonName="Reset Password"
      title="Password Recovery"
      buttonStyle="passRecoveryButton"
      submitFunction={submitFunction}
    >
      <FormInput
        inputTitle="Email You Registered With"
        inputName="email"
        validator={emailValidator}
      />
    </FormModal>
  );
}
