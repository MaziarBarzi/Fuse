SHELL := /bin/bash

.DEFAULT_GOAL := help

NAME = fusejs

################################################################################
# Development
################################################################################

## Build and start the development environment
dev:
	./start

## Get latest version of Fuse
latest:
	curl -O https://raw.githubusercontent.com/krisk/Fuse/master/dist/fuse.js
	mv fuse.js assets/js/fuse.min.js

################################################################################
# Release
################################################################################

## Build and start the development environment
release:
	./release.sh

################################################################################
# Help
################################################################################

# See <https://gist.github.com/klmr/575726c7e05d8780505a>
help:
	@echo;echo "$$(tput bold)Usage:$$(tput sgr0)";echo;echo '  make <target>';echo;echo "$$(tput bold)Targets:$$(tput sgr0)";echo;sed -ne"/^## /{h;s/.*//;:d" -e"H;n;s/^## //;td" -e"s/:.*//;G;s/\\n## /---/;s/\\n/ /g;p;}" ${MAKEFILE_LIST}|LC_ALL='C' sort -f|awk -F --- -v n=$$(tput cols) -v i=30 -v a="$$(tput setaf 6)" -v z="$$(tput sgr0)" '{printf"  %s%*s%s ",a,-i,$$1,z;m=split($$2,w," ");l=n-i;for(j=1;j<=m;j++){l-=length(w[j])+1;if(l<= 0){l=n-i-length(w[j])-1;printf"\n%*s ",-i," ";}printf"%s ",w[j];}printf"\n";}';echo;

.PHONY: test