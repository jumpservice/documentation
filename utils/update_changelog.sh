#!/bin/bash
# TAG_NAME

DATE=$(date +%Y-%m-%d)
CONTENT="    { date: '$DATE', version: '$TAG_NAME' },"
FILE_PATH="../src/components/docs/changelog.tsx"

sed -i "2i\\${CONTENT}" "${FILE_PATH}"

git config --global user.name 'BaiJiangJie'
git config --global user.email 'jiangjie.bai@fit2cloud.com'

git add ${FILE_PATH}
git commit -m "add $TAG_NAME to changelogs"
git checkout -b pr@dev@changelog
git push origin pr@dev@changelog
