import { ChangeEvent, MouseEvent, useRef } from "react";
import { v4 as uuid } from "uuid";
import {
  InputType,
  SelectOption,
  InputState,
  ArrayItem,
} from "../../types/Types";
import "./user.form.input.css";

export default function UserFormInput({
  id,
  label,
  type = "text",
  state,
  errorList,
  value,
  valueArray,
  selectOptions,
  isRequired,
  handleInputChange,
  handleAddItemClick,
  handleDeleteItemClick,
  handleCheckboxChange,
}: {
  id: string;
  label: string;
  type: InputType;
  state: InputState;
  errorList: string[];
  value: string | boolean;
  valueArray?: ArrayItem[];
  selectOptions?: SelectOption[];
  isRequired: boolean;
  handleInputChange?: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    id: string
  ) => void;
  handleAddItemClick?: (
    e: MouseEvent<HTMLButtonElement>,
    id: string,
    value: ArrayItem
  ) => void;
  handleDeleteItemClick?: (
    e: MouseEvent<HTMLButtonElement>,
    id: string,
    resultId: string
  ) => void;
  handleCheckboxChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      {(type === "text" ||
        type === "text-array" ||
        type === "email" ||
        type === "password" ||
        type === "select" ||
        type === "radio") && (
        <div
          className={`user-form-input ${
            state === "invalid" ? "user-form-input--invalid" : ""
          } 
      ${type === "text-array" ? "user-form-input--text-array" : ""}
      ${
        state === "valid" || state === "invalid"
          ? "user-form-input--status-active"
          : ""
      }`}
        >
          <label
            id={id + "-label"}
            className="user-form-input__label"
            htmlFor={id}
          >
            {isRequired && <sup>*</sup>}
            {label}:
          </label>

          <div
            className={`user-form-input__container ${
              type === "text-array"
                ? "user-form-input__container--text-array"
                : ""
            }`}
          >
            <div className="user-form-input__wrapper">
              {(type === "text" ||
                type === "text-array" ||
                type === "email" ||
                type === "password") && (
                <input
                  id={id}
                  className="user-form-input__input"
                  type={type}
                  aria-label={label}
                  aria-labelledby={id + "-label"}
                  value={value as string}
                  onChange={(e) => handleInputChange?.(e, id)}
                  ref={inputRef}
                />
              )}

              {type === "select" &&
                selectOptions &&
                selectOptions.length > 0 && (
                  <select
                    id={id}
                    className="user-form-input__input user-form-input__input--select"
                    onChange={(e) => handleInputChange?.(e, id)}
                    value={value as string}
                  >
                    {selectOptions.map((option, index) => (
                      <option key={index} value={option.value}>
                        &gt; {option.label}
                      </option>
                    ))}
                  </select>
                )}

              {type === "radio" &&
                selectOptions &&
                selectOptions.length > 0 && (
                  <div className="user-form-input__radio-group">
                    {selectOptions.map((option, index) => (
                      <div key={index} className="user-form-input__radio">
                        <input
                          id={id + "-" + option.value}
                          className="user-form-input__radio-input"
                          type="radio"
                          name={id}
                          value={option.value}
                          checked={value === option.value}
                          onChange={(e) => handleInputChange?.(e, id)}
                          aria-labelledby={`${id} + "-" + option.value + "-label"`}
                        />
                        <label
                          id={id + "-" + option.value + "-label"}
                          htmlFor={`${id}-label`}
                          className="user-form-input__radio-label"
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                )}

              {type !== "radio" && (
                <div
                  className={`user-form-input__status
                ${state === "valid" ? "user-form-input__status--valid" : ""}
                ${
                  state === "invalid" ? "user-form-input__status--invalid" : ""
                } 
                ${state === "idle" && "user-form-input__status--idle"}`}
                ></div>
              )}
            </div>

            {type === "text-array" && (
              <button
                className="button"
                onClick={(e) => {
                  handleAddItemClick?.(e, id, {
                    id: uuid(),
                    value: inputRef?.current?.value as string,
                  });
                }}
              >
                Add
              </button>
            )}
          </div>

          {errorList.length > 0 && (
            <div className="user-form-input__error-list">
              {errorList.map((error, index) => (
                <div key={index} className="user-form-input__error">
                  X&nbsp;{error}
                </div>
              ))}
            </div>
          )}

          {type === "text-array" && valueArray && valueArray.length > 0 && (
            <div className="user-form-input__results">
              {valueArray.map((result, index) => (
                <div className="user-form-input__result" key={index}>
                  {result.value}

                  <button
                    className="user-form-input__result-remove"
                    onClick={(e) => {
                      handleDeleteItemClick?.(e, id, result.id);
                    }}
                    type="button"
                    aria-label={`Remove ${result.value}`}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {type === "checkbox" && (
        <div className="user-form-input">
          <div className="user-form-input__checkbox_wrapper">
            <input
              id={id}
              className={`user-form-input__checkbox ${
                state === "invalid" ? "user-form-input__checkbox--invalid" : ""
              } `}
              type="checkbox"
              checked={value as boolean}
              onChange={(e) => handleCheckboxChange?.(e)}
              aria-labelledby={id + "-label"}
            />
            <label
              id={id + "-label"}
              htmlFor={id}
              className="user-form-input__checkbox-label"
            >
              {isRequired && <sup>*</sup>}
              {label}
            </label>
          </div>

          {errorList.length > 0 && (
            <div className="user-form-input__error-list">
              {errorList.map((error, index) => (
                <div key={index} className="user-form-input__error">
                  X&nbsp;{error}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
