set terminal epslatex font 8 color colortext size 15.5cm,9cm
set output 'GNUwykres-gnuplottex-fig6.tex'
set xdata time
set timefmt "%Y-%m-%d"
set format x "%Y\n%b"
set datafile separator ","
set xrange ["2013-01":"2013-11"]
set bmargin 2
unset key
set grid y
set ylabel "Cena otwarcia"
set mxtics 0
set multiplot
set size 1, 0.5
set origin 0, 0.5
plot "/home/krz/Pulpit/GNUwykres/DATA/wig20_d.csv" u 1:2 with impulses  lc rgb "orange" lw 1 lt 1
set origin 0, 0
plot "/home/krz/Pulpit/GNUwykres/DATA/wig20_d.csv" u 1:2:4:3:5 with candlesticks lc rgb "black"
unset multiplot
