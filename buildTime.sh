#!/bin/bash

set -e

rm -rf ./src/buildTime.json
touch ./src/buildTime.json

echo "{" >> ./src/buildTime.json
echo -e "\t\"buildTime\": $(date +"%s")" >> ./src/buildTime.json
echo "}" >> ./src/buildTime.json