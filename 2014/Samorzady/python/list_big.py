import os
import sys
import string
import csv
import subprocess
# -*- coding: utf8 -*-


if len(sys.argv) == 2:
	with open( sys.argv[1] ) as table_file:
		table_reader = csv.reader(table_file,delimiter="\t",quotechar="\"")
		for row in table_reader:
			print row	

else:
	for root,dirs,files in os.walk(u"."):
		for f in files:
			if f.find("table") > -1 and f[-3:]=="txt":
				with open(os.path.join(root,f),"r") as table_file:
					table_reader = csv.reader(table_file,delimiter="\t",quotechar="\"")
					returned_rows = []
					rows = []
					
					for row in table_reader:
						rows.append(row)
					
					for row in rows:
						for elem in row:
							if "60004" in elem:
								returned_rows.append(row)
					
					
					if len(returned_rows) > 0:
						for row in returned_rows:
							if len(row)==18:
								print f + " " + row[4]
							if len(row)==17 or len(row)==16:
								print f + " " + row[3]
		