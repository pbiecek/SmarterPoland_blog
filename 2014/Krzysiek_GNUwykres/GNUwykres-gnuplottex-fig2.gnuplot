set terminal pdf enhanced font "Times-Roman,10" size 12cm,7cm
set output 'GNUwykres-gnuplottex-fig2.pdf'
set xrange[-4:4]
set xlabel "x"
set ylabel "y"
set label "{/Symbol m} = 0, {/Symbol s}^2 = 1" at -3.5, 0.35 left
set label "{/Symbol \362@_{/=12 -\245}^{/=8 +\245}} f(x)= 1" at 1.5, 0.35 center
Gauss(x,mu,sigma) = 1./(sigma*sqrt(2*pi)) * exp( -(x-mu)**2 / (2*sigma**2) )
plot Gauss(x,0,1) t "" lc rgb "orange" lw 5
