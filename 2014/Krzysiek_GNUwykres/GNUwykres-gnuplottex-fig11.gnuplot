set terminal epslatex font 8 color colortext size 12cm,6cm
set output 'GNUwykres-gnuplottex-fig11.tex'
set xzeroaxis
set key top left
#set ylabel "{\\Large $y$ -- wartości}"
set ylabel "$y$ -- wartości"
set xlabel "$x$ -- argumenty"
set xrange[-7:7]
set yrange[-5:5]
set tics out
set xtics offset 0,0.25
set ytics offset 0.5,0
set size ratio 0.71
plot (x>=0 && x<=4)?4*sin(x/2):1/0 with filledcurve y1=0 lc rgb "#FFDAB9" t "$D_{1}=11.329$",(x>=-4 && x<=-2)?4*sin(x/2):1/0 with filledcurve y1=0 lc rgb "#F0E68C" t "$D_{2}=7.651$",4*sin(x/2) lc rgb "orange" lw 5 lt 1 t ""
