import React, { createContext, useState } from "react";
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

// createContext는 contextAPI를 사용하기 위한 함수입니다.
// contextAPI는 상위 컴포넌트에서 하위 컴포넌트로 데이터를 전달하기 위한 방법입니다.
export const InfoContext = createContext({
  value: defaultInfo,
  setValue: (v) => {},
});

function App() {
  const [info, setInfo] = useState<Info>(defaultInfo);

  const onSubmit = () => {
    if (info.confirm) {
      alert(`name: ${info.name}`);
    }
  };

  return (
    // Provider는 contextAPI를 사용하기 위한 컴포넌트입니다.
    // value는 하위 컴포넌트에서 사용할 수 있는 데이터입니다.
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
