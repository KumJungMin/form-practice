import React, { useState } from "react";
import TextField from "./component/TextField";
import Form from "./component/Form";
import CheckboxField from "./component/CheckboxField";

export interface Info {
  name: string;
  password: string;
  confirm: boolean;
}

function App() {
  const [info, setInfo] = useState<Info>({
    name: "",
    password: "",
    confirm: false,
  });

  const onSubmit = () => {
    if (info.confirm) {
      alert(`name: ${info.name}`);
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <TextField source="name" value={info} setValue={setInfo} label="이름" />
      <CheckboxField
        value={info}
        source="confirm"
        setValue={setInfo}
        label="위 내용이 제출됩니다 동의하십니까?"
      />
    </Form>
  );
}

export default App;
