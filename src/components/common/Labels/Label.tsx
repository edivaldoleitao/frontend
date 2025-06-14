import "./Label.css";
import type { ButtonProps } from "./index.ts";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

function Labels({ variant, name, id }: ButtonProps) {
  const [visible, setVisible] = useState(false);

  if (variant === "inputText") {
    return (
      <div className="inputContainer">
        <label className="inputName" htmlFor={id}>
          {name}
        </label>
        <input className="inputBox" type="text" id={id}></input>
      </div>
    );
  } else if (variant === "Password") {
    return (
      <div className="inputContainer">
        <label className="inputName" htmlFor={id}>
          {name}
        </label>
        <div className="inputBox">
          <input
            type={visible ? "text" : "password"}
            id={id}
            className="passwordBox"
          ></input>
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            className="text-[#266FE8]"
          >
            {visible ? <EyeOff /> : <Eye />}
          </button>
        </div>
      </div>
    );
  }
}

export default Labels;
