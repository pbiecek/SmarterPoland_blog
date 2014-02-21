set terminal epslatex font 8 color colortext size 15.5cm,7cm
set output 'GNUwykres-gnuplottex-fig5.tex'
set xdata time
set timefmt "%Y-%m-%d"
set format x "%Y\n%b"
set datafile separator ","
set xrange ["2011-12":"2013-12"]
set mxtics 3
set ylabel "Cena otwarcia"
set bmargin 0
set grid
plot "/home/krz/Pulpit/GNUwykres/DATA/wig20_d.csv" u 1:2 with lines title columnhead lc rgb "orange" lw 5, "/home/krz/Pulpit/GNUwykres/DATA/wig20_d.csv" u 1:2 smooth sbezier title "krzywa Bezier" lc rgb "black" lw 1 lt 1
