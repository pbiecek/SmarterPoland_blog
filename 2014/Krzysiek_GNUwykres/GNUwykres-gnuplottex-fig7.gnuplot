set terminal epslatex font 8 color colortext size 14cm,7.5cm
set output 'GNUwykres-gnuplottex-fig7.tex'
set datafile separator ","
set bmargin 0.5
set format x "%g kg"
set format y "%g $\\mu_3$"
set mxtics 2
set mytics 2
set xtics 2
set xrange[0:21]
set xzeroaxis
p "/home/krz/Pulpit/GNUwykres/DATA/a.csv" u 2:3 t "interpolacja" smooth csplines lw 5 lc rgb "orange" lt 1,"/home/krz/Pulpit/GNUwykres/DATA/a.csv" u 2:($3>=0 ? $3:1/0) t "wynik dodatni" w points pt 7 lc rgb "red","/home/krz/Pulpit/GNUwykres/DATA/a.csv" u 2:($3<0 ? $3:1/0) t "wynik ujemny" w points pt 7 lc rgb "blue","/home/krz/Pulpit/GNUwykres/DATA/a.csv" u 2:($3>0 ? ($3+0.05):1/0 ):3 t "" smooth uniq w labels
