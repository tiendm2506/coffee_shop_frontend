import { memo, useRef, useEffect } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import UploadAdapter from './UploadAdapter'

function PostEditor({ setEditor, setEditorReady }) {
  const editorRef = useRef(null)

  // Cleanup when unmount
  useEffect(() => {
    return () => {
      if (editorRef.current) {
        editorRef.current.destroy().catch(() => {})
        editorRef.current = null
        setEditor(null)
        setEditorReady(false)
      }
    }
  }, [])

  return (
    <div className='space-y-4 rounded-xl border bg-white p-4'>
      <CKEditor
        editor={ClassicEditor}
        onAfterDestroy={() => {
          editorRef.current = null
          setEditor(null)
          setEditorReady(false)
        }}
        config={{
          licenseKey: 'GPL',
          toolbar: [
            'heading', '|',
            'bold', 'italic', 'link',
            'bulletedList', 'numberedList', '|',
            'uploadImage', 'blockQuote', 'insertTable', '|',
            'undo', 'redo'
          ]
        }}
        onReady={(editor) => {
          editorRef.current = editor
          setEditor(editor)
          setEditorReady(true)

          editor.plugins.get('FileRepository').createUploadAdapter =
            (loader) => new UploadAdapter(loader)
        }}
      />
    </div>
  )
}

export default memo(PostEditor)