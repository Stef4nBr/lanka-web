import { useState, useEffect } from "react";
import { Remirror, useRemirror } from "@remirror/react";
import { RemirrorJSON } from "remirror";
import NavBar from "./NavBar";
import Fabric from "./Fabric";
import MdxEditor from "./MdxEditor";
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

  const [initialContent, setInitialContent] = useState<RemirrorJSON | undefined>(() => {
    const content = window.localStorage.getItem("remirror-editor-content");
    return content ? JSON.parse(content) : { type: "doc", content: []};
  });

  // Trigger on mount/page reload
  useEffect(() => {
    setReloadTrigger(prev => prev + 1);
  }, []);

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
        const { json } = response.data;
        const parsedContent = json ? JSON.parse(json) : { type: "doc", content: []};
        window.localStorage.setItem("remirror-editor-content", JSON.stringify(parsedContent));
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
      />

      <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
            <h1 style={{ margin: 0, textAlign: "center", flex: 1 }}>Welcome to LanParty</h1>
          {authenticated && (
            <button
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
              border: "1px solid #121111ff",
              borderRadius: "8px",
              padding: "20px",
              background: "linear-gradient(135deg, #e7dadaff 40%, #cfcfcf 70%, #b0c4de 100%)",
              boxShadow:
                "0 8px 32px 0 rgba(31, 38, 135, 0.15), 0 1.5px 8px 0 rgba(80, 80, 80, 0.08)",
              transition: "box-shadow 0.2s",
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
      <Fabric />
    </>
  );
}

export default LeandingPage;
