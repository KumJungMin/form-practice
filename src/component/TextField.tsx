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
      {/* 재사용성을 높이기 위해 추상화된 값을 props로 넘긴다 */}
      {label}
      <input
        onChange={(e) => setValue({ ...value, [source]: e.target.value })}
        value={value[source].toString()}
      />
    </>
  );
};

export default TextField;
