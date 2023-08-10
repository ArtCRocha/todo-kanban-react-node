import { useRef } from "react";
import { InputGroup, Label, selectStyles } from "./styles";
import Select, { components } from "react-select";
import { Field } from "formik";

export default function SelectForm({
  options,
  name,
  label,
  isLoading,
  isSearchable,
  placeHolder,
}) {
  const NoOptionsMessage = (props) => {
    return (
      <components.NoOptionsMessage {...props}>
        <span className="custom-css-class">Sem opções</span>
      </components.NoOptionsMessage>
    );
  };

  return (
    <Field name={name} placeHolder={placeHolder}>
      {({ field, form, meta }) => (
        <InputGroup>
          {label && <Label>{label}</Label>}
          <Select
            classNamePrefix="select"
            value={options?.find((x) => x.value === parseInt(field.value))}
            components={{ NoOptionsMessage }}
            isLoading={isLoading}
            cacheOptions
            loadOptions={isLoading}
            isSearchable={isSearchable}
            name={name}
            options={options}
            styles={selectStyles}
            onChange={(value) => {
              form.setFieldValue(name, value?.value);
            }}
            theme={(theme) => ({
              ...theme,
              borderRadius: 5,
              colors: {
                ...theme.colors,
                primary: "#8463a9",
                primary25: "#e1e1e1",
              },
            })}
          />
        </InputGroup>
      )}
    </Field>
  );
}
