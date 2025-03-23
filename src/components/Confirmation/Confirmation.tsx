import { MouseEventHandler } from "react";
import { FormInput } from "../../types/Types";
import "./confirmation.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Confirmation({
  formData,
  handleSubmit,
  handleBackToForm,
}: {
  formData: FormInput[] | undefined;
  handleSubmit: MouseEventHandler<HTMLButtonElement>;
  handleBackToForm: MouseEventHandler<HTMLButtonElement>;
}) {
  useGSAP(() => {
    const tl = gsap.timeline();

    const confirmationItemArray = gsap.utils.toArray(".confirmation__item");
    const confirmationButtonsArray = gsap.utils.toArray(
      ".confirmation__buttons .button"
    );

    tl.from(".confirmation__heading", {
      autoAlpha: 0,
      xPercent: -30,
      duration: 0.8,
      ease: "power4.out",
    });

    tl.from(
      confirmationItemArray,
      {
        autoAlpha: 0,
        xPercent: -30,
        duration: 0.8,
        ease: "power4.out",
        stagger: {
          each: 0.1,
        },
      },
      "<+=0.2"
    );

    tl.from(
      confirmationButtonsArray,
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

  return (
    <div className="confirmation">
      <div className="confirmation__wrapper">
        <h2 className="confirmation__heading">Please Confirm information:</h2>

        {formData &&
          formData?.length > 0 &&
          formData.map(
            (data, index) =>
              (data.type === "text" ||
                data.type === "text-array" ||
                data.type === "email" ||
                data.type === "select" ||
                data.type === "radio" ||
                data.type === "checkbox") && (
                <div className="confirmation__item" key={index}>
                  <h3 className="confirmation__item-heading">{data.label}:</h3>

                  {data.type === "text-array" ? (
                    <ul key={index} className="confirmation__item-value">
                      {data.valueArray && data.valueArray.length > 0 ? (
                        data.valueArray.map((item, index) => (
                          <li key={index}>{item.value}</li>
                        ))
                      ) : (
                        <li>No teams members selected</li>
                      )}
                    </ul>
                  ) : (
                    <p className="confirmation__item-value">
                      {data.type === "checkbox"
                        ? data.value
                          ? "Yes"
                          : "No"
                        : (data.value as string).length > 0
                        ? data.value
                        : "N/A"}
                    </p>
                  )}
                </div>
              )
          )}
      </div>

      <div className="confirmation__buttons">
        <button className="button" onClick={handleBackToForm} type="button">
          Back to Form
        </button>

        <button className="button" onClick={handleSubmit} type="button">
          Submit
        </button>
      </div>
    </div>
  );
}
