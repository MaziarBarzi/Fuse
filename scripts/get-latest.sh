curl -O https://raw.githubusercontent.com/krisk/Fuse/master/dist/fuse.js
mv fuse.js assets/js/fuse.min.js

VERSION=$(sed -n 2p assets/js/fuse.min.js | awk -F" " '{print $3}')
echo "$VERSION"
replacement="<span id=\"version-text\">$VERSION<\/span>"
sed "/version-tex/s/.*/$replacement/" index.html > .output.html
mv .output.html index.html