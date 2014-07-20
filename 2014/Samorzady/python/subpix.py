import sys
import numpy as np
import cv2
import math
import os
import subprocess




if len(sys.argv) != 3:
	print "Bad usage"
	exit()

im = cv2.imread(sys.argv[1])


im_new = np.zeros(shape=(im.shape[0]*3, im.shape[1]*3,3), dtype=im.dtype)
for y in range(0, im.shape[0]):
	for x in range(0, im.shape[1]):
		b=im.item(y,x,0)
		g=im.item(y,x,1)
		r=im.item(y,x,2)
		for y0 in range(y*3,y*3+3):
			for c in range(0,3):
				im_new.itemset((y0,3*x,c),r)
				im_new.itemset((y0,3*x+1,c),g)
				im_new.itemset((y0,3*x+2,c),b)

print im.shape
print im_new.shape
cv2.imwrite(sys.argv[2], im_new)
