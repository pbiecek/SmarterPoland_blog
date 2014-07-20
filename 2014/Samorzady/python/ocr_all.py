#all

import os
import sys

python_executable=sys.executable
subpixel_script = "subpix.py"
pdfimages_path = "c:\\cygwin\\bin\\pdfimages.exe"

working_dir = os.getcwd()
#
#
#pdfimage stuff?
pdf_files = [ f for f in os.listdir(os.getcwd()) if os.path.isfile(os.path.join(os.getcwd(),f)) and os.path.splitext(f)[1]==".pdf" ]
for pdfile in pdf_files:
	directory = os.path.splitext(pdfile)[0]
	if not os.path.exists(directory):
		os.makedirs(directory)
		cmd="{0} -j {1} {2}/{2}".format(pdfimages_path,pdfile, directory,directory)
		print cmd
		os.system(cmd)
	
	
	files = [ f for f in os.listdir(directory) if os.path.isfile(os.path.join(directory,f)) and not os.path.splitext(f)[1]==".txt" and not os.path.splitext(f)[1]==".png" ]
	for file in files:
		cmd="convert {0} {1}".format( os.path.join(directory,file), os.path.join(directory, os.path.splitext(file)[0]+".png"))
		print cmd
		os.system(cmd)
		os.remove( os.path.join(directory,file) )
	
	
	files = [ f for f in os.listdir(directory) if os.path.isfile(os.path.join(directory,f)) and not os.path.splitext(f)[1]==".txt" ]
	for file in files:
		file_path = os.path.join(directory,file)
		#subpixel_outfile= os.path.splitext(file_path)[0]+"_sub"+os.path.splitext(file_path)[1]
		#cmd = "{0} {1} {2} {3}".format(python_executable,subpixel_script,file_path,subpixel_outfile)
		#print cmd
		#os.system(cmd)
		
		#cmd = "textractvs.exe {0}".format( file_path )
		cmd =  "textractvs.exe {0}".format( directory+"/"+file)
		print cmd
		os.system(cmd)
		
		
		#os.rename( "i1.png", os.path.join(directory, os.path.splitext(file)[0]+"_i1.png"))
		#os.rename( "i2.png", os.path.join(directory, os.path.splitext(file)[0]+"_i2.png"))
		if os.path.isfile(os.path.join(directory, os.path.splitext(file)[0]+"_contours.txt")):
			os.remove(os.path.join(directory, os.path.splitext(file)[0]+"_contours.txt"))
		os.rename( "contours.txt", os.path.join(directory, os.path.splitext(file)[0]+"_contours.txt"))
		
		if os.path.isfile(os.path.join(directory, os.path.splitext(file)[0]+"_table.txt")):
			os.remove(os.path.join(directory, os.path.splitext(file)[0]+"_table.txt"))
		os.rename( "table.txt", os.path.join(directory, os.path.splitext(file)[0]+"_table.txt"))
		#os.rename( "sub.png", os.path.join(directory, os.path.splitext(file)[0]+"_sub.png"))


