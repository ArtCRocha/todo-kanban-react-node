import { InputStyle, Label, InputGroup } from "./styles";
import { Field } from "formik";

export default function Input({ label, name, placeHolder }) {
  return (
    <Field name={name} placeholder={placeHolder}>
      {({ field, form, meta }) => (
        <InputGroup>
          <Label>{label}</Label>
          <InputStyle
            {...field}
            type="text"
            name={name}
            placeholder={placeHolder}
            value={field.value}
            onChange={form.handleChange}
          />
        </InputGroup>
      )}
    </Field>
  );
}
