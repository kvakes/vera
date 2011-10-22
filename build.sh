#!/bin/bash
zip -X vera.epub mimetype
zip -rg vera.epub META-INF/ -x *.DS_Store
zip -rg vera.epub OEBPS/ -x *.DS_Store
