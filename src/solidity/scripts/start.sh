#!/usr/bin/env bash

# Exit script as soon as a command fails.
set -o errexit

# Executes cleanup function at script exit.
trap cleanup EXIT

cleanup() {
  # Kill the testrpc instance that we started (if we started one and if it's still running).
  if [ -n "$testrpc_pid" ] && ps -p $testrpc_pid > /dev/null; then
    kill -9 $testrpc_pid
  fi
}

  # echo  $testrpc_pid
  testrpc_port=8545


testrpc_running() {
  nc -z localhost "$testrpc_port"
}

start_testrpc() {
  local mnemonic="exit mystery arena random unique crack guess bone fall lecture avocado speak"

  if [ "$SOLIDITY_COVERAGE" = true ]; then
    node_modules/.bin/testrpc-sc --gasLimit 0xfffffffffff --port "$testrpc_port" --mnemonic "${mnemonic}" --defaultBalanceEther '20000' > /dev/null &
  else
    node_modules/.bin/ganache-cli --gasLimit 0xfffffffffff --mnemonic "${mnemonic}" --defaultBalanceEther '2000'> /dev/null &
  fi

  testrpc_pid=$!
}

if testrpc_running; then
  echo "Killing existing testrpc instance"
  cleanup

  node_modules/.bin/ganache-cli --gasLimit 0xfffffffffff --mnemonic "${mnemonic}" --defaultBalanceEther '2000'> /dev/null &
else
  echo "Starting our own testrpc instance"
  node_modules/.bin/ganache-cli --gasLimit 0xfffffffffff --mnemonic "${mnemonic}" --defaultBalanceEther '2000'> /dev/null &
fi
