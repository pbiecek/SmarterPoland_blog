#wlaczam pdf
pdf("C:/regresje/Regresje_1000zm.pdf",width=11,height=8.5)# pdf

#parametry wyswietlania
par(mar=c(5,6,3,12)) #marginesy
plot.new() #rysuje nowe okno
plot.window(xlim=c(10^3, 10^6), ylim=c(1,4000),log="xy") #ustawiam zasieg zmiennych
box(col="gray",lwd=2) #ramka wykresu
lx=c(10^3,3*10^3,10^4,3*10^4,10^5,3*10^5,10^6)
axis(1,at=lx,labels=c("1 tyœ","3 tyœ","10 tyœ","30 tyœ","100 tyœ","300 tyœ",
	"1 mln"),col="gray") #os OX
ly=c(1,3,10,30,60,180,600,1800,3600)
axis(2,at=ly,labels=c("1s","3s","10s","30s","1m",
	"3m","10m","30m","1h"),col="gray") # os OY

#kolory
kol1="deepskyblue"
kol2="blue"
kol3="gold"
kol4="orange"
kol5="red"
kol6="red3"

#dane
lm=c(1.312,4.809,16.932,54.83667,NA,NA,NA)
lmfit=c(1.077,4.213,14.964,50.18334,NA,NA,NA)
glm_r=c(1.484667,9.15,32.596,106.9267,NA,NA,NA)
glmfit=c(1.182667,8.683,30.74,102.06,NA,NA,NA)

reg=c(1.83,3.476,9.503,26.385,86.695,256.11,1035.59)
glm_sas=c(2.55,4.967,13.17,30.52,122.84,451.155,1486.38)
mixed=c(14.62,16.623,24.36,46.015,141.31,407.42,2336.34)
genmod=c(14.433,34.567,105.2267,308.41,1075.9,4307.86,NA)


#linie pomocnicze
for (i in 1:length(ly))
	lines(c(10,10^10),c(ly[i],ly[i]),lwd=0.5,col="gray",lty=3)
for (i in 1:length(lx))
	lines(c(lx[i],lx[i]),c(0.0001,10^5),lwd=0.5,col="gray",lty=3)

#parametry
s=2
p=16

#regresje sas
points(lx,reg,type="b",lwd=s, col=kol3, pch=p)
points(lx,glm_sas,type="b",lwd=s, col=kol4, pch=p)
points(lx,mixed,type="b",lwd=s, col=kol5, pch=p)
points(lx,genmod,type="b",lwd=s, col=kol6, pch=p)

#regresje r
points(lx,lm,type="b",lwd=s, col=kol1, pch=p)
points(lx,lmfit,type="b",lwd=s, col=kol1, lty=2, pch=p)
points(lx,glm_r,type="b",lwd=s, col=kol2, pch=p)
points(lx,glmfit,type="b",lwd=s, col=kol2, lty=2, pch=p)

#over
points(lx[6],genmod[6],cex=1.5,pch=17)
points(lx[6],genmod[6],cex=1,pch=17,col=kol6)

#tytul 
title( xlab="iloœæ obserwacji (wierszy)",ylab="œredni czas wykonania",
	main="Czas przeprowadzenia regresji dla 1000 zmiennych")

#legenda - parametry
par(xpd=NA)
xmax=1.85*lx[7]
ymax[1]=1.5*ly[9]
for (i in 2:18)
ymax[i]=ymax[i-1]/1.67
dy=0.4
ls=1.1
ts=1.2
s=2.3
#legenda - regresje z R
legend(xmax,ymax[1],"Regresje z R:",bty="n",border=NA, cex=ts)
legend(xmax,ymax[2],"(ostatni mo¿liwy wêze³:\n 30 tyœ obserwacji)",bty="n",border=NA, cex=ts/1.5)
legend(xmax,ymax[4],"glm",col=kol2,bty="n",lty=1,lwd=s,border=NA, cex=ls) #lm 
legend(xmax,ymax[5],"glm.fit",col=kol2,bty="n",lty=2,lwd=s,border=NA,cex=ls) #lm.fit
legend(xmax,ymax[6],"lm",col=kol1,bty="n",lty=1,lwd=s,border=NA,cex=ls) #lm.fit
legend(xmax,ymax[7],"lm.fit",col=kol1,bty="n",lty=2,lwd=s,border=NA,cex=ls) #lm.fit
#legenda - regresje z SAS
legend(xmax,ymax[9],"Regresje z SAS:",bty="n",border=NA, cex=ts)
legend(1.2*xmax,ymax[10],"(ostatni wêze³ policzalny\n w czasie < 2h)",bty="n",border=NA, cex=ts/1.5,pch=24,pt.cex=1.3)
legend(xmax,ymax[12],"genmod",col=kol6,bty="n",lty=1,lwd=s,border=NA, cex=ls) #lm 
legend(xmax,ymax[13],"mixed",col=kol5,bty="n",lty=1,lwd=s,border=NA,cex=ls) #lm.fit
legend(xmax,ymax[14],"glm",col=kol4,bty="n",lty=1,lwd=s,border=NA,cex=ls) #lm.fit
legend(xmax,ymax[15],"reg",col=kol3,bty="n",lty=1,lwd=s,border=NA,cex=ls) #lm.fit
legend(xmax,ymax[17],"M.Marciniak\nnr ind. 214727",bty="n",border=NA)
par(xpd=F)
dev.off()