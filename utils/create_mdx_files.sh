#!/bin/bash

# 检查是否传入目标目录
if [ -z "$1" ]; then
  echo "Usage: $0 <target_directory>"
  exit 1
fi

target_dir="$1"
meta_file="$target_dir/_meta.js"

# 检查 _meta.js 文件是否存在
if [ ! -f "$meta_file" ]; then
  echo "Error: _meta.js not found in $target_dir"
  exit 1
fi

# 创建文件
grep -o '"[^"]*":' "$meta_file" | sed 's/[":]//g' | while read -r key; do
  filename="$target_dir/${key}.mdx"
  if [ ! -f "$filename" ]; then
    echo "# ${key//-/ }" > "$filename"
    echo "
> Content for $key goes here." >> "$filename"
    echo "Created: $filename"
  else
    echo "Skipped: $filename (already exists)"
  fi
done