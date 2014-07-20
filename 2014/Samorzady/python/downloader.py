import sys,os
import csv
import re

if len(sys.argv) < 2:
	sys.exit("Usage {0} filename.csv".format(sys.argv[1]))

f = open(sys.argv[1], "r")
freader = csv.reader(f, delimiter='\t')
#re.compile optimalisation
for row in freader:
	uni_str = row[1].decode('utf-8')
	#print type(uni_str)
	print uni_str
	#nie wykrywa Nowej Rudy, zmienic lub poprawic recznie
	matchObj = re.match(ur'.*Rady M[^\s]*( w| I Gminy)? ([^\s]*)', uni_str)
	if matchObj:
		print matchObj.group(2)#.decode("utf-8")
		city_name = matchObj.group(2)#.decode("utf-8")
		print type(city_name)
		print type(row[2])
		#city_name = city_name.encode("utf-8")
		command = (u"C:\\bin\\wget.exe -O miasta2013/{0}.pdf {1}".format(city_name,row[2].decode("utf-8")))
		print type(command)
		print command
		#print command.encode("cp1250")
		os.system(command.encode("cp1250"))
		#os.system(u"wget.exe -O miasta2013/{0}.pdf {1}".format(city_name,row[2].decode("utf-8")))
	else:
		print "no match"