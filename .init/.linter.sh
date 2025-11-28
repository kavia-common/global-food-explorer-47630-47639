#!/bin/bash
cd /home/kavia/workspace/code-generation/global-food-explorer-47630-47639/frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

