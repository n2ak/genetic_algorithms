import matplotlib.pyplot as plt
import sys

link = "C:/Users/PiCi/Downloads/data.txt"


def supprimerFichier():
    import os
    if os.path.exists(link):
        os.remove(link)
        print("fichier supprimé")
def afficherCourbe():
    with open(link,"r") as file:
        lines = file.readlines()
        distances,gens = [],[]
        for line in lines:
            line.removesuffix("\n")
            line.removesuffix("\r")
            #print(line)
            [d,g] = line.split(",")
            distances.append(int(d))
            gens.append(int(g))
        # print(distances)
        # print(gens)
        plt.plot(gens,distances,c='r')
        plt.xlabel("Générations")
        plt.ylabel("Distances")
        plt.title("Distances en fonction des générations")
        plt.show()
try:
    afficherCourbe()
    if len(sys.argv) > 1 and sys.argv[1] == "delete":
        supprimerFichier()
except:
    print("Le fichier data.txt n'est pas trouvé, essayer de telecharger les données une autre fois")