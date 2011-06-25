#!/bin/bash
zip -X Vera.epub mimetype
zip -rg Vera.epub META-INF/ -x *.DS_Store
zip -rg Vera.epub OEBPS/ -x *.DS_Store
