import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../styles.css'

export default function Dummy() {
  const [value, setValue] = useState('');

  
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      [{'align':[]}],
      [{ 'color': [] }],
      ['link', 'image'],
      ['clean']   
    ],
  }

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'blockquote',
    'list', 'bullet', 'align',
    'color',
    'link', 'image',
    'clean'
  ]

  return (
    <div className='h-2/3'>
        <ReactQuill 
        theme="snow" value={value} onChange={setValue}
        modules={modules}
        formats={formats}
        className='ql-container'
  >
  </ReactQuill>

    </div>

  )
}