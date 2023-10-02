import React, { useContext } from "react";
import { Info, InfoContext } from "../App";
import { Object } from "ts-toolbelt";

type BooleanKeys = Object.SelectKeys<Info, boolean>;

const CheckboxField: React.FC<{
  source: BooleanKeys;
  label: string;
  validate: any;
}> = ({ label, source, validate }) => {
  const { value, setValue } = useContext(InfoContext);
  const [error, setError] = React.useState<string>();

  React.useEffect(() => {
    // [checked]
    const errors: (string | undefined)[] = validate.map(
      (validationFunc: any) => {
        if (value[source] !== undefined) {
          return validationFunc(value[source]);
        }
      }
    );

    const err = errors.find((error) => error);
    setError(err);
  }, [value[source]]);

  return (
    <>
      {label}
      <input
        onChange={(e) => setValue({ [source]: e.target.checked })}
        value={value[source].toString()}
        type={"checkbox"}
      />
      {error && <p style={{ color: "crimson" }}>{error}</p>}
    </>
  );
};

export default CheckboxField;
