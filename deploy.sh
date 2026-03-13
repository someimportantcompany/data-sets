#!/usr/bin/env bash
set -euo pipefail

# Usage: ./deploy.sh [package-name]
#   ./deploy.sh              # deploy all packages
#   ./deploy.sh countries    # deploy a single package

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Verify auth before doing any work
echo "==> Checking npm auth"
if ! npm whoami &>/dev/null; then
  echo "Error: not logged in to npm. Run 'npm login' first." >&2
  exit 1
fi
echo "  -> logged in as $(npm whoami)"

PACKAGES=(countries currencies pokemon)

if [[ $# -gt 0 ]]; then
  PACKAGES=("$1")
  if [[ ! -d "packages/$1" ]]; then
    echo "Error: packages/$1 does not exist" >&2
    exit 1
  fi
fi

echo "==> Running tests"
pnpm test

for pkg in "${PACKAGES[@]}"; do
  cd "$SCRIPT_DIR/packages/$pkg"

  name=$(node -e "console.log(require('./package.json').name)")
  version=$(node -e "console.log(require('./package.json').version)")

  echo ""
  echo "==> Deploying $name@$version"

  # Publish to npm (skip if version already exists)
  if npm view "$name@$version" version &>/dev/null; then
    echo "  -> npm: $version already published, skipping"
  else
    echo "  -> npm: publishing"
    pnpm publish --access public --no-git-checks
  fi

  # Publish to JSR
  echo "  -> jsr: publishing"
  pnpm jsr publish --allow-dirty

  echo "  -> $name@$version done"
done

cd "$SCRIPT_DIR"
echo ""
echo "Done."
