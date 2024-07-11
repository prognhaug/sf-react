import NavBar from "../../components/NavBar";
import { useState } from "react";
import { AccountForm } from "../../components/test/AccountForm";
import { AddressForm } from "../../components/test/AddressForm";
import { useMultistepForm } from "../../components/test/useMultistepForm";
import { UserForm } from "../../components/test/UserForm";

type FormData = {
  firstName: string;
  lastName: string;
  age: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  email: string;
  password: string;
};

const INITIAL_DATA: FormData = {
  firstName: "",
  lastName: "",
  age: "",
  street: "",
  city: "",
  state: "",
  zip: "",
  email: "",
  password: "",
};

function Multistep() {
  const [data, setData] = useState(INITIAL_DATA);
  function updateFields(fields: Partial<FormData>) {
    setData((prev) => ({ ...prev, ...fields }));
  }
  const { steps, currentStepIndex, step, isFirstStep, back, next, isLastStep } =
    useMultistepForm([
      <UserForm {...data} updateFields={updateFields} />,
      <AddressForm {...data} updateFields={updateFields} />,
      <AccountForm {...data} updateFields={updateFields} />,
    ]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isLastStep) return next();
    alert("Success");
  }
  return (
    <div className="flex bg-gray-700">
      <div className="w-64">
        <NavBar />
      </div>
      <div className="relative flex-grow h-64 bg-white border border-black p-8 m-4 rounded-md max-w-max">
        <form onSubmit={onSubmit}>
          <div className="absolute top-2 right-2">
            {currentStepIndex + 1} / {steps.length}
          </div>
          {step}
          <div className="mt-4 flex justify-end gap-2">
            {!isFirstStep && (
              <button type={"button"} onClick={back}>
                Back
              </button>
            )}
            <button type={"submit"} onClick={next}>
              {isLastStep ? "Finish" : "Next"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Multistep;
