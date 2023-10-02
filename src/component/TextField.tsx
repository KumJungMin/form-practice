import React, { useContext } from "react";
import { Info, InfoContext } from "../App";

const TextField: React.FC<{
  source: keyof Info;
  label: string;
}> = ({ label, source }) => {
  const { value, setValue } = useContext(InfoContext);

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
