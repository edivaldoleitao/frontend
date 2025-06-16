import "./Label.css";
import type { LabelsProps } from "./index.ts";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

function Labels({ variant, name, id, value, onChange }: LabelsProps) {
  const [visible, setVisible] = useState(false);

  if (variant === "inputText") {
    return (
      <div className="inputContainer">
        <label className="inputName" htmlFor={id}>
          {name}
        </label>
        <input
          className="inputBox"
          type="text"
          id={id}
          value={value}
          onChange={onChange}
          required
        ></input>
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
            value={value}
            onChange={onChange}
            required
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
