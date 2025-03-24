import { FormInput } from "../types/Types";

export function validateEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const isValid = {
    isValid: emailRegex.test(email),
    errorList: !emailRegex.test(email) ? ["Invalid email address"] : [],
  };

  return isValid;
}

export function validatePassword(password: string) {
  const errorList: string[] = [];

  if (password.length < 8) {
    errorList.push("Password must be at least 8 characters long");
  }

  if (!/[A-Z]/.test(password)) {
    errorList.push("Password must contain at least one uppercase letter");
  }

  if (!/[a-z]/.test(password)) {
    errorList.push("Password must contain at least one lowercase letter");
  }

  if (!/[0-9]/.test(password)) {
    errorList.push("Password must contain at least one number");
  }

  if (!/[^A-Za-z0-9]/.test(password)) {
    errorList.push("Password must contain at least one special character");
  }

  const isValid = {
    isValid: errorList.length === 0,
    errorList: errorList,
  };

  return isValid;
}

export function getInitialData() {
  const defaultInputState: FormInput = {
    id: "",
    label: "",
    state: "idle",
    type: "text",
    value: "",
    selectOptions: [],
    isRequired: false,
    errorList: [],
  };

  const defaultFormData: FormInput[] = [
    {
      ...defaultInputState,
      id: "email",
      label: "Email",
      isRequired: true,
      type: "email",
    },
    {
      ...defaultInputState,
      id: "password",
      label: "Password",
      type: "password",
      isRequired: true,
    },
    {
      ...defaultInputState,
      id: "name",
      label: "Name",
      isRequired: true,
    },
    {
      ...defaultInputState,
      id: "org-name",
      label: "Organization Name",
      isRequired: true,
    },
    {
      ...defaultInputState,
      id: "user-role",
      label: "User Role",
    },
    {
      ...defaultInputState,
      id: "add-members",
      label: "Team Members",
      type: "text-array",
      valueArray: [],
    },
    {
      ...defaultInputState,
      id: "organisation-size",
      label: "Organisation Size",
      type: "select",
      selectOptions: [
        {
          label: "Please Select a Size Range",
          value: "",
        },
        {
          label: "1-10",
          value: "1-10",
        },
        {
          label: "11-50",
          value: "11-50",
        },
        {
          label: "51-100",
          value: "51-100",
        },
        {
          label: "101-500",
          value: "101-500",
        },
        {
          label: "500+",
          value: "500+",
        },
      ],
    },
    {
      ...defaultInputState,
      id: "plan-pricing",
      label: "Pricing Plan",
      type: "radio",
      value: "Basic",
      selectOptions: [
        {
          label: "Basic $",
          value: "Basic",
        },
        {
          label: "Standard $$",
          value: "Standard",
        },
        {
          label: "Premium $$$",
          value: "Premium",
        },
      ],
    },
    {
      ...defaultInputState,
      id: "terms",
      label: "Do you agree to the terms and conditions?",
      type: "checkbox",
      isRequired: true,
    },
    {
      ...defaultInputState,
      id: "mailing-list",
      label: "Subscribe to our mailing list?",
      type: "checkbox",
    },
  ];

  return defaultFormData;
}
