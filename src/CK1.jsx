import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';

const axiosJWT = axios.create();
const api = {
    _uploadfile: 'https://apigwp.cp.com.vn/webcpnew_api/api/news/upload',
};
const handleResponse = (res, handleData) => {
    const obj = {
        status: res.status,
        message: res.data.message || "Operation completed successfully.",
        data: res.data.data || res.data,
    };
    handleData(obj);
};

const handleError = (e, handleData) => {
    const status = e.response?.status || 500;
    const message = e.response?.data?.message || e.message || "An error occurred.";
    const error = e.response?.data?.error || "Unknown error";
    handleData({
        status,
        message,
        data: null,
        error,
    });
};

const POST_FORM = (Url, Data, handleData, token = false, params = false) => {

    const tokena = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJQcm9maWxlIjp7IlVzZXJOYW1lIjoiaG9hbmcucXVhbmciLCJEaXNwbGF5TmFtZSI6Ik5ndXllbiBIb2FuZyBRdWFuZyIsIkFjY291bnRTdGF1cyI6IkVuYWJsZSIsIkRlcGFydG1lbnQiOiJJVCAgTW9iaWxlIEFwcGxpY2F0aW9uIiwiQ29tcGFueSI6IkMuUC4gVmlldG5hbSBDb3Jwb3JhdGlvbiIsIkVtYWlsIjoiaG9hbmcucXVhbmdAY3AuY29tLnZuIiwiRGlyZWN0UGhvbmUiOiIiLCJQYXNzd29yZExhc3RTZXQiOiIwNi8wNy8yMDI1IDEwOjUxIiwiQmFkUGFzc3dvcmQiOiIiLCJMYXN0TG9naW4iOiIiLCJMb2dpbkNvdW50IjoiIiwiTG9ja2VkT3V0IjoiIiwiV2hlbkNyZWF0ZSI6IjA4LzA4LzIwMjIgMTc6MDEiLCJXaGVuQ2hhbmdlIjoiMDcvMDYvMjAyNSAwMzo1OCIsIkFjY291bnRFeHBpcmVzIjoiVXNlciBub3QgRm91bmQiLCJQYXRoIjoiIiwiRGVzY3JpcHRpb24iOiIiLCJJREhSIjoiIiwiVGl0bGUiOiIiLCJEb21haW4iOiJob2FuZy5xdWFuZyIsIkZsYWciOiJZIiwiRnVsbF9OYW1lIjoiSG9hbmcgTWFuaCBRdWFuZyIsIlBob25lIjoiMDkwOTAwMDAxMiIsIklzT25saW5lIjoiTiIsIlJvbGVfQ29kZSI6IkFNQ1QwMSIsIkJ1c19Db2RlIjoiQk9UMDAxIiwiU2VhcmNoIjoiSE9BTkcuUVVBTkdIT0FOR01BTkhRVUFORyJ9LCJpYXQiOjE3NDk2MzQ0MzUsImV4cCI6MTc1MDQ5ODQzNX0.7wWQnAkzYsgMKhL2VlRohv4U_NvRDUj1NjDrRtLG5A0"
    axiosJWT.post(Url, Data, {
        params: { ...params },
        headers: {
            Authorization: `Bearer ${tokena}`,
            "Content-Type": "multipart/form-data",
        },
    })
        .then(res => handleResponse(res, handleData))
        .catch(e => handleError(e, handleData));
};

const get_roles = (body, handleData) =>
    POST_FORM(api._uploadfile, body, (res) => {
        handleData(res);
    });


export default function NewsEdit() {
    const editorRef = useRef(null);
    const [content, setContent] = useState('');


    const CustomUploadAdapter = (loader) => {

        return {
            upload: () => {
                return loader.file.then((file) => {
                    const data = new FormData();
                    data.append("file", file);

                    return new Promise((resolve, reject) => {
                        get_roles(data, (res) => {
                            if (res.status === 200) {
                                const imageUrl = res.data.url || res.data;
                                resolve({ default: imageUrl });
                            } else {
                                reject(new Error("Upload failed"));
                            }
                        });
                    });
                });
            },
            abort: () => {
                console.log("Upload aborted");
            },
        };
    };

    function MyCustomUploadAdapterPlugin(editor) {
        console.log("MyCustomUploadAdapterPlugin initialized");
        editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
            return CustomUploadAdapter(loader);
        };
    }


    useEffect(() => {
        if (document.querySelector('script[src="https://cdn.ckeditor.com/ckeditor5/35.3.2/super-build/ckeditor.js"]')) {
            if (window.CKEDITOR && editorRef.current) {
                window.CKEDITOR.ClassicEditor.create(editorRef.current, {
                    toolbar: {
                        items: [
                            'exportPDF', 'exportWord', '|',
                            'findAndReplace', 'selectAll', '|',
                            'heading', '|',
                            'bold', 'italic', 'strikethrough', 'underline', 'code', 'subscript', 'superscript', 'removeFormat', '|',
                            'bulletedList', 'numberedList', 'todoList', '|',
                            'outdent', 'indent', '|',
                            'undo', 'redo',
                            '-',
                            'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor', 'highlight', '|',
                            'alignment', '|',
                            'link', 'insertImage', 'blockQuote', 'insertTable', 'mediaEmbed', 'codeBlock', 'htmlEmbed', '|',
                            'specialCharacters', 'horizontalLine', 'pageBreak', '|',
                            'textPartLanguage', '|',
                            'sourceEditing'
                        ],
                        shouldNotGroupWhenFull: true
                    },
                    placeholder: 'Welcome to CKEditor 5!',
                    fontFamily: {
                        options: [
                            'default',
                            'Arial, Helvetica, sans-serif',
                            'Courier New, Courier, monospace',
                            'Georgia, serif',
                            'Lucida Sans Unicode, Lucida Grande, sans-serif',
                            'Tahoma, Geneva, sans-serif',
                            'Times New Roman, Times, serif',
                            'Trebuchet MS, Helvetica, sans-serif',
                            'Verdana, Geneva, sans-serif'
                        ],
                        supportAllValues: true
                    },
                    fontSize: {
                        options: [10, 12, 14, 'default', 18, 20, 22],
                        supportAllValues: true
                    },
                    image: {
                        toolbar: [
                            'imageTextAlternative',
                            'imageStyle:full',
                            'imageStyle:side'
                        ]
                    },
                    extraPlugins: [MyCustomUploadAdapterPlugin],
                    removePlugins: [
                        'CKBox',
                        'CKFinder',
                        'EasyImage', // ✅ Keep removed
                        'RealTimeCollaborativeComments',
                        'RealTimeCollaborativeTrackChanges',
                        'RealTimeCollaborativeRevisionHistory',
                        'PresenceList',
                        'Comments',
                        'TrackChanges',
                        'TrackChangesData',
                        'RevisionHistory',
                        'Pagination',
                        'WProofreader',
                        'MathType', 'Base64UploadAdapter',
                        'SimpleUploadAdapter',
                    ]
                }).then(editor => {
                    window.myEditor = editor;
                    editor.setData(`<p>1111111</p>`);
                    editor.model.document.on('change:data', () => {
                        const data = editor.getData();
                        setContent(data);
                    });
                }).catch(err => {
                    console.error("CKEditor initialization error:", err);
                });
            }
            return;
        }

        const script = document.createElement("script");
        script.src = "https://cdn.ckeditor.com/ckeditor5/35.3.2/super-build/ckeditor.js";
        script.async = true;

        script.onload = () => {
            if (window.CKEDITOR && editorRef.current) {
                window.CKEDITOR.ClassicEditor.create(editorRef.current, {
                    toolbar: {
                        items: [
                            'exportPDF', 'exportWord', '|',
                            'findAndReplace', 'selectAll', '|',
                            'heading', '|',
                            'bold', 'italic', 'strikethrough', 'underline', 'code', 'subscript', 'superscript', 'removeFormat', '|',
                            'bulletedList', 'numberedList', 'todoList', '|',
                            'outdent', 'indent', '|',
                            'undo', 'redo',
                            '-',
                            'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor', 'highlight', '|',
                            'alignment', '|',
                            'link', 'insertImage', 'blockQuote', 'insertTable', 'mediaEmbed', 'codeBlock', 'htmlEmbed', '|',
                            'specialCharacters', 'horizontalLine', 'pageBreak', '|',
                            'textPartLanguage', '|',
                            'sourceEditing'
                        ],
                        shouldNotGroupWhenFull: true
                    },
                    placeholder: 'Welcome to CKEditor 5!',
                    fontFamily: {
                        options: [
                            'default',
                            'Arial, Helvetica, sans-serif',
                            'Courier New, Courier, monospace',
                            'Georgia, serif',
                            'Lucida Sans Unicode, Lucida Grande, sans-serif',
                            'Tahoma, Geneva, sans-serif',
                            'Times New Roman, Times, serif',
                            'Trebuchet MS, Helvetica, sans-serif',
                            'Verdana, Geneva, sans-serif'
                        ],
                        supportAllValues: true
                    },
                    fontSize: {
                        options: [10, 12, 14, 'default', 18, 20, 22],
                        supportAllValues: true
                    },
                    extraPlugins: [MyCustomUploadAdapterPlugin],
                    removePlugins: [
                        'CKBox',
                        'CKFinder',
                        'EasyImage',
                        'RealTimeCollaborativeComments',
                        'RealTimeCollaborativeTrackChanges',
                        'RealTimeCollaborativeRevisionHistory',
                        'PresenceList',
                        'Comments',
                        'TrackChanges',
                        'TrackChangesData',
                        'RevisionHistory',
                        'Pagination',
                        'WProofreader',
                        'MathType'
                    ]
                }).then(editor => {
                    window.myEditor = editor;
                    editor.setData(`<p>1111111</p>`);
                    editor.model.document.on('change:data', () => {
                        const data = editor.getData();
                        setContent(data);
                    });
                }).catch(err => {
                    console.error("CKEditor initialization error:", err);
                });
            }
        };

        document.body.appendChild(script);

        return () => {
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, []);

    return (
        <div id="container" style={{ width: "1000px", margin: "20px auto" }}>
            <div ref={editorRef} style={{ minHeight: "200px" }}></div>

            <hr />

            <h3>Nội dung CKEditor:</h3>
            <div className='display-content ck-content' style={{ border: "1px solid #ccc", padding: "10px", background: "#f9f9f9" }}>
                <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>
        </div>
    );
}