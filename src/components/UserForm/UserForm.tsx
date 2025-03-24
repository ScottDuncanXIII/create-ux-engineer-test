import { useState, FormEvent, ChangeEvent, MouseEvent } from "react";
import gsap from "gsap";

import UserFormInput from "../UserFormInput";

import { ArrayItem, FormInput, InputState } from "../../types/Types";
import {
  getInitialData,
  validateEmail,
  validatePassword,
} from "../../utils/Utils";

import "./user.form.css";
import { useGSAP } from "@gsap/react";

export default function UserForm({
  data,
  handleConfirmation,
}: {
  data: FormInput[];
  handleConfirmation: (formData: FormInput[]) => void;
}) {
  const [formData, setFormData] = useState<FormInput[]>(data);

  useGSAP(() => {
    const tl = gsap.timeline();

    const formInputArray = gsap.utils.toArray(".user-form-input");
    const btnArray = gsap.utils.toArray(".user-form__buttons .button");

    tl.from(formInputArray, {
      autoAlpha: 0,
      xPercent: -30,
      duration: 0.8,
      ease: "power4.out",
      stagger: {
        each: 0.1,
      },
    });

    tl.from(
      btnArray,
      {
        autoAlpha: 0,
        yPercent: -60,
        duration: 1,
        ease: "power4.out",
        stagger: {
          each: 0.2,
        },
      },
      "<+=75%"
    );
  }, []);

  function handleInputChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    id: string
  ) {
    const updateFormData = formData.map((data) => {
      if (data.id === id) {
        let state: InputState = "idle";
        let errorList: string[] = [];

        if (e.target.value !== "") {
          if (data.type === "email") {
            state = validateEmail(e.target.value).isValid ? "valid" : "invalid";
            errorList = validateEmail(e.target.value).errorList;
          }

          if (data.type === "password") {
            const isPassowrdValid = validatePassword(e.target.value);
            state = isPassowrdValid.isValid ? "valid" : "invalid";
            errorList = isPassowrdValid.errorList;
          }

          if (
            data.type === "text" ||
            data.type === "text-array" ||
            data.type === "select" ||
            data.type === "radio"
          ) {
            state = e.target.value !== "" ? "valid" : "idle";
          }
        }

        return {
          ...data,
          value: e.target.value,
          state: state,
          errorList: errorList,
        };
      } else {
        return data;
      }
    });

    setFormData(updateFormData);
  }

  function handleAddItemClick(
    e: MouseEvent<HTMLButtonElement>,
    id: string,
    arrayItem: ArrayItem
  ) {
    e.preventDefault();

    setFormData(
      formData.map((data) => {
        if (data.id === id) {
          let updatedFormData = {} as FormInput;

          if (arrayItem.value === "") {
            updatedFormData = {
              ...data,
              value: arrayItem.value,
              state: "invalid",
              errorList: ["Team member name cannot be empty"],
            };
          } else {
            updatedFormData = {
              ...data,
              value: "",
              valueArray:
                data.valueArray && data.valueArray.length > 0
                  ? [...data.valueArray, arrayItem]
                  : [arrayItem],
              errorList: [],
            };
          }

          return updatedFormData;
        } else {
          return data;
        }
      })
    );
  }

  function handleDeleteItemClick(
    e: MouseEvent<HTMLButtonElement>,
    id: string,
    resultId: string
  ) {
    e.preventDefault();
    setFormData(
      formData.map((data) => {
        if (data.id === id) {
          const updatedFormData = {
            ...data,
            valueArray: data.valueArray?.filter(
              (arrayItem) => arrayItem.id !== resultId
            ),
          };

          return updatedFormData;
        } else {
          return data;
        }
      })
    );
  }

  function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const isFormInvalid =
      formData.filter((item) => item.state !== "valid" && item.isRequired)
        .length > 0;

    setFormData(
      formData.map((data) => {
        if (data.isRequired && data.state !== "valid") {
          let errorList: string[] = [];

          if (data.type === "text" || data.type === "checkbox") {
            errorList = [`${data.label} field is required`];
          }
          if (data.type === "email") {
            errorList = validateEmail(data.value as string).errorList;
          }

          if (data.type === "password") {
            errorList = validatePassword(data.value as string).errorList;
          }

          if (data.type === "checkbox") {
            errorList = errorList = [`This field is required`];
          }

          return {
            ...data,
            state: "invalid",
            errorList: errorList,
          };
        } else {
          return data;
        }
      })
    );

    if (isFormInvalid) {
      const firstError = gsap.utils.toArray(".user-form-input--invalid")[0];
      gsap.to(window, { duration: 0.5, scrollTo: firstError as HTMLElement });
      return;
    }

    handleConfirmation(formData);
  }

  function handleCheckboxChange(e: ChangeEvent<HTMLInputElement>) {
    const updatedFormData = formData.map((data) => {
      if (data.id === e.target.id) {
        return {
          ...data,
          value: e.target.checked ? true : false,
          state: e.target.checked ? "valid" : "idle",
          errorList: [],
        };
      } else {
        return data;
      }
    });

    setFormData(updatedFormData as FormInput[]);
  }

  function handleClearForm(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setFormData(getInitialData());
  }

  return (
    <form className="user-form" onSubmit={handleFormSubmit}>
      {formData.map((data) => (
        <UserFormInput
          id={data.id}
          label={data.label}
          type={data.type}
          state={data.state}
          errorList={data.errorList}
          value={data.value}
          valueArray={data.valueArray}
          selectOptions={data.selectOptions}
          isRequired={data.isRequired}
          handleInputChange={handleInputChange}
          handleAddItemClick={handleAddItemClick}
          handleDeleteItemClick={handleDeleteItemClick}
          handleCheckboxChange={handleCheckboxChange}
          key={data.id}
        />
      ))}

      <div className="user-form__buttons">
        <button className="button" onClick={handleClearForm} type="button">
          Clear
        </button>

        <button className="button" type="submit">
          Confirm
        </button>
      </div>
    </form>
  );
}
