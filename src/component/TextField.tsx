import React from "react";
import { Info } from "../App";

const TextField: React.FC<{
  value: Info;
  source: keyof Info;
  setValue: (info: Info) => void;
  label: string;
}> = ({ value, setValue, label, source }) => {
  return (
    <>
      {label}
      <input
        onChange={(e) => setValue({ ...value, [source]: e.target.value })}
        value={value[source].toString()}
      />
    </>
  );
};

export default TextField;
