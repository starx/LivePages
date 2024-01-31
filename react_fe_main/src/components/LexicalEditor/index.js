import {useState, useEffect, useContext, useRef} from 'react';
import io from 'socket.io-client';
import { $getRoot, $createNode } from 'lexical';
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import TreeViewPlugin from "./plugins/TreeViewPlugin";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TRANSFORMERS } from "@lexical/markdown";

import ListMaxIndentLevelPlugin from "./plugins/ListMaxIndentLevelPlugin";
import CodeHighlightPlugin from "./plugins/CodeHighlightPlugin";
import AutoLinkPlugin from "./plugins/AutoLinkPlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import editorTheme from "./themes/basicTheme";
import { SocketContext } from '../../socketContext';

// When the editor changes, you can get notified via the
// OnChangePlugin!

function UpdatePlugin() {
  const [editor] = useLexicalComposerContext();
  const socket = useContext(SocketContext);
  
  // This ref helps prevent update loops by flagging programmatically
  // caused updates as opposed to user-initiated updates.
  const isProgrammaticUpdateRef = useRef(false);

  useEffect(() => {
    if (socket) {
      const handleUpdateContent = (content) => {
        isProgrammaticUpdateRef.current = true; // Flag the update as programmatic

        // Parse and update the editor state
        const editorState = editor.parseEditorState(content.text);
        editor.setEditorState(editorState);

        // Reset the flag after the state update
        //
        // A setTimeout with a delay of 0 resets the 
        // flag after the current call stack clears. 
        // This ensures that the flag is reset after 
        // the Lexical editor has processed the update.
        setTimeout(() => {
          isProgrammaticUpdateRef.current = false;
        }, 0);
      };

      // Listen for updates from the server
      socket.on('updateContent', handleUpdateContent);

      // Register update listener for the editor
      const removeUpdateListener = editor.registerUpdateListener(() => {
        if (!isProgrammaticUpdateRef.current) {
          // Emit a content change only for user-initiated updates
          const editorStateJSON = editor.getEditorState().toJSON();
          socket.emit('contentChange', { text: JSON.stringify(editorStateJSON) });
        }
      });

      // Cleanup
      return () => {
        socket.off('updateContent', handleUpdateContent);
        removeUpdateListener();
      };
    }
  }, [editor, socket]);

  return null;
}


function Placeholder() {
  return <div className="editor-placeholder">Enter some rich text...</div>;
}

const editorConfig = {
  // The editor theme
  theme: editorTheme,
  // Handling of errors during update
  onError(error) {
    throw error;
  },
  // Any custom nodes go here
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode
  ]
};


export default function Editor({ user_id }) {
  // const socket = useContext(SocketContext);
  // console.log('Editor socket', socket)
  const [editorState, setEditorState] = useState();
  const [socket, setSocket] = useState();

  useEffect(() => {
    let newSocket;
  
    // Only create a new socket if it doesn't already exist
    if (!socket) {
      console.log('socket is not set')
      const express_be_main_fqdn = process.env.REACT_APP_EXPRESS_BE_MAIN_FQDN;
      newSocket = io(express_be_main_fqdn, {
        query: { user_id }
      });
      setSocket(newSocket);
      console.log({ newSocket });
    } else {
      console.log('socket is set')
      // If the socket already exists, use it directly
      newSocket = socket;
    }
  
    // Listener for socket connection
    const handleConnect = () => {
      console.log('Connected to server');
      // Additional logic to be executed upon connection
    };
  
    newSocket.on('connect', handleConnect);

    newSocket.on('connect_error', (err) => {
      console.log('Connection Error:', err);
    });
  
    // Clean up: remove the listener and close the socket when the component unmounts
    return () => {
      console.log('cleanup being ran')
      if (!socket) {
        // Only close the socket if it was created in this effect
        newSocket.off('connect');
        newSocket.off('connect_error');
        newSocket.close();
      }
    };
  }, [user_id]);
  

  return (
    <SocketContext.Provider value={socket}>
    <LexicalComposer initialConfig={editorConfig}>
      <div className="editor-container">
        <ToolbarPlugin />
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={<Placeholder />}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <TreeViewPlugin />
          <AutoFocusPlugin />
          <CodeHighlightPlugin />
          <ListPlugin />
          <LinkPlugin />
          <AutoLinkPlugin />
          <ListMaxIndentLevelPlugin maxDepth={7} />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
          <UpdatePlugin />
        </div>
      </div>
    </LexicalComposer>
    </SocketContext.Provider>
  );
}