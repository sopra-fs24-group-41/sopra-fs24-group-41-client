import random
import string

def generate_random_string(length):
    characters = string.ascii_letters + string.digits
    return ''.join(random.choice(characters) for _ in range(length))

random_string = generate_random_string(20)
print(random_string)

ok = "EkaErKMIY56sLvCUZE3u"

print(len(ok))