import React, { createContext, useReducer, useState } from "react";
import TextField from "./component/TextField";
import Form from "./component/Form";
import CheckboxField from "./component/CheckboxField";

export interface Info {
  name: string;
  confirm: boolean;
}

const defaultInfo: Info = {
  name: "",
  confirm: false,
};

type PartialInfo = { name: string } | { confirm: boolean };

export const InfoContext = createContext<{
  value: Info;
  setValue: (v: PartialInfo) => void;
}>({
  value: defaultInfo,
  setValue: (v) => {},
});

function App() {
  const [info, setInfo] = useReducer((prevInfo: Info, partialInfo: any) => {
    return {
      ...prevInfo,
      ...partialInfo,
    };
  }, defaultInfo);

  const onSubmit = () => {
    if (info.confirm) {
      alert(`name: ${info.name}`);
    }
  };

  return (
    <InfoContext.Provider value={{ value: info, setValue: setInfo }}>
      <Form onSubmit={onSubmit}>
        <TextField source="name" label="이름" />
        <CheckboxField
          source="confirm"
          label="위 내용이 제출됩니다 동의하십니까?"
        />
      </Form>
    </InfoContext.Provider>
  );
}

export default App;
