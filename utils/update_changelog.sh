#!/bin/bash
# TAG_NAME

DATE=$(date +%Y-%m-%d)

# changelog
CONTENT="    { date: '$DATE', version: '$TAG_NAME'},"
FILE_PATH="../src/components/docs/changelog.tsx"
sed -i "2i\\${CONTENT}" "${FILE_PATH}"

# last version
CONTENT="const LatestVersion = '$TAG_NAME';"
FILE_PATH="../src/components/public/version.tsx"
sed -i "1s/.*/${CONTENT}/" "${FILE_PATH}"

git add ${FILE_PATH}
git commit -m "add $TAG_NAME to changelogs"
git checkout -b pr@dev@changelog
git push origin pr@dev@changelog
