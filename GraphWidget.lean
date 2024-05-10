import ProofWidgets

open ProofWidgets Lean

namespace GraphWidget

structure Node where
  id : String
  info : String
deriving ToJson, FromJson, Inhabited

structure GraphProps where
  nodes : Array Node
  dot : String
deriving ToJson, FromJson, Inhabited

@[widget_module]
def Graph : Component GraphProps where
  javascript := include_str "build" / "js" / "index.js"

namespace GraphWidget
