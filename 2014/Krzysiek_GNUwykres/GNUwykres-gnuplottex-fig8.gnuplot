set terminal epslatex font 8 color colortext size 12.5cm,5.5cm
set output 'GNUwykres-gnuplottex-fig8.tex'
set bmargin 0.5
set datafile separator ","
set key right bottom
set fit errorvariables
set xrange[0:21]
set yrange[0.5:7.5]
set mxtics 5
f(x)=a*x+b
a=1;b=1
fit f(x) "/home/krz/Pulpit/GNUwykres/DATA/b.csv" u 1:2 via a,b
print "error of a is:", a_err
print "error of a is:", b_err
set label "$a$ = %6.4f", a, "$\\quad\\pm$ %6.4f", a_err at 1.25,7.0
set label "$b$ = %6.4f", b, "$\\quad\\pm$ %6.4f", b_err at 1.25,6.5
set label "$s$ = %10.6f",FIT_STDFIT at 1.25,6.0
stat "/home/krz/Pulpit/GNUwykres/DATA/b.csv" u 1:2
set label "$R^2$ = %1.6f",STATS_correlation**2 at 1.25,5.5
#set label "$f(x) =$ a$x+$b" at 1.25,5
p f(x) title "$f(x)=ax+b$" lc rgb "orange" lw 5, "/home/krz/Pulpit/GNUwykres/DATA/b.csv" u 1:2:3  with yerrorbars title "" lt 1 pt 7 lc rgb "black"
