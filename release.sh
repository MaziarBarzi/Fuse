#!/usr/bin/env bash

cd assets/js
curl -O https://raw.githubusercontent.com/krisk/Fuse/master/dist/fuse.js
mv fuse.js fuse.min.js

on_ghpages_branch () {
  [[ $(git symbolic-ref --short -q HEAD) == "gh-pages" ]] && return 0
  return 1
}

if ! on_ghpages_branch; then
  echo -e "\033[0;31mRefusing to release from non gh-pages branch.\033[0m"
  exit 1
fi

read -e -p "Are you sure you want to release? " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  echo -e "\033[0;32mReleasing...\033[0m"
  echo
  git commit -a -m "New build"
  git push origin gh-pages
else
  echo -e "\033[0;31mCancelling...\033[0m"
fi
