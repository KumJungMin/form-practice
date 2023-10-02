import React, { useContext } from "react";
import { Info, InfoContext } from "../App";
import { Object } from "ts-toolbelt";

type StringKeys = Object.SelectKeys<Info, string>;

const TextField: React.FC<{
  source: StringKeys;
  label: string;
}> = ({ label, source }) => {
  const { value, setValue } = useContext(InfoContext);

  return (
    <>
      {label}
      <input
        onChange={(e) => setValue({ [source]: e.target.value })}
        value={value[source].toString()}
      />
    </>
  );
};

export default TextField;
