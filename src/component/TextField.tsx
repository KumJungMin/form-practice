import React, { useContext } from "react";
import { Info, InfoContext, PartialInfo } from "../App";
import { Object } from "ts-toolbelt";
import useInput from "../hooks/useInput";

export type StringKeys = Object.SelectKeys<Info, string>;

const TextField: React.FC<{
  source: StringKeys;
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
        data-testid={source}
        onChange={(e) => onChange(e.target.value)}
        value={value.toString()}
      />
      {error && <p style={{ color: "crimson" }}>{error}</p>}
    </>
  );
};

export default TextField;
