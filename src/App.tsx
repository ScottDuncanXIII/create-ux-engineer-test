import { useRef, useState } from "react";
import gsap from "gsap";

import UserForm from "./components/UserForm";
import Confirmation from "./components/Confirmation";
import Success from "./components/Success";
import Loading from "./components/Loading";

import { AppState, FormInput } from "./types/Types";

import "./App.css";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";

function App() {
  const headingRef = useRef(null);
  useGSAP(() => {
    const tl = gsap.timeline();

    const headingSplit = new SplitType(headingRef.current!, {
      types: "words,chars",
    });

    tl.from(
      headingSplit.chars,
      {
        autoAlpha: 0,
        yPercent: -100,
        duration: 1,
        ease: "power4.out",
        stagger: {
          each: 0.05,
        },
      },
      "<"
    );
  }, []);

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

  const [formData, setFormData] = useState<FormInput[]>(defaultFormData);
  const [appState, setAppState] = useState<AppState>("form");

  function handleConfirmation(formData: FormInput[]) {
    setFormData(formData);
    setAppState("confirmation");
  }

  async function handleSubmit() {
    submitData();
    setAppState("loading");
  }

  function handleEditForm() {
    setAppState("form");
  }

  async function submitData() {
    try {
      const result = await pushToServer();
      console.log("Result:", result);
      setAppState("success");
    } catch (error) {
      console.error(error);
    }
  }

  function pushToServer() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          formData.map((data) => {
            return {
              id: data.id,
              value: data.valueArray ? data.valueArray : data.value,
            };
          })
        );
      }, 3000);
    });
  }
  return (
    <div className="create-ux-app">
      <div className="form-wrapper">
        <h1 className="form-heading" ref={headingRef}>
          UX Engineer Test
        </h1>

        {appState === "form" && (
          <UserForm
            data={formData}
            defaultFormData={defaultFormData}
            handleConfirmation={handleConfirmation}
          />
        )}

        {appState === "confirmation" && (
          <Confirmation
            formData={formData}
            handleBackToForm={handleEditForm}
            handleSubmit={handleSubmit}
          />
        )}

        {appState === "loading" && <Loading />}

        {appState === "success" && <Success />}
      </div>
    </div>
  );
}

export default App;
