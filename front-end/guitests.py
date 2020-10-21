import os
from sys import platform

if __name__ == "__main__":
    if platform == "win32":
        PATH = "./front-end/gui_tests/chromedriver.exe"
    elif platform == "linux":
        PATH = "./front-end/gui_tests/chromedriver_linux"
    else:
        print("Unsupported OS")
        exit(-1)

    os.system("python3 ./front-end/gui_tests/splashTests.py " + PATH)
    os.system("python3 ./front-end/gui_tests/navbarTests.py " + PATH)
    os.system("python3 ./front-end/gui_tests/politiciansTests.py " + PATH)
    os.system("python3 ./front-end/gui_tests/districtsTests.py " + PATH)
    os.system("python3 ./front-end/gui_tests/electionsTests.py " + PATH)