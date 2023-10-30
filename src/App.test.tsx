import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import "@testing-library/jest-dom/extend-expect";

describe("App", () => {
  test("Label과 Input 그리고 버튼이 제대로 렌더링 되어야 함", () => {
    // arrange: 테스트를 위한 준비
    render(<App />);

    // act: 테스트를 진행
    // getByText는 해당 텍스트를 가진 엘리먼트를 찾아줌
    // getByRole은 엘리멘트에 암묵적인 role이 부여되는데, 이를 이용해 엘리먼트를 찾아줌
    const nameLabel = screen.getByText(/이름/i); // /이름/i는 정규식으로 name 텍스트를 가진 엘리먼트를 전체를 탐색해서 찾아줌
    const nameInput = screen.getByRole("textbox"); // input 엘리먼트는 role이 textbox로 부여됨
    const checkbox = screen.getByRole("checkbox"); // checkbox 엘리먼트는 role이 checkbox로 부여됨
    const button = screen.getByRole("button"); // button 엘리먼트는 role이 button으로 부여됨

    // assert: 테스트 결과를 판별
    // toBeInTheDocument는 해당 엘리먼트가 화면에 존재하는지를 판별
    expect(nameLabel).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(checkbox).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test("이름을 입력하고 약관에 동의한 다음 버튼을 클릭하면 Alert 창으로 입력한 값이 출력되어야 함", () => {
    // arrange
    const alertMock = jest.fn();
    window.alert = alertMock; // window.alert를 mock 함수로 대체
    render(<App />);

    // element를 찾아서 변수에 할당
    const nameInput = screen.getByRole("textbox");
    const checkbox = screen.getByRole("checkbox");
    const button = screen.getByRole("button");

    // act
    // fireEvent는 엘리먼트에 이벤트를 발생시키는 함수
    // fireEvent.change(엘리먼트, { target: { value: "바꿀 값" } })는 엘리먼트의 값을 바꿔줌
    fireEvent.change(nameInput, { target: { value: "junsuk" } });
    fireEvent.click(checkbox);
    fireEvent.click(button);

    // assert
    // toHaveBeenCalledWith는 mock 함수가 특정 인자와 함께 호출되었는지를 판별
    expect(alertMock).toHaveBeenCalledWith("name: junsuk");
  });

  test("약관에 동의하지 않으면 alert 창이 출력되지 말아야 함", () => {
    // arrange
    const alertMock = jest.fn();
    window.alert = alertMock;
    render(<App />);

    const nameInput = screen.getByRole("textbox");
    const button = screen.getByRole("button");

    // act
    fireEvent.change(nameInput, { target: { value: "junsuk" } });
    fireEvent.click(button);

    // assert
    // toHaveBeenCalled는 mock 함수가 호출되었는지를 판별
    // .not을 붙여주면 mock 함수가 호출되지 않았는지를 판별
    expect(alertMock).not.toHaveBeenCalled();
  });
});
