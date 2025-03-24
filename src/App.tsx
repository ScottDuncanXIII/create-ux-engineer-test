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
import { getInitialData } from "./utils/Utils";

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

  const [formData, setFormData] = useState<FormInput[]>(getInitialData());
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
          <UserForm data={formData} handleConfirmation={handleConfirmation} />
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
