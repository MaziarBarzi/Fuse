curl -O https://raw.githubusercontent.com/krisk/Fuse/master/dist/fuse.min.js
mv fuse.min.js assets/js/

VERSION=$(sed -n 2p assets/js/fuse.min.js | awk -F" " '{print $3}')
echo "$VERSION"
replacement="<span id=\"version-text\">$VERSION<\/span>"
sed "/version-tex/s/.*/$replacement/" index.html > .output.html
mv .output.html index.html