import os
import sys
import matplotlib.pyplot as plt


def delete_file(link):
    if os.path.exists(link):
        os.remove(link)
        print("file deleted")


def show(link):
    with open(link, "r") as file:
        text = file.read()
        distances = [int(d) for d in text.strip().split(",")]
        plt.plot(distances, c='r')
        plt.xlabel("Generation")
        plt.ylabel("Distance")
        plt.show()


if __name__ == "__main__":
    link = sys.argv[1]
    show(link)
    delete_file(link)
