import { Global, css } from "@emotion/core";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "ckeditor5-build-full";
import axios from "axios";
const TinyMceEditor = () => {



    const UploadAdapter = ({ loader, url }) => {
        const file = loader.file;

        const upload = () => {
            const fd = new FormData();
            fd.append("image", file);

            return new Promise((resolve, reject) => {
                axios.post(url, fd, {
                    onUploadProgress: e => {
                        console.log(
                            // show upload process
                            Math.round((e.loaded / e.total) * 100) + " %"
                        );
                    }
                })
                    .then(response => {
                        resolve(response);
                    })
                    .catch(error => {
                        reject("Server Error");
                        console.log("Server Error : ", error);
                    });
            });
        };

        upload();

        return null; // You can return null or any other component if needed
    };

  
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

    const URL = "http://cpvdev/ASP_API/api/uploadFiles"; // for example

    function CustomUploadAdapterPlugin(editor) {
        editor.plugins.get("FileRepository").createUploadAdapter = loader => {
            // Create new object and pass server url
            return new UploadAdapter(loader, URL);
            console.log(loader)
        };
    }

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
                        'ckboxImageEdit',
                        'imageInsert',
                    ],
                    shouldNotGroupWhenFull: true
                },
                image: {
                    toolbar: [
                        'comment',
                        'imageTextAlternative',
                        'toggleImageCaption',
                        'imageStyle:inline',
                        'imageStyle:block',
                        'imageStyle:side',
                        'linkImage'
                    ]
                },
                language: "en", // fa - for persian language ( rtl )
                extraPlugins: [CustomUploadAdapterPlugin]
            }}
        />
    );
};

export default TinyMceEditor 
