set terminal epslatex font 8 color colortext size 15.5cm,6cm
set output 'GNUwykres-gnuplottex-fig13.tex'
set parametric
set bmargin 0
set grid
set sample 1000
set key outside left center spacing 1.5
set size ratio 0.625
set x2tics ("$\\frac{3}{2}$" 1.5,"$-\\frac{3}{2}$" -1.5,"$-3$" -3,"$3$" 3)
set ytics add ("$-1$" -1,"$1$" 1)
plot [-3*pi:3*pi] [-8:8] [-5:5]\
0+sin(t),0+cos(t) lc rgb "orange" lt 1 lw 5 t "$x^2+y^2=1$",\
0+1.5*sin(t),0+4*cos(t) lc rgb "violet" lt 1 lw 5 t "$16x^2+y^2=16$",\
2*cosh(t),4*sinh(t) lc rgb "red" lt 1 lw 5 t "$9x^2-2.25y^2=36$",\
-2*cosh(t),-4*sinh(t) lc rgb "red" lt 1 lw 5 t "",\
-0.1*t**2-3,t lc rgb "green" lt 1 lw 5 t "$x=-\\frac{1}{10}y^2-3$",\
6,t lc rgb "blue" lt 1 lw 5 t "$x=6$",\
t, 0.05*t**2-4.5 lc rgb "black" lt 1 lw 5 t "$y=\\frac{1}{20}x^2-4\\frac{1}{2}$"
unset parametric
