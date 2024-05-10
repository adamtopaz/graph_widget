# Lean4 Graph Widget

A simple widget for `Lean4` which displays a graph in the infoview and allows the user to get information about the nodes.

## Usage

```lean
import GraphWidget

def nodes : Array GraphWidget.Node := #[
  {
    id := "0"
    info := "Info A"
  },
  {
    id := "1"
    info := "Info B"
  }
]

def dot : String := "\
digraph {
  \"A\" [label=\"Node A\", id=\"0\", color=red];
  \"B\" [label=\"Node B\", id=\"1\", color=blue];
  \"A\" -> \"B\";
}"

open GraphWidget ProofWidgets ProofWidgets.Jsx in
#html <Graph nodes = {nodes} dot = {dot} />
```

This will display a graphviz graph in the infoview with two nodes with labels `Node A` and `Node B` connected by a directed edge from `Node A` to `Node B`.
Clicking on `Node A` will display `Info A` and clicking on `Node B` will display `Info B`.

Markdown (with math) can be used in the `info` field of the nodes.

## Installation

Assuming you have a standard lean4 project with a lakefile, adding the following to `lakefile.lean` should work:

```lean
require graph_widget from git "https://github.com/adamtopaz/graph_widget.git"
```