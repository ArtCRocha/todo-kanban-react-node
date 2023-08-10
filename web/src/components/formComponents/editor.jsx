import { Field } from "formik";
import { InputGroup, Label } from "./styles";
import { Editor } from "@tinymce/tinymce-react";

export default function EditorForm({ name, label, placeHolder }) {
  return (
    <Field name={name} label={label} placeHolder={placeHolder}>
      {({ field, form, meta }) => (
        <InputGroup>
          <Label>{label}</Label>
          <Editor
            name={field.name}
            onEditorChange={(value) => {
              form.setFieldValue(name, value);
            }}
            value={field.value}
            tinymceScriptSrc="https://d3b0mngmb0q805.cloudfront.net/js/tinymce/tinymce.min.js"
            init={{
              height: 300,
              menubar: true,
              statusbar: false,
              language: "pt_BR",
              promotion: false,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "help",
              ],
              toolbar:
                "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help | styleselect | fontselect | bold italic | alignleft aligncenter alignright alignjustify | outdent indent",
              fontsize_formats: "8pt 10pt 12pt 14pt 18pt 24pt 36pt",
              font_formats:
                "Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats",
              content_style:
                "@import url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;0,1000;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900;1,1000&display=swap'); body { font-family:Nunito }",
            }}
          />
        </InputGroup>
      )}
    </Field>
  );
}
