import React, { useCallback, useState, Dispatch, SetStateAction } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Edge,
  Node,
  Connection,
  OnNodesChange,
  OnEdgesChange,
} from "reactflow";
import "reactflow/dist/style.css";
import "./CenterPanel.css";
import UpdateNode from "./UpdateNode";

type InitialNode = {
  id: string;
  position: { x: number; y: number };
  data: { label: string };
};
type NodeType = {
  id: string;
  data: {
    label: string;
  };
  style: {
    backgroundColor: string;
  };
};

const initialNodes: InitialNode[] = [
  { id: "1", position: { x: 100, y: 100 }, data: { label: "1" } },
  { id: "2", position: { x: 100, y: 300 }, data: { label: "2" } },
];

type InitialEdge = {
  id: string;
  source: string;
  target: string;
  animated: boolean;
};

const initialEdges: InitialEdge[] = [
  { id: "e1-2", source: "1", target: "2", animated: true },
];

const CenterPanel: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNodeId, setSelectedNodeId] = useState<string>("");
  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDeleteNode = useCallback(
    (nodeId: string) => {
      setNodes((nds) => nds.filter((n) => n.id !== nodeId));
      setEdges((eds) =>
        eds.filter((e) => e.source !== nodeId && e.target !== nodeId)
      );
    },
    [setNodes, setEdges]
  );

  const onDuplicateNode = useCallback(
    (nodeId: string) => {
      const nodeToDuplicate = nodes.find((n) => n.id === nodeId);
      if (nodeToDuplicate) {
        const newNodeId = (nodes.length + 1).toString();
        const newNode = {
          ...nodeToDuplicate,
          id: newNodeId,
          position: {
            ...nodeToDuplicate.position,
            x: nodeToDuplicate.position.x + 250,
          },
        };
        setNodes((nds) => nds.concat(newNode));
      }
    },
    [nodes, setNodes]
  );
  const onAddNode = useCallback(() => {
    const newNodeId = `${nodes.length + 1}`;
    const newNode = {
      id: newNodeId,
      position: {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
      },
      data: { label: `Node ${newNodeId}` },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [nodes, setNodes]);
  const onSelectNode = useCallback((nodeId: string) => {
    setSelectedNodeId(nodeId);
  }, []);
  return (
    <div className="center_panel">
      <ReactFlow
        nodes={nodes as Node[]}
        edges={edges as Edge[]}
        onNodesChange={onNodesChange as OnNodesChange}
        onEdgesChange={onEdgesChange as OnEdgesChange}
        onConnect={onConnect}
        onSelectionChange={(params) => {
          const selectedNodes = params.nodes as Node[] | undefined;
          if (selectedNodes && selectedNodes.length === 1) {
            onSelectNode(selectedNodes[0].id);
          } else {
            setSelectedNodeId("");
          }
        }}
      >
        <div className="buttons">
          <button onClick={onAddNode}>Add Node</button>
          <button onClick={() => onDeleteNode(selectedNodeId)}>
            Delete Node
          </button>
          <button onClick={() => onDuplicateNode(selectedNodeId)}>
            Duplicate Node
          </button>
        </div>
        <UpdateNode
          selectedNodeId={selectedNodeId ?? ""}
          nodes={nodes as NodeType[]}
          setNodes={setNodes as Dispatch<SetStateAction<NodeType[]>>}
        />
        <Controls />
        <MiniMap />
        <Background variant={"dots" as any} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
};

export default CenterPanel;
