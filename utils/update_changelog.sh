#!/bin/bash
# TAG_NAME

DATE=$(date +%Y-%m-%d)

# changelog
CHANGELOG_CONTENT="    { date: '$DATE', version: '$TAG_NAME'},"
CHANGELOG_FILE_PATH="../src/components/docs/changelog.tsx"
sed -i "2i\\${CHANGELOG_CONTENT}" "${CHANGELOG_FILE_PATH}"

# last version
VERSION_CONTENT="const LatestVersion = '$TAG_NAME'"
VERSION_FILE_PATH="../src/components/public/version.tsx"
sed -i "1s/.*/${VERSION_CONTENT}/" "${VERSION_FILE_PATH}"

# installation
INSTALLATION_FILE_PATH="../src/pages/docs/installation.mdx"
sed -i "s/v4\.[0-9]\+\.[0-9]\+/${TAG_NAME}/g" "${INSTALLATION_FILE_PATH}"

# upgrade
UPGRADE_FILE_PATH="../src/pages/docs/upgrade.mdx"
sed -i "s/v4\.[0-9]\+\.[0-9]\+/${TAG_NAME}/g" "${UPGRADE_FILE_PATH}"

git add ${CHANGELOG_FILE_PATH} ${VERSION_FILE_PATH} ${INSTALLATION_FILE_PATH} ${UPGRADE_FILE_PATH}
git commit -m "add $TAG_NAME to changelogs"
git checkout -b pr@dev@changelog
git push origin pr@dev@changelog
