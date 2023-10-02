import React, { useContext } from "react";
import { Info, InfoContext } from "../App";
import { Object } from "ts-toolbelt";
import useInput from "../hooks/useInput";

export type BooleanKeys = Object.SelectKeys<Info, boolean>;

const CheckboxField: React.FC<{
  source: BooleanKeys;
  label: string;
  validate: any;
}> = ({ label, source, validate }) => {
  const { error, value, onChange } = useInput({
    source,
    validate,
  });

  return (
    <>
      {label}
      <input
        onChange={(e) => onChange(e.target.checked)}
        value={value.toString()}
        type={"checkbox"}
      />
      {error && <p style={{ color: "crimson" }}>{error}</p>}
    </>
  );
};

export default CheckboxField;
