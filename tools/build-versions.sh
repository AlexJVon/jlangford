#!/usr/bin/env bash
# Builds every branch into _site/ (main at the root, others under v/<branch>/),
# writes versions.json and adds the version switcher to each page.
set -euo pipefail

OUT=_site
DEFAULT=${DEFAULT_BRANCH:-main}
rm -rf "$OUT"
mkdir -p "$OUT/v"

git fetch -q --prune origin '+refs/heads/*:refs/remotes/origin/*'
branches=$(git for-each-ref --sort=-committerdate --format='%(refname:strip=3)' refs/remotes/origin | grep -v -x -e HEAD -e gh-pages)

json_escape() { printf '%s' "$1" | sed -e 's/\\/\\\\/g' -e 's/"/\\"/g'; }

entries=()
for b in $branches; do
  if [ "$b" = "$DEFAULT" ]; then
    dest="$OUT"; rel=""; path=""
  else
    safe=$(printf '%s' "$b" | tr -c 'A-Za-z0-9._-' '-')
    dest="$OUT/v/$safe"; rel="../../"; path="v/$safe/"
  fi
  mkdir -p "$dest"
  git archive "origin/$b" | tar -x -C "$dest"
  rm -rf "$dest/.github"

  for f in "$dest"/*.html; do
    [ -e "$f" ] || continue
    sed -i "s#</body>#<script src=\"${rel}versions.js\"></script></body>#" "$f"
  done

  date=$(git log -1 --format=%cs "origin/$b")
  note=$(git log -1 --format=%s "origin/$b")
  entries+=("{\"name\":\"$(json_escape "$b")\",\"path\":\"$path\",\"date\":\"$date\",\"note\":\"$(json_escape "$note")\",\"main\":$([ "$b" = "$DEFAULT" ] && echo true || echo false)}")
done

( IFS=,; printf '[%s]\n' "${entries[*]}" ) > "$OUT/versions.json"
cp tools/versions.js "$OUT/versions.js"
touch "$OUT/.nojekyll"
echo "Built ${#entries[@]} version(s):"; cat "$OUT/versions.json"
