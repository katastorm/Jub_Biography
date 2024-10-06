

import json
import os




subfolders = [ os.path.basename(f.path) for f in os.scandir("./public/Projects") if f.is_dir() ]
print(subfolders)

foldList = json.dumps(subfolders)

print(foldList)

with open('src/projectList.json', 'w') as file:
    # Write new content to the file
    file.write(foldList)


