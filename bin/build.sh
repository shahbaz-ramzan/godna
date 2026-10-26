#!/bin/bash

# install dependencies
echo "installing dependencies"
yarn
echo "installing dependencies finish"

node -e 'console.log("BEFORE:: HEAP_SIZE_LIMIT ======> ",v8.getHeapStatistics().heap_size_limit/(1024*1024))'

export NODE_OPTIONS=--max_old_space_size=4096

node -e 'console.log("AFTER:: HEAP_SIZE_LIMIT ======> ",v8.getHeapStatistics().heap_size_limit/(1024*1024))'

# "next build" will create a production ready build directory
# "next export" will export nextjs files as bundle like in react app in "out" directory...
next build
