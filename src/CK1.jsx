import { Global, css } from "@emotion/core";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "ckeditor5-build-full";

const TinyMceEditor = () => {
    const ckWrapperStyle = css`
      position: relative;
      z-index: 1;
      &::before {
        color: rgba(192, 192, 192, 1);
        content: attr(data-placeholder);
        padding: 0 11px;
        position: absolute;
        margin: var(--ck-spacing-large) 0;
        top: 0;
        z-index: -1;
      }
    `;

    const onChange = (e) => {
        console.log(e.target.getContent());
    };

    return (
        <CKEditor
            editor={ClassicEditor}
            data="<p>Hello from CKEditor 5!</p>"
            config={{
                toolbar: {
                    items: [
                        "undo",
                        "redo",
                        "|",
                        "exportPdf",
                        "exportWord",
                        "importWord",
                        "|",
                        "showBlocks",
                        "formatPainter",
                        "findAndReplace",
                        "selectAll",
                        "wproofreader",
                        "|",
                        "heading",
                        "|",
                        "style",
                        "|",
                        "fontSize",
                        "fontFamily",
                        "fontColor",
                        "fontBackgroundColor",
                        "-",
                        "bold",
                        "italic",
                        "underline",
                        "strikethrough",
                        "subscript",
                        "superscript",
                        "code",
                        "|",
                        "removeFormat",
                        "|",
                        "specialCharacters",
                        "horizontalLine",
                        "pageBreak",
                        "|",
                        "link",
                        "insertImage",
                        "ckbox",
                        "insertTable",
                        "tableOfContents",
                        "insertTemplate",
                        "highlight",
                        "blockQuote",
                        "mediaEmbed",
                        "codeBlock",
                        "htmlEmbed",
                        "|",
                        "alignment",
                        "|",
                        "bulletedList",
                        "numberedList",
                        "outdent",
                        "indent",
                        "sourceEditing",
                        "imageUpload", // Add imageInsert to the toolbar
                    ],
                    shouldNotGroupWhenFull: true
                }
            }}
        />
    );
};

export default  TinyMceEditor 
