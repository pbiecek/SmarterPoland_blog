set terminal epslatex font 8 color colortext size 15.5cm,3.5cm
set output 'GNUwykres-gnuplottex-fig10.tex'
set xrange [-3*pi/2:2*pi]
set yrange [-1:1.2]
set ytics 1
set xtics 1
set size ratio 0.2000805
set xzeroaxis lt 1 lw 2 lc rgb 'black'
set yzeroaxis lt 1 lw 2 lc rgb 'black'
set border 0
set xtics axis
set ytics axis
set xtics ('$-\frac{3\pi}{2}$' -3*pi/2,'$-\pi$' -pi,\
 '$-\frac{\pi}{2}$' -pi/2, '$\frac{\pi}{2}$' pi/2, '$\pi$' pi,\
 '$\frac{3\pi}{2}$' 3*pi/2, '$2\pi$' 2*pi, '$\frac{\pi}{8}$' pi/8)\
  scale 0.5 offset 0,0.4
set ytics scale 0.5
set format xy '%.0f'
set format x2 '%.2f'
set x2tics scale 1 offset -0.3,-0.4
set x2tics out pi/2
set arrow from -1.5*pi,1.2 to 2*pi,1.2 nohead lt 2 lc 0
set key right top
#set style arrow 1 head filled size screen 0.015,10,35 linewidth 1 lt 2 lc rgb "red"
#set arrow from -2,-1.5 to 3,1 arrowstyle 1
#set style arrow 2 nohead lt 5 lc rgb "green"
#set arrow from -3,-1 to 5,0.5 arrowstyle 2
set bmargin 0
set lmargin 0
set rmargin 0
plot (x<0.4)?sin(x):1/0 t '$f(x)$' lc rgb 'orange' lw 7,\
(x>=0.39 && x<=2*pi)?cos(x-pi/4):1/0 t '' lc rgb 'orange' lw 7 lt 1,\
"<echo '0.39 0.38'" w points pt 7 lc rgb 'orange' ps 1.5 t "",\
"<echo '0.39 0.38'" w points pt 7 lc rgb 'white' ps 1 t "",\
"<echo '0.39 0.92'" w points pt 7 lc rgb 'orange' ps 1.5 t "",\
"<echo '6.28 0.707'" w points pt 7 lc rgb 'orange' ps 1.5 t ""
