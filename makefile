front-dev-setup:
	cd front-end/ && npm install
front-dev:
	cd front-end/ && npm start
front-build:
	cd front-end/ && npm build
back-dev:
	cd back-end/ && python3 -m flask run
python-unit-tests:
	echo "Running python unit tests..."
	python3 back-end/unittests.py -v
front-end-tests:
	echo "Running Jest and Selenium test suite..."
	cd front-end/ && npm test
selenium-tests:
	(_timeout 100 python3 back-end/app.py) &
	cd front-end/ && (_timeout 100 npm react) &
	python3 front-end/gui_tests/gui_tests.py