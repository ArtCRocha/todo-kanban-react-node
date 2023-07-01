import { SelectStyle, Label, InputGroup, Option } from "./styles";
import { Field } from "formik";

export default function Select({ label, name, placeHolder, array }) {
  return (
    <Field name={name} placeholder={placeHolder}>
      {({ field, form, meta }) => (
        <InputGroup>
          <Label>{label}</Label>
          <SelectStyle
            {...field}
            name={name}
            placeholder={placeHolder}
            value={field.value}
            onChange={form.handleChange}
          >
            {array?.map((column, index) => (
              <Option key={index} value={column.id}>
                {column.name}
              </Option>
            ))}
          </SelectStyle>
        </InputGroup>
      )}
    </Field>
  );
}
