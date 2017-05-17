#!/bin/bash
jsduck --builtin-classes javascript/ --output=docs/ --config=json/jsduck.json
phpdoc -d "public_html/Application/App" -f "public_html/docs"