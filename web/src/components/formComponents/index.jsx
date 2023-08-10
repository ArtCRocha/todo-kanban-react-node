import { Formik } from "formik";
import { FormStyle } from "./styles";
import Input from "./input";
import Textarea from "./textarea";
import Select from "./select";
import ButtonSubmit from "./buttonSubmit";
import Title from "./title";

export default function Form({
  children,
  onSubmit,
  data,
  validationSchema,
  innerRef,
}) {
  return (
    <Formik
      innerRef={innerRef}
      onSubmit={(values, actions) => {
        onSubmit(values);
      }}
      initialValues={data}
      validationSchema={validationSchema}
      validateOnMount={false}
      validateOnBlur={false}
      validateOnChange={false}
    >
      {(props) => (
        <FormStyle onSubmit={props.handleSubmit}>{children}</FormStyle>
      )}
    </Formik>
  );
}

Form.Title = Title;
Form.Input = Input;
Form.Select = Select;
Form.Textarea = Textarea;
Form.Submit = ButtonSubmit;
