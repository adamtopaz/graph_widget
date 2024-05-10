import Lake
open Lake DSL

require proofwidgets from git "https://github.com/leanprover-community/ProofWidgets4" @ "v0.0.36"

package «graph_widget» where
  -- add package configuration options here

@[default_target]
lean_lib «GraphWidget» where
  -- add library configuration options here
