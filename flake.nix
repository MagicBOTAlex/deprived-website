{
  description = "NPM project (dev shell + run, auto-install deps)";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-24.05";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { inherit system; };
        node = pkgs.nodejs_22; # or pkgs.nodejs_20


        start = pkgs.writeShellApplication {
          name = "start";
          runtimeInputs = [ node ];
          text = ''
            set -euo pipefail
            export npm_config_cache="$PWD/.npm-cache"
            if [ -f package-lock.json ]; then cmd=ci; else cmd=install; fi
            echo "→ npm $cmd (nix run)"
            ${node}/bin/npm "$cmd"
            exec ${node}/bin/npm run dev -- "$@"
          '';
        };

      in
      {
        devShells.default = pkgs.mkShell { buildInputs = [ node ]; shellHook = ''export npm_config_cache="$PWD/.npm-cache"''; };
        apps.default = { type = "app"; program = "${start}/bin/start"; };
      });
}

