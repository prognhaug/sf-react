import { useMultistepForm } from "../../hooks/";
import React, { FormEvent } from "react";
import { FormWrapper } from "./FormWrapper";

type ConfigurationFormProps = {
  forms: React.ReactElement[];
  save: () => void;
};

export function ConfigurationForm({ forms, save }: ConfigurationFormProps) {
  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultistepForm(forms);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isLastStep) return next();
    save();
  }

  return (
    <FormWrapper title="Configuration">
      <form onSubmit={onSubmit}>
        <div className="absolute top-2 right-2 text-white">
          {currentStepIndex + 1} / {steps.length}
        </div>
        {React.cloneElement(step)}
        <div className="mt-4 flex justify-end gap-2">
          {!isFirstStep && (
            <button
              type="button"
              onClick={back}
              className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Back
            </button>
          )}
          <button
            type="submit"
            onClick={onSubmit}
            className={`py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              isLastStep
                ? "bg-green-600 hover:bg-green-700 focus:ring-green-500"
                : "bg-gray-600 hover:bg-gray-700 focus:ring-gray-500"
            } focus:outline-none focus:ring-2 focus:ring-offset-2`}
          >
            {isLastStep ? "Save" : "Next"}
          </button>
        </div>
      </form>
    </FormWrapper>
  );
}
