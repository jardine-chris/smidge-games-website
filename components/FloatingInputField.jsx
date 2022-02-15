import { useState, useEffect } from "react";

export const FloatingInput = ({ id, label, children, inputText }) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (inputText !== "") {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [inputText, setIsActive]);

  return (
    <div className="mb-4">
      <div id="float-label">
        {children}
        <label
          className={`${
            isActive ? "Active" : ""
          } block text-zinc-400 text-sm mb-2`}
          htmlFor={id}
        >
          {label}
        </label>
        <style jsx>
          {`
            #float-label {
              position: relative;
            }
            #float-label input {
              width: 100%;
              padding-top: 2rem;
            }
            #float-label label {
              pointer-events: none;
              position: absolute;
              left: 0.75rem;
              transform: translate(0, -2.15rem) scale(1);
              transform-origin: top left;
              transition: all 0.2s ease-out;
            }
            #float-label:focus-within label {
              transform: translate(0, -2.5rem) scale(0.75);
              color: #ea580c;
            }
            #float-label .Active {
              transform: translate(0, -2.5rem) scale(0.75);
            }
          `}
        </style>
      </div>
    </div>
  );
};
