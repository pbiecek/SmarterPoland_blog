set terminal epslatex font 8 color colortext size 12.5cm,6cm
set output 'GNUwykres-gnuplottex-fig9.tex'
set bmargin 0.5
set key outside
set fit errorvariables
set xrange[0:18.5]
set yrange[-0.5:20.5]
set y2range[-60:2]
set datafile separator ","
set y2tics tc rgb "red"
set ytics nomirror
#set y2label tc rgb "red"
#set format y2 "%2.1e"
#set logscale y2
f(x)=a*b**x
a=1;b=1
fit f(x) "/home/krz/Pulpit/GNUwykres/DATA/bb.csv" u 1:2 via a,b
set label "$f(x)=$ %1.2f",a, "$\\cdot$%1.2f$^x$", b at 12,3
p "/home/krz/Pulpit/GNUwykres/DATA/bb.csv" u 1:(-3*$2) axis x1y2 w points title "dane0" lt 6 lc rgb "red", "/home/krz/Pulpit/GNUwykres/DATA/bb.csv" u 1:2 axis x1y1 w points title "dane1" lt 7 lc rgb "black", f(x) axis x1y1 title "$f(x)$" lc rgb "orange" lw 5 lt 1
