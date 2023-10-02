import React, { useContext } from "react";
import { Info, InfoContext } from "../App";

const CheckboxField: React.FC<{
  source: keyof Omit<Info, "name" | "password" | "address">;
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
