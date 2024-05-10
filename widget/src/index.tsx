import { useEffect, useRef, useState } from "react";
import * as d3 from 'd3';
import { graphviz, GraphvizOptions } from 'd3-graphviz';
import { createRoot } from 'react-dom/client'
import remarkMath from 'remark-math'
import Markdown from 'react-markdown';

// @ts-ignore
import rehypeMathjax from 'rehype-mathjax'

interface Node {
  id : string;
  info : string;
}

interface Graph {
  nodes : Array<Node>
  dot : string
}

export default ({nodes, dot} : Graph) => {
  const nodeMap = new Map(nodes.map(node => [node.id, node]))
  const graphRef = useRef<HTMLDivElement>(null);
  const [infoState, setInfoState] = useState<string>("");

  useEffect(() => {
    graphviz(graphRef.current)
      .renderDot(dot)
      .onerror((e) => {
        d3.select(graphRef.current).text(e);
      })
      .on("end", () => {

        d3.select(graphRef.current).select('polygon').style("fill", "transparent");

        d3.select(graphRef.current).selectAll('text').each(function () {
          const tNode = d3.select(this);
          tNode.style("fill", "var(--vscode-editor-foreground)");
        });

        d3.selectAll<SVGAElement, unknown>(".edge").each(function () {
          const eNode = d3.select(this)
          eNode.select("path").style("stroke","var(--vscode-editor-foreground)");
          eNode.select("polygon")
            .style("stroke","var(--vscode-editor-foreground)")
            .style("fill","var(--vscode-editor-foreground)");
        });

        d3.selectAll<SVGAElement, unknown>(".node").each(function () {
          const gNode = d3.select(this);

          gNode.attr("pointer-events", "fill");

          gNode.on("click", function(event) {
            event.stopPropagation();
            const nodeId = d3.select(this).attr("id");
            const node = nodeMap.get(nodeId);

            if (node) {
              setInfoState(node.info);
            };

          });
        });

        d3.select(graphRef.current)
          .on("click", () => {
            setInfoState("");
          });
      });
  }, [nodes, dot]);

  return (
    <div>
      <div ref={graphRef} />
      <Markdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeMathjax]}>
        {infoState}
      </Markdown>
    </div>
  );
}