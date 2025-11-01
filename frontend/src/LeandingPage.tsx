import { useState, useEffect, useRef } from "react";
import { Remirror, useRemirror } from "@remirror/react";
import { set, type RemirrorJSON } from "remirror";
import NavBar from "./NavBar.jsx";
import FabricTest from "./Fabric.jsx";
import MdxEditor from "./MdxEditor.tsx";
import "./index.css";

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
  TextHighlightExtension,
} from "remirror/extensions";
import { TableExtension } from "@remirror/extension-react-tables";
import axios from "axios";

function LeandingPage() {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [reloadTrigger, setReloadTrigger] = useState(0);
  const fabricRef = useRef<HTMLDivElement>(null);

  const [initialContent, setInitialContent] = useState<
    RemirrorJSON | undefined
  >(() => {
    const content = window.localStorage.getItem("remirror-editor-content");
    return content ? JSON.parse(content) : undefined;
  });

  // Trigger on mount/page reload
  useEffect(() => {
    setReloadTrigger((prev) => prev + 1);
  }, []);

  const handleHowToPlayClick = () => {
    fabricRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const loadContent = async () => {
      if (!authToken || !userName) return;

      try {
        const response = await axios.get(
          `http://localhost:4000/api/content/load/${userName}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        const { mdxContent } = response.data;
        const { fabricContent } = response.data;
        const parsedContent = mdxContent ? JSON.parse(mdxContent) : undefined;
        const parsedFabricContent = fabricContent
          ? JSON.parse(fabricContent)
          : undefined;
        window.localStorage.setItem(
          "remirror-editor-content",
          JSON.stringify(parsedContent)
        );
        parsedFabricContent &&
          window.localStorage.setItem(
            "fabric-editor-content",
            JSON.stringify(parsedFabricContent)
          );
        setInitialContent(parsedContent);
      } catch (error) {
        console.error("Error loading content:", error);
      }
    };

    loadContent();
  }, [authToken, userName, reloadTrigger]);

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
      <NavBar
        onTokenChange={setAuthToken}
        onAuthChange={setAuthenticated}
        loginUser={setUserName}
        onHowToPlayClick={handleHowToPlayClick}
      />

      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <h1 style={{ margin: '20px' }}>Announcements</h1>
          {authenticated && (
            <button
              style={{ margin: "15px" }}
              onClick={() => setShowEditor(!showEditor)}
              className="btn btn-primary"
              title={showEditor ? "Leave Editor" : "Show Editor"}
            >
              <i
                className={`bi ${
                  showEditor ? "bi-arrow-90deg-left" : "bi-pencil"
                }`}
              ></i>
            </button>
          )}
        </div>

        {showEditor && authenticated && (
          <MdxEditor token={authToken} loginUser={userName} />
        )}
        {!showEditor && (
          <>
            <div
              className="remirror-editor"
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
        <div ref={fabricRef}>
          <FabricTest
            authenticated={authenticated}
            loginUser={userName}
            editMode={showEditor}
          />
        </div>
      </div>
    </>
  );
}

export default LeandingPage;
