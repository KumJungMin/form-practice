import React, { createContext, useReducer } from "react";
import TextField from "./component/TextField";
import Form from "./component/Form";
import CheckboxField from "./component/CheckboxField";
import { checked, maxLength, minLength } from "./validation";

export interface Info {
  name: string;
  password: string;
  confirm: boolean;
}

export type PartialInfo = {
  [infoKey in keyof Info]: Record<infoKey, Info[infoKey]>;
}[keyof Info];

const defaultInfo: Info = {
  name: "",
  password: "",
  confirm: false,
};

export const InfoContext = createContext<{
  value: Info;
  setValue: (v: PartialInfo) => void;
}>({
  value: defaultInfo,
  setValue: (v) => {},
});

function App() {
  // {name: 'junsuk'}
  // {confirm: true / false}
  const [info, setInfo] = useReducer(
    (prevInfo: Info, partialInfo: PartialInfo) => {
      return {
        ...prevInfo,
        ...partialInfo,
      };
    },
    defaultInfo
  );

  const onSubmit = () => {
    if (info.confirm) {
      alert(`name: ${info.name}`);
    }
  };

  return (
    <InfoContext.Provider value={{ value: info, setValue: setInfo }}>
      <Form onSubmit={onSubmit}>
        <TextField
          source="name"
          label="이름"
          validate={[minLength(3), maxLength(6)]}
        />
        <TextField
          source="password"
          label="패스워드"
          validate={[minLength(6), maxLength(12)]}
        />
        <CheckboxField
          source="confirm"
          label="위 내용이 제출됩니다 동의하십니까?"
          validate={[checked]}
        />
      </Form>
    </InfoContext.Provider>
  );
}

export default App;
