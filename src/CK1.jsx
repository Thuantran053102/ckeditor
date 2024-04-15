

import { useEffect, useState, useRef } from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "ckeditor5-build-full";
import axios from "axios";

const TinyMceEditor = () => {
    const [ckeditordata, setCkeditordata] = useState("");
    const editorRef = useRef();

    const UploadAdapter = ({ loader, url }) => {
        const file = loader.file;

        const upload = () => {
            const fd = new FormData();
            fd.append("image", file);

            return new Promise((resolve, reject) => {
                axios.post(url, fd, {
                    onUploadProgress: e => {
                        console.log(
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

        return null;
    };

    const onChange = (event, editor) => {
        const data = editor.getData();
        setCkeditordata(data);
    };

    const URL = "http://cpvdev/ASP_API/api/uploadFiles";

    function CustomUploadAdapterPlugin(editor) {
        editor.plugins.get("FileRepository").createUploadAdapter = loader => {
            return new UploadAdapter(loader, URL);
        };
    }

    const showContent = () => {
        if (editorRef.current) {
            const data = editorRef.current.editor.getData();
            setCkeditordata(data);
        }
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
            }}
            className="ckeditor-wrapper"
        >

            <CKEditor

                editor={ClassicEditor}
                data="<p>Hello from CKEditor 5!</p>"
                onChange={(event, editor) => {
                    onChange(event, editor);
                }}
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
            <button type="button" onClick={showContent}>Show Content</button>
            <div className="display-content" dangerouslySetInnerHTML={{ __html: ckeditordata }}></div>
        </form>
    );
};

export default TinyMceEditor

