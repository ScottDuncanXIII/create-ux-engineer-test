export type AppState =
  | "form"
  | "confirmation"
  | "success"
  | "loading"
  | "error";

export type InputState = "valid" | "invalid" | "idle";

export type InputType =
  | "text"
  | "text-array"
  | "email"
  | "password"
  | "select"
  | "radio"
  | "checkbox";

export type FormInput = {
  id: string;
  label: string;
  state: InputState;
  type: InputType;
  value: string | boolean;
  valueArray?: ArrayItem[];
  selectOptions?: SelectOption[];
  isRequired: boolean;
  errorList: string[];
};

export type ArrayItem = {
  id: string;
  value: string;
};

export type SelectOption = {
  label: string;
  value: string;
};
