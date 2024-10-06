
import os
print("### Recreating project tree...")

reactPath = os.path.dirname(__file__) + "/../node_modules/react-scripts/bin/react-scripts.js"

"""
refreshListPath = os.path.dirname(__file__) + "/ProjectListRefresh.py"


with open(refreshListPath) as f:
    exec(f.read())
"""


os.system('node ../excel/ExcelToJson.js')


print("### Starting server...")

os.system('node '+reactPath+' start')

 

