"use client";

import { useTheme } from "next-themes";
import {
  BlockNoteEditor,
  PartialBlock
} from "@blocknote/core";
import {
  BlockNoteView,
  ReactSlashMenuItem,
  getDefaultReactSlashMenuItems,
  useBlockNote,
} from "@blocknote/react";
import "@blocknote/core/style.css";
import { Ollama } from "ollama-node";
import { useEdgeStore } from "@/lib/edgestore";
import { AxeIcon, PiIcon, StarIcon } from "lucide-react";

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}
const ollama = new Ollama();

const Editor = ({ onChange, initialContent, editable }: EditorProps) => {
  const { resolvedTheme } = useTheme();
  const { edgestore } = useEdgeStore();

  const handleUpload = async (file: File) => {
    const response = await edgestore.publicFiles.upload({
      file,
    });

    return response.url;
  };
  const sendTextToAI = async (text: string | undefined) => {
    await ollama.setModel("openhermes");
    await ollama.streamingGenerate(text || "", (output) => {
      const currentBlock = editor.getTextCursorPosition().block;
      editor.getBlock(currentBlock.id)?.content?.push({
        type: "text",
        styles: {},
        text: output,
      });
      editor.updateBlock(currentBlock.id, currentBlock);
    });
    return "";
  };
  const continueWithAI = async (editor: BlockNoteEditor) => {
    const selectedText = editor.getSelectedText();
    const currentBlock = editor.getTextCursorPosition().block;
    await sendTextToAI(
      currentBlock.content
        ?.map((c) => (c.type == "text" ? c.text : ""))
        .join(" ") || selectedText
    );
  };

  const continueWithAIItem: ReactSlashMenuItem = {
    name: "Continue With AI",
    execute: continueWithAI,
    aliases: ["summarize", "ai"],
    group: "Other",
    icon: <StarIcon />,
    hint: "Continue With AI",
  };
  const customSlashMenuItemList = [
    ...getDefaultReactSlashMenuItems(),
    continueWithAIItem,
  ];

  const editor: BlockNoteEditor = useBlockNote({
    editable,
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
    onEditorContentChange: (editor) => {
      onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
    },
    uploadFile: handleUpload,
    slashMenuItems: customSlashMenuItemList,
  });

  return (
    <div>
      <BlockNoteView
        editor={editor}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
      />
    </div>
  );
};

export default Editor;
