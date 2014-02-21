set terminal epslatex font 8 color colortext size 12cm,5.5cm
set output 'GNUwykres-gnuplottex-fig4.tex'
set xrange[-4:4]
set tmargin 0.5
set xlabel "x"
set ylabel "y"
set label "$\\mu=0,\\;\\sigma^2=1$" at -3.5, 0.35 left
set label "$\\int_{-\\infty}^{+\\infty}f(x)=1$" at 1.5, 0.35 left
Gauss(x,mu,sigma) = 1./(sigma*sqrt(2*pi)) * exp( -(x-mu)**2 / (2*sigma**2) )
plot Gauss(x,0,1) t "" lc rgb "orange" lw 5
