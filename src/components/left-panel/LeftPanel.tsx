import React, { useState } from "react";
import "./LeftPanel.css";

const LeftPanel: React.FC = () => {
  const [inputText, setInputText] = useState<string>("");
  const [extractedMenuItems, setExtractedMenuItems] = useState<string[]>([]);
  const [noValidItems, setNoValidItems] = useState<boolean>(false);

  const handleExtract = (): void => {
    const menuRegex: RegExp = /\b\d+\:\s+(.+)/g;

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
          placeholder="1: menu item"
          value={inputText}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>): void =>
            setInputText(e.target.value)
          }
        />
        <p className="note">
          Note:
          <span>
            The extractor processes each new line individually to identify menu
            items.
          </span>
        </p>
        <button className="extract-button" onClick={handleExtract}>
          Extract
        </button>
        {noValidItems ? (
          <p className="no-items-message">No valid menu items found</p>
        ) : (
          <div className="menu-items">
            {extractedMenuItems.length > 0 && (
              <p
                style={{
                  textDecoration: "underline",
                  fontSize: "16px",
                  fontWeight: "700",
                }}
              >
                List of items
              </p>
            )}

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
