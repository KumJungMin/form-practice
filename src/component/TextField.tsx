import React, { useContext } from "react";
import { Info, InfoContext, PartialInfo } from "../App";
import { Object } from "ts-toolbelt";

type StringKeys = Object.SelectKeys<Info, string>;

const TextField: React.FC<{
  source: StringKeys;
  label: string;
  validate: any;
}> = ({ label, source, validate }) => {
  const { value, setValue } = useContext(InfoContext);
  const [error, setError] = React.useState<string>();

  React.useEffect(() => {
    // [minLength, maxLength]
    const errors: (string | undefined)[] = validate.map(
      (validationFunc: any) => {
        if (value[source]) {
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
        onChange={(e) => setValue({ [source]: e.target.value } as PartialInfo)}
        value={value[source].toString()}
      />
      {error && <p style={{ color: "crimson" }}>{error}</p>}
    </>
  );
};

export default TextField;
