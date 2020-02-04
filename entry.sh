#!/bin/sh

PACKAGE_VERSION=$(cat package.json | grep version | head -1 | awk -F= "{ print $2 }" | sed 's/[version:,\",]//g' | tr -d '[[:space:]]')
TAG_VERSION=${GITHUB_REF/refs\/tags\//}

shopt -s nocasematch

if PACKAGE_VERSION != TAG_VERSION; then
  exit 1
else
  exit 0
fi
