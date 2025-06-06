import json

with open("caloriepro.json", "r") as file:
    data = json.load(file)

# Escapamos correctamente los saltos de línea
data["private_key"] = data["private_key"].replace("\n", "\\n")

# Convertimos a una sola línea
one_line = json.dumps(data)

print(one_line)
