import re

arr = []

with open("lcd.txt", "r") as file:
    for line in file:
        arr.append(line)


def delete_pattern(text, pattern):
    new_arr = []
    for element in text:
        if pattern not in element:
            new_arr.append(element)
        else:
            print("removed" + element)
    return new_arr


arr = delete_pattern(arr, "/solution")
print(len(arr))
arr = list(set(arr))

with open('lx_problems.txt', 'a') as f:
    for j in arr:
        f.write(j)
