import React, { useState } from "react";
import TextField from "./component/TextField";
import Form from "./component/Form";
import CheckboxField from "./component/CheckboxField";

// flocking rule이란?
// 아래 3단계를 걸쳐, 중복 코드를 제거하고, 코드를 재사용 가능하게 만드는 것을 말합니다.
// 1.코드들은 비교하여 가장 비슷한 부분을 찾는다.
// 2. 비슷한 코드 사이에 다른 것을 찾는다.
// 3. 차이가 발생하는 부분을 제거하여 하나의 일반화된 코드로 만든다.

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
    // 1. 두 필드의 공통점은 value, setValue 동작을 한다는 점
    // 2. 다른 점은 설정하는 value가 다르다는 점
    // 3. 각 컴포넌트 내부에서 추상화된 props를 받도록 수정하면 됨
    <Form onSubmit={onSubmit}>
      <TextField
        source="name"
        value={info}
        setValue={setInfo}
        label="이름"
      />
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
