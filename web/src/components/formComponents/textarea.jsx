import { InputGroup, Label, TextareaStyle } from "./styles";
import { Field } from "formik";

export default function Textarea({ label, name, placeHolder }) {
  return (
    <Field name={name} placeholder={placeHolder}>
      {({ field, form, meta }) => (
        <InputGroup>
          <Label>{label}</Label>
          <TextareaStyle
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
