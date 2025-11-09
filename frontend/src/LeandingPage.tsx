import { useState, useEffect, useRef } from "react";
import { Remirror, useRemirror } from "@remirror/react";
import { RemirrorJSON } from "remirror";
import NavBar from "./NavBar";
import FabricTest from "./Fabric";
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
  TextColorExtension,
} from "remirror/extensions";
import { TableExtension } from "@remirror/extension-react-tables";
import axios from "axios";

function LeandingPage() {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [reloadTrigger, setReloadTrigger] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const fabricRef = useRef<HTMLDivElement>(null);

  const [initialContent, setInitialContent] = useState<
    RemirrorJSON | undefined
  >(() => {
    const content = window.localStorage.getItem("remirror-editor-content");
    return content ? JSON.parse(content) : { type: "doc", content: [] };
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

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/content/load/${userName ? userName : 'anonymous'}`,
          {
            headers: { Authorization: `Bearer ${authToken}` },
          }
        );
        const { mdxContent } = response.data;
        const { fabricContent } = response.data;
        const parsedContent = mdxContent ? JSON.parse(mdxContent) : { type: "doc", content: [] };
        const parsedFabricContent = fabricContent ? JSON.parse(fabricContent): undefined;
        window.localStorage.setItem("remirror-editor-content",JSON.stringify(parsedContent));
        parsedFabricContent &&
        window.localStorage.setItem("fabric-editor-content", parsedFabricContent);
        setInitialContent(parsedContent);

      } catch (error) {
        console.error("Error loading content:", error);
      } finally {
        setIsLoading(false);
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
      new TextColorExtension({}),
    ],
    content: initialContent,
  });

  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '1.5rem',
        color: '#667eea'
      }}>
        Loading...
      </div>
    );
  }

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
          <h1 style={{ 
            margin: '20px',
            fontSize: '2.5rem',
            fontWeight: '700',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            position: 'relative',
            paddingBottom: '10px',
            borderBottom: '3px solid #667eea',
            display: 'inline-block'
          }}>
             Announcements
          </h1>
          {authenticated && (
            <button
              style={{ margin: "15px" }}
              onClick={() => setShowEditor(!showEditor)}
              className="btn btn-primary"
              title={showEditor ? "Leave Editor" : "Show Editor"}
            >
              <i
                className={`bi ${showEditor ? "bi-arrow-90deg-left" : "bi-pencil"
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
        <div ref={fabricRef}>
          <FabricTest
            authenticated={authenticated}
            loginUser={userName}
            editMode={showEditor}
            token={authToken}
          />
        </div>
      </div>
    </>
  );
}

export default LeandingPage;
