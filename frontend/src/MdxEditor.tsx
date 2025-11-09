
import React, {  useState, useCallback } from 'react';
import type {  RemirrorJSON } from 'remirror';

import {
  Remirror,
  ThemeProvider,
  useCommands,
  useRemirror,
  OnChangeJSON,
} from '@remirror/react';
import { AllStyledComponent } from "@remirror/styles/emotion";

import {
  BoldExtension,
  HeadingExtension,
  StrikeExtension,
  UnderlineExtension,
  ListItemExtension,
  OrderedListExtension,
  BlockquoteExtension,
  BulletListExtension,
  CodeExtension,
  HardBreakExtension,
  HorizontalRuleExtension,
  ImageExtension,
  ItalicExtension,
  LinkExtension,
  TableCellExtension,
  TaskListExtension,
  TrailingNodeExtension,
  DropCursorExtension,
  NodeFormattingExtension,
  TextColorExtension,
  TextHighlightExtension,
} from "remirror/extensions";

import {
  Toolbar,
  BasicFormattingButtonGroup,
  HeadingLevelButtonGroup,
  HistoryButtonGroup,
  VerticalDivider,
  ListButtonGroup,
  InsertHorizontalRuleButton,
  IndentationButtonGroup,
  TextAlignmentButtonGroup,
  CommandButtonGroup,
  CommandMenuItem,
  DropdownButton,
  
} from "@remirror/react-ui";
import axios from 'axios';

const extensions = () => [
  new HeadingExtension({}),
  new BoldExtension({}),
  new ItalicExtension({}),
  new UnderlineExtension({}),
  new StrikeExtension({}),
  new CodeExtension({}),
  new BlockquoteExtension({}),
  new BulletListExtension({}),
  new OrderedListExtension({}),
  new ListItemExtension({}),
  new LinkExtension({ autoLink: true }),
  new TableCellExtension({}),
  new HorizontalRuleExtension({}),
  new HardBreakExtension({}),
  new TrailingNodeExtension({}),
  new TaskListExtension({}),
  new ImageExtension({ enableResizing: true }),
  new DropCursorExtension({}),
  new NodeFormattingExtension({}),
  new TextColorExtension({}),
  new TextHighlightExtension({}),
];

const LineHeightButtonDropdown = () => {
  const { setLineHeight } = useCommands();
  return (
    <CommandButtonGroup>
      <DropdownButton aria-label='Line height' icon='lineHeight'>
        <CommandMenuItem
          commandName='setLineHeight'
          onSelect={() => setLineHeight(1)}
          enabled={setLineHeight.enabled(1)}
          label='Narrow'
        />
        <CommandMenuItem
          commandName='setLineHeight'
          onSelect={() => setLineHeight(2)}
          enabled={setLineHeight.enabled(2)}
          label='Wide'
        />
      </DropdownButton>
    </CommandButtonGroup>
  );
};

const HighlightButtons = () => {
  const commands = useCommands();
  return (
    <>
      <button
        onMouseDown={(event) => event.preventDefault()}
        onClick={() => commands.setTextHighlight('red')}
      >
        Highlight red
      </button>
      <button
        onMouseDown={(event) => event.preventDefault()}
        onClick={() => commands.setTextHighlight('green')}
      >
        Highlight green
      </button>
      <button
        onMouseDown={(event) => event.preventDefault()}
        onClick={() => commands.removeTextHighlight()}
      >
        Remove
      </button>
    </>
  );
};

const TextColorButtons = () => {
  const commands = useCommands();
  return (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '8px' }}>
      <span style={{ fontWeight: 'bold', marginRight: '4px' }}>Text Color:</span>
      <button
        onMouseDown={(event) => event.preventDefault()}
        onClick={() => commands.setTextColor('red')}
        style={{ 
          backgroundColor: 'red', 
          color: 'white', 
          border: '1px solid #ccc',
          borderRadius: '4px',
          padding: '4px 12px',
          cursor: 'pointer'
        }}
      >
        Red
      </button>
      <button
        onMouseDown={(event) => event.preventDefault()}
        onClick={() => commands.setTextColor('blue')}
        style={{ 
          backgroundColor: 'blue', 
          color: 'white', 
          border: '1px solid #ccc',
          borderRadius: '4px',
          padding: '4px 12px',
          cursor: 'pointer'
        }}
      >
        Blue
      </button>
      <button
        onMouseDown={(event) => event.preventDefault()}
        onClick={() => commands.setTextColor('green')}
        style={{ 
          backgroundColor: 'green', 
          color: 'white', 
          border: '1px solid #ccc',
          borderRadius: '4px',
          padding: '4px 12px',
          cursor: 'pointer'
        }}
      >
        Green
      </button>
      <button
        onMouseDown={(event) => event.preventDefault()}
        onClick={() => commands.setTextColor('orange')}
        style={{ 
          backgroundColor: 'orange', 
          color: 'white', 
          border: '1px solid #ccc',
          borderRadius: '4px',
          padding: '4px 12px',
          cursor: 'pointer'
        }}
      >
        Orange
      </button>
      <button
        onMouseDown={(event) => event.preventDefault()}
        onClick={() => commands.setTextColor('purple')}
        style={{ 
          backgroundColor: 'purple', 
          color: 'white', 
          border: '1px solid #ccc',
          borderRadius: '4px',
          padding: '4px 12px',
          cursor: 'pointer'
        }}
      >
        Purple
      </button>
      <button
        onMouseDown={(event) => event.preventDefault()}
        onClick={() => commands.setTextColor('#000000')}
        style={{ 
          backgroundColor: 'black', 
          color: 'white', 
          border: '1px solid #ccc',
          borderRadius: '4px',
          padding: '4px 12px',
          cursor: 'pointer'
        }}
      >
        Black
      </button>
      <button
        onMouseDown={(event) => event.preventDefault()}
        onClick={() => commands.removeTextColor()}
        style={{ 
          backgroundColor: '#f5f5f5', 
          color: '#333', 
          border: '1px solid #ccc',
          borderRadius: '4px',
          padding: '4px 12px',
          cursor: 'pointer'
        }}
      >
        Remove Color
      </button>
    </div>
  );
};

function EditorToolbar() {
  return (
    <Toolbar  style={{ padding: '8px' }}>
      <HistoryButtonGroup />
      <VerticalDivider />
      <HeadingLevelButtonGroup />
      <VerticalDivider />
      <BasicFormattingButtonGroup />
      <VerticalDivider />
      <ListButtonGroup />
      <VerticalDivider />
      <InsertHorizontalRuleButton />
      <VerticalDivider />
      <TextAlignmentButtonGroup />
      <VerticalDivider />
      <IndentationButtonGroup />
      <VerticalDivider />
      <LineHeightButtonDropdown />
    </Toolbar>
  );
}

export default function Editor({ token, loginUser }: { token: any; loginUser: any }) {
  const STORAGE_KEY = 'remirror-editor-content';

  const [initialContent] = useState<RemirrorJSON | undefined>(() => {
    // Retrieve the JSON from localStorage (or undefined if not found)
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
      const fabricContent = window.localStorage.getItem('fabric-editor-content');
      
      // Create FormData for multipart/form-data
      const formData = new FormData();
      formData.append('user_id', loginUser);
      formData.append('mdxContent', JSON.stringify(currentContent));
      fabricContent && formData.append('fabricContent', JSON.stringify(fabricContent));
      
      axios.post('http://localhost:4000/api/content/save', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(() => {
          alert('Content saved!');
        })
        .catch((error) => {
          console.error('Error saving content:', error);
          alert('Failed to save content.');
        });
    }
  }, [currentContent, loginUser, token]);

  const { manager, state } = useRemirror({
    extensions,
    content: initialContent,
    stringHandler: "html",
  });

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
      <AllStyledComponent>
        <ThemeProvider>
          <Remirror
            manager={manager}
            initialContent={state}
            autoFocus
            autoRender="end"

          >
            <OnChangeJSON onChange={handleEditorChange} />
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
              <button
                className="btn btn-success"
                onMouseDown={(event) => event.preventDefault()}
                onClick={handleSave}
              >
                <i className="bi bi-save2" style={{ marginRight: '8px' }}></i>
                 Save 
              </button>
            </div>
            <EditorToolbar />
            <HighlightButtons />
            <TextColorButtons />
          </Remirror>
        </ThemeProvider>
      </AllStyledComponent>
    </div>
  );
}