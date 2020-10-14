front-dev-setup:
	cd front-end/ && npm install
front-dev:
	cd front-end/ && npm start
front-build:
	cd front-end/ && npm build
back-dev:
	cd back-end/ && python3 -m flask run
back-end-tests:
	echo "Running unittests and Postman test suite..."
	python3 back-end/unittests.py -v
front-end-tests:
	echo "Running Mocha and Selenium test suite..."