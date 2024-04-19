import React, { useEffect, useState } from "react";

type NodeType = {
  id: string;
  data: {
    label: string;
  };
  style: {
    backgroundColor: string;
  };
};

type UpdateNodeProps = {
  selectedNodeId: string;
  nodes: NodeType[];
  setNodes: React.Dispatch<React.SetStateAction<NodeType[]>>;
};

const UpdateNode: React.FC<UpdateNodeProps> = ({
  selectedNodeId,
  nodes,
  setNodes,
}) => {
  const [nodeName, setNodeName] = useState("New name");
  const [nodeBg, setNodeBg] = useState("#979da3");
  const [allowUpdate, setAllowUpdate] = useState(false);

  useEffect(() => {
    if (!allowUpdate) return;

    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === selectedNodeId) {
          node.data = {
            ...node.data,
            label: nodeName,
          };
          node.style = { ...node.style, backgroundColor: nodeBg };
        }
        return node;
      })
    );
  }, [selectedNodeId, nodeName, nodeBg, allowUpdate, setNodes]);

  return (
    <div className="updatenode__controls">
      <label>Node Name:</label>
      <input
        value={nodeName}
        onChange={(evt) => setNodeName(evt.target.value)}
      />

      <label className="updatenode__bglabel">Background:</label>
      <input value={nodeBg} onChange={(evt) => setNodeBg(evt.target.value)} />

      <div style={{ paddingTop: "10px" }}>
        <input
          type="checkbox"
          id="allowUpdateCheckbox"
          checked={allowUpdate}
          onChange={(evt) => setAllowUpdate(evt.target.checked)}
        />
        <label
          htmlFor="allowUpdateCheckbox"
          style={{ display: "inline", paddingLeft: "5px" }}
        >
          Allow Update
        </label>
      </div>
    </div>
  );
};

export default UpdateNode;
