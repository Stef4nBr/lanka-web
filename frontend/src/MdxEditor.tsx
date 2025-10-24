
import React, { useEffect, useState, useCallback } from 'react';
import type { AnyExtension, RemirrorJSON } from 'remirror';

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

function EditorToolbar() {
  return (
    <Toolbar>
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

export default function Editor() {
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
      alert('Content saved to localStorage!');
    }
  }, [currentContent, STORAGE_KEY]);

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
            <EditorToolbar />
            <HighlightButtons />
            <button
              onMouseDown={(event) => event.preventDefault()}
              onClick={handleSave}
              style={{ marginTop: '10px' }}
            >
              Save
            </button>
          </Remirror>
        </ThemeProvider>
      </AllStyledComponent>
    </div>
  );
}