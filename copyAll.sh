#!/bin/sh
mkdir -p "$2"
cp -r /templates/"$1"/* "$2"
cp -r /templates/"$1"/.??* "$2"
