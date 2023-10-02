import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import "@testing-library/jest-dom/extend-expect";

describe("App", () => {
  test("Label과 Input 그리고 버튼이 제대로 렌더링 되어야 함", () => {
    // arrange
    render(<App />);

    const nameLabel = screen.getByText(/이름/i);
    const nameInput = screen.getByTestId("name");

    const passwordLabel = screen.getByText(/패스워드/i);
    const passwordInput = screen.getByTestId("password");

    const checkbox = screen.getByRole("checkbox");
    const button = screen.getByRole("button");

    // assert
    expect(nameLabel).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();

    expect(passwordLabel).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();

    expect(checkbox).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test("이름을 입력하고 약관에 동의한 다음 버튼을 클릭하면 Alert 창으로 입력한 값이 출력되어야 함", () => {
    // arrange
    const alertMock = jest.fn();
    window.alert = alertMock;
    render(<App />);

    const nameInput = screen.getByTestId("name");
    const checkbox = screen.getByRole("checkbox");
    const button = screen.getByRole("button");

    // act
    fireEvent.change(nameInput, { target: { value: "junsuk" } });
    fireEvent.click(checkbox);
    fireEvent.click(button);

    // assert
    expect(alertMock).toHaveBeenCalledWith("name: junsuk");
  });

  test("약관에 동의하지 않으면 alert 창이 출력되지 말아야 함", () => {
    // arrange
    const alertMock = jest.fn();
    window.alert = alertMock;
    render(<App />);

    const nameInput = screen.getByTestId("name");
    const button = screen.getByRole("button");

    // act
    fireEvent.change(nameInput, { target: { value: "junsuk" } });
    fireEvent.click(button);

    // assert
    expect(alertMock).not.toHaveBeenCalled();
  });

  test("이름은 3자 미만 입력하면 에러가 출력되어야 함", () => {
    // arrange
    render(<App />);
    const nameInput = screen.getByTestId("name");

    //act
    fireEvent.change(nameInput, { target: { value: "j" } });

    //assert
    expect(screen.getByText("3자 이상 입력해주세요")).toBeInTheDocument();
  });

  test("이름은 6자 초과 입력하면 에러가 출력되어야 함", () => {
    // arrange
    render(<App />);
    const nameInput = screen.getByTestId("name");

    //act
    fireEvent.change(nameInput, { target: { value: "junsuk1" } });

    //assert
    expect(screen.getByText("6자 이하 입력해주세요")).toBeInTheDocument();
  });

  test("패스워드는 6자 이상, 12자 이하 입력되어야 함", () => {
    // arrange
    render(<App />);
    const passwordInput = screen.getByTestId("password");

    //act
    fireEvent.change(passwordInput, { target: { value: "junsuk" } });

    //assert
    expect(screen.queryByText("6자 이상 입력해주세요")).toBeNull();
    expect(screen.queryByText("12자 이하 입력해주세요")).toBeNull();
  });

  test("패스워드는 6자 미만 입력하면 에러가 출력되어야 함", () => {
    // arrange
    render(<App />);
    const passwordInput = screen.getByTestId("password");

    //act
    fireEvent.change(passwordInput, { target: { value: "j" } });

    //assert
    expect(screen.getByText("6자 이상 입력해주세요")).toBeInTheDocument();
  });

  test("패스워드는 12자 초과 입력하면 에러가 출력되어야 함", () => {
    // arrange
    render(<App />);
    const passwordInput = screen.getByTestId("password");

    //act
    fireEvent.change(passwordInput, { target: { value: "j".repeat(13) } });

    //assert
    expect(screen.getByText("12자 이하 입력해주세요")).toBeInTheDocument();
  });

  test("약관에 동의하지 않으면 에러가 출력되어야 함", () => {
    // arrange
    render(<App />);
    const checkbox = screen.getByRole("checkbox");

    //act
    fireEvent.click(checkbox);
    fireEvent.click(checkbox);

    //assert
    expect(screen.getByText("반드시 체크해주세요.")).toBeInTheDocument();
  });
});
