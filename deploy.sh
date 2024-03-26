#!/usr/bin/env zsh

set -euo pipefail

# debug
# set -x
# deploy karabiner.json file and if possible restart require service

#---- Validation
_message () {
   local type=${1:-"Error"}
   if [[ $type =~ "[Ee][Rr][Rr][Oo][Rr]"  ]]; then
      >&2 printf "%s: %s\n" $type ${2:-"Something happends..."}
      exit 1
   else
       printf "%s: %s\n" $type ${2:-"Something happends..."}
   fi
}

_run_checks () {
    local cmds=($@)
    set -a missing
    # init array
    missing+=""

    for c in ${cmds}; do
        if ! (( $+commands[$c] )); then
            missing+=" ${c}"
        fi
    done
    if [ ${#missing[@]} -gt 1 ]; then
        message "Error" "Missing program(s): ${missing[@]}"
    fi
}
_run_checks "yarn" "cp" "launchctl" "realpath"
#--- END Validation


_target_dir="$(realpath -s ~/.config/karabiner)"
_current_dir="${0:P:h}"

yarn run build && \
    {
        if [ "${_target_dir}" != "${_current_dir}" ]; then
            cp -f karabiner.json ~/.config/karabiner
        fi
    } && \
    launchctl kickstart -k gui/`id -u`/org.pqrs.karabiner.karabiner_console_user_server
