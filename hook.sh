#!/usr/bin/env bash

##
# chowchow hook 414715c1f35236b9d2789a653d3d0d3c
##

HOOKNAME="${HOOKNAME:-$(basename "$0")}"
CHOWCHOWFILE="${CHOWCHOWFILE:-.chowchow.yml}"

# Export Git hook params
export GIT_PARAMS="$*"

if [ -f "$CHOWCHOWFILE" ]; then
  set -e
  scripts=$(ruby --disable-gems -r yaml -e "puts YAML.load_file('${CHOWCHOWFILE}')['${HOOKNAME}']")
  while read -r line; do
    eval "${line}"
  done <<< "$scripts"
fi
