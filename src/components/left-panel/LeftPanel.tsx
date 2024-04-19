import React, { useState } from "react";
import "./LeftPanel.css";

const LeftPanel: React.FC = () => {
  const [inputText, setInputText] = useState<string>("");
  const [extractedMenuItems, setExtractedMenuItems] = useState<string[]>([]);
  const [noValidItems, setNoValidItems] = useState<boolean>(false);

  const handleExtract = (): void => {
    // Regular expression to match menu items formatted as "<number>. <Menu Text>"
    const menuRegex: RegExp = /\b\d+\.\s+[\w\s]+\b/g;

    const lines: string[] = inputText.split("\n");
    const extractedItems: string[] = [];

    lines.forEach((line) => {
      const match: RegExpMatchArray | null = line.match(menuRegex);
      if (match && match.length > 0) {
        extractedItems.push(match[0]);
      }
    });

    if (extractedItems.length > 0) {
      setExtractedMenuItems(extractedItems);
      setNoValidItems(false);
    } else {
      setExtractedMenuItems([]);
      setNoValidItems(true);
    }
  };

  return (
    <>
      <div className="left-panel">
        <textarea
          className="text-area"
          placeholder="menu items..."
          value={inputText}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>): void =>
            setInputText(e.target.value)
          }
        />
        <p className="note">
          Note: The extractor processes each line individually to identify menu
          items.
        </p>
        <button className="extract-button" onClick={handleExtract}>
          Extract
        </button>
        {noValidItems ? (
          <p className="no-items-message">No valid menu items found</p>
        ) : (
          <div className="menu-items">
            {extractedMenuItems.map((item: string, index: number) => (
              <p key={index}>{item}</p>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default LeftPanel;
