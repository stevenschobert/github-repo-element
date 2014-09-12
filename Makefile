default: install build start

install:
	@npm install
	@./node_modules/.bin/bower install

clean:
	@rm -rf dist/*

build:
	@./node_modules/.bin/gulp build

start:
	@echo "start task not implemented"

test:
	@npm test

.PHONY: install clean build start test
