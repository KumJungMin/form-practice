import React, { useContext } from "react";
import { Info, InfoContext } from "../App";

const TextField: React.FC<{
  source: keyof Info;
  label: string;
}> = ({ label, source }) => {
  // useContext는 contextAPI를 사용하기 위한 함수입니다.
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
