import React, { useContext } from "react";
import { Info, InfoContext } from "../App";
import { Object } from "ts-toolbelt";

type BooleanKeys = Object.SelectKeys<Info, boolean>;

const CheckboxField: React.FC<{
  source: BooleanKeys;
  label: string;
}> = ({ label, source }) => {
  const { value, setValue } = useContext(InfoContext);

  return (
    <>
      {label}
      <input
        onChange={(e) => setValue({ [source]: e.target.checked })}
        value={value[source].toString()}
        type={"checkbox"}
      />
    </>
  );
};

export default CheckboxField;
