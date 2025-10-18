import { useCallback, useState } from "react";
import type { RemirrorJSON } from "remirror";
import { OnChangeJSON } from "@remirror/react";
import { WysiwygEditor } from "@remirror/react-editors/wysiwyg";

const STORAGE_KEY = "remirror-editor-content";

interface AppProps {
  editable?: boolean;
}

interface AppProps {
  editable?: boolean;
  initialContent?: RemirrorJSON;
}

const App: React.FC<AppProps> = ({ initialContent: initialContentProp }) => {
  const [initialContent] = useState<RemirrorJSON | undefined>(() => {
    // Use prop if provided, otherwise retrieve from localStorage
    if (initialContentProp) {
      return initialContentProp;
    }
    const content = window.localStorage.getItem(STORAGE_KEY);
    return content ? JSON.parse(content) : undefined;
  });

  const [currentContent, setCurrentContent] = useState<RemirrorJSON | undefined>(initialContent);

  const handleEditorChange = useCallback((json: RemirrorJSON) => {
    // Update current content but don't save yet
    setCurrentContent(json);
  }, []);

  const handleSave = useCallback(() => {
    if (currentContent) {
      // Store the JSON in localStorage
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(currentContent));
      alert('Content saved to localStorage!' + JSON.stringify(currentContent));
    }
  }, [currentContent]);

  return (
    <MyEditor 
      onChange={handleEditorChange} 
      initialContent={initialContent}
      onSave={handleSave}
      editable={true}
    />
  );
};

interface MyEditorProps {
  onChange: (json: RemirrorJSON) => void;
  initialContent?: RemirrorJSON;
  onSave: () => void;
  editable?: boolean;
}

const MyEditor: React.FC<MyEditorProps> = ({ onChange, initialContent, onSave, editable }) => {
  return (
    <div className="remirror-editor" style={{ padding: 16 }}>
      {/* Force editor content color to black and caret to black.
          The .ProseMirror selector targets the editable area used by Remirror/ProseMirror. */}
      <style>
        {`
          .remirror-editor .ProseMirror {
            color: #000 !important;
            caret-color: #000 !important;
          }
          /* Ensure placeholder and block elements inherit the text color */
          .remirror-editor .ProseMirror p,
          .remirror-editor .ProseMirror span {
            color: inherit;
          }
        `}
      </style>
      <WysiwygEditor placeholder="Enter text..." initialContent={initialContent} editable={editable} >
        <OnChangeJSON onChange={onChange} />
        <button onMouseDown={(event) => event.preventDefault()} onClick={onSave}>
          Save
        </button>
      </WysiwygEditor>
    </div>
  );
};

export default App;
