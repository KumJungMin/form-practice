import React from "react";
import { Info } from "../App";

const CheckboxField: React.FC<{
  value: Info;
  source: keyof Info;
  setValue: (info: Info) => void;
  label: string;
}> = ({ label, value, setValue, source }) => {
  return (
    <>
      {label}
      <input
        onChange={(e) => setValue({ ...value, [source]: e.target.checked })}
        value={value[source].toString()}
        type={"checkbox"}
      />
    </>
  );
};

export default CheckboxField;
