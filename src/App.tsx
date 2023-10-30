import React, { createContext, useReducer, useState } from "react";
import TextField from "./component/TextField";
import Form from "./component/Form";
import CheckboxField from "./component/CheckboxField";

export interface Info {
  name: string;
  password: string;
  confirm: boolean;
}

const defaultInfo: Info = {
  name: "",
  password: "",
  confirm: false,
};

export const InfoContext = createContext<{
  value: Info;
  setValue: (v: Info) => void;
}>({
  value: defaultInfo,
  setValue: (v) => {},
});

function App() {
  // {name: 'junsuk'}
  // {confirm: true / false}
  // useReducer(함수(reducer), 초기값)
  // => reducer(state, action)은 state를 변경하는 함수이다.
  // ==> state는 이전 상태이다.
  // ==> action은 dispatch할 때 넘어오는 값임(인자)
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
        <TextField
          source="name"
          label="이름"
        />
        <CheckboxField
          source="confirm"
          label="위 내용이 제출됩니다 동의하십니까?"
        />
      </Form>
    </InfoContext.Provider>
  );
}

export default App;
