import { SelectStyle, Label, InputGroup } from "./styles";
import { Field } from "formik";

export default function Select({ label, name, placeHolder }) {
  return (
    <Field name={name} placeholder={placeHolder}>
      {(field, form, meta) => (
        <InputGroup>
          <Label>{label}</Label>
          <SelectStyle
            {...field}
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
