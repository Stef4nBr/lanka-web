import { useState } from "react";
import { Remirror, useRemirror } from "@remirror/react";
import type { RemirrorJSON } from "remirror";
import NavBar from "./NavBar.jsx";
import FabricTest from "./Fabric.jsx";
import MdxEditor from "./MdxEditor.tsx";
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
  NodeFormattingExtension,
  TextHighlightExtension
} from "remirror/extensions";
import { TableExtension } from '@remirror/extension-react-tables';

function LeandingPage() {
  const [showEditor, setShowEditor] = useState(false);

  const [initialContent] = useState<RemirrorJSON | undefined>(() => {
    const content = window.localStorage.getItem("remirror-editor-content");
    console.log("Loaded content:", content);
    return content ? JSON.parse(content) : undefined;
  });

  const { manager } = useRemirror({
    extensions: () => [
      new BoldExtension({}),
      new ItalicExtension({}),
      new HeadingExtension({}),
      new StrikeExtension({}),
      new UnderlineExtension({}),
      new CodeExtension({}),
      new BlockquoteExtension({}),
      new BulletListExtension({}),
      new OrderedListExtension({}),
      new ListItemExtension({}),
      new LinkExtension({}),
      new ImageExtension({}),
      new TableExtension({}),
      new TableCellExtension({}),
      new HorizontalRuleExtension({}),
      new HardBreakExtension({}),
      new TrailingNodeExtension({}),
      new TaskListExtension({}),
      new NodeFormattingExtension({}),
      new TextHighlightExtension({}),
    ],
    content: initialContent,
  });

  return (
    <>
      <NavBar onAuthChange={undefined} onTokenChange={undefined} />
      <button
        onClick={() => setShowEditor(!showEditor)}
        className="btn btn-primary"
        title={showEditor ? "Hide Editor" : "Show Editor"}
      >
        <i className={`bi ${showEditor ? "bi-eye-slash" : "bi-pencil"}`}></i>
      </button>
      {showEditor && <MdxEditor />}

      <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
        {!showEditor && (
          <>
            <h1>Rendered Document</h1>
            <div
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "20px",
                backgroundColor: "#e7dadaff",
              }}
            >
              <Remirror
                manager={manager}
                initialContent={initialContent}
                editable={false}
              />
            </div>
          </>
        )}
      </div>
      <FabricTest />
    </>
  );
}

export default LeandingPage;
