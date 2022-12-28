/* eslint-disable testing-library/no-wait-for-multiple-assertions */
/* eslint-disable testing-library/prefer-screen-queries */
import { render, fireEvent, waitFor } from "@testing-library/react";
import FormVessel from "../FormVessel";
import { options } from "../constants";

it("updates the fields, selects an option from the dropdown, and submits the form", async () => {
  // Render the FormVessel component
  const { getByLabelText, getByText } = render(<FormVessel />);

  // Get the input elements and the submit button
  const mmsiInput = getByLabelText("mmsi") as HTMLInputElement;
  const daysInput = getByLabelText("days") as HTMLInputElement;
  const periodSelect = getByLabelText("period") as HTMLSelectElement;
  const submitButton = getByText("Search") as HTMLButtonElement;

  // Update the fields and select an option from the dropdown
  fireEvent.change(mmsiInput, { target: { value: "123456789" } });
  fireEvent.change(daysInput, { target: { value: "7" } });
  fireEvent.change(periodSelect, { target: { value: options[1].value } });

  // Submit the form
  fireEvent.click(submitButton);

  // WaitFor for the form submission to complete
  await waitFor(() => {
    // Assert that the form values have been updated
    expect(mmsiInput.value).toBe("123456789");
    expect(daysInput.value).toBe("7");
    expect(periodSelect.value).toBe(options[1].value);
  });
});
