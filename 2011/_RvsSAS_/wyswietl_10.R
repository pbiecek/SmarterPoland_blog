#wlaczam pdf
pdf("C:/regresje/Regresje_10zm.pdf",width=11,height=8.5)# pdf

#parametry wyswietlania
par(mar=c(4.5,5,3,10)) #marginesy
plot.new() #rysuje nowe okno
plot.window(xlim=c(10^3, 10^8), ylim=c(0.001,2000),log="xy") #ustawiam zasieg zmiennych
box(col="gray",lwd=2) #ramka wykresu
lx=c(10^3,3*10^3,10^4,3*10^4,10^5,3*10^5,10^6,3*10^6,10^7,3*10^7,10^8)
axis(1,at=lx,labels=c("1 tyœ","3 tyœ","10 tyœ","13 tyœ","100 tyœ","300 tyœ",
	"1 mln","3 mln","10 mln","30 mln","100 mln"),col="gray") #os OX
ly=c(0.001,0.01,0.1,1,10,60,600,2400)
axis(2,at=ly,labels=c("1ms","10ms","100ms","1s","10s","1m",
	"10m","40m"),col="gray") # os OY

#kolory
kol1="deepskyblue"
kol2="blue"
kol3="gold"
kol4="orange"
kol5="red"
kol6="red3"

#dane
lm=c(0.0056,0.0117,0.0372,0.2214,0.7278,2.1105,7.1367,28.58,NA,NA,NA)
lmfit=c(0.001,0.0022,0.0056,0.0318,0.112,0.38,1.2634,4.04,NA,NA,NA)
glm_r=c(0.008,0.0174,0.0644,0.2936,1.0296,3.149,9.5267,29.12,NA,NA,NA)
glmfit=c(0.0036,0.0083,0.0266,0.1064,0.3426,1.1305,3.6934,11.64,NA,NA,NA)
reg=c(0.035,0.04,0.04,0.05,0.055,0.115,0.32,1.89,4.21,12.15,754.31)
glm_sas=c(0.03,0.03,0.035,0.045,0.12,0.28,0.8,3.18,27.74,395.21,1089.12)
genmod=c(0.025,0.03,0.05,0.11,0.18,1.22,4.95,14.38,755.92,2628.56,NA)
mixed=c(0.015,0.025,0.035,0.06,0.175,0.55,1.59,4.76,38.07,79.63,1882.17)

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
points(lx[10],genmod[10],cex=1.5,pch=17)
points(lx[10],genmod[10],cex=1,pch=17,col=kol6)

#tytul 
title( xlab="iloœæ obserwacji (wierszy)",ylab="œredni czas wykonania",
	main="Czas przeprowadzenia regresji dla 10 zmiennych")

#legenda - parametry
par(xpd=NA)
xmax=1.55*lx[11]
ymax[1]=2*ly[8]
for (i in 2:18)
ymax[i]=ymax[i-1]/2.5
dy=0.4
ls=1.1
ts=1.2
s=2.3
#legenda - regresje z R
legend(xmax,ymax[1],"Regresje z R:",bty="n",border=NA, cex=ts)
legend(xmax,ymax[2],"(ostatni mo¿liwy wêze³:\n 3 mln obserwacji)",bty="n",border=NA, cex=ts/1.5)
legend(xmax,ymax[4],"glm",col=kol2,bty="n",lty=1,lwd=s,border=NA, cex=ls) #lm 
legend(xmax,ymax[5],"glm.fit",col=kol2,bty="n",lty=2,lwd=s,border=NA,cex=ls) #lm.fit
legend(xmax,ymax[6],"lm",col=kol1,bty="n",lty=1,lwd=s,border=NA,cex=ls) #lm.fit
legend(xmax,ymax[7],"lm.fit",col=kol1,bty="n",lty=2,lwd=s,border=NA,cex=ls) #lm.fit
#legenda - regresje z SAS
legend(xmax,ymax[9],"Regresje z SAS:",bty="n",border=NA, cex=ts)
legend(1.2*xmax,ymax[10],"(ostatni wêze³ policzalny\n w czasie < 1h)",bty="n",border=NA, cex=ts/1.5,pch=24,pt.cex=1.3)
legend(xmax,ymax[12],"genmod",col=kol6,bty="n",lty=1,lwd=s,border=NA, cex=ls) #lm 
legend(xmax,ymax[13],"mixed",col=kol5,bty="n",lty=1,lwd=s,border=NA,cex=ls) #lm.fit
legend(xmax,ymax[14],"glm",col=kol4,bty="n",lty=1,lwd=s,border=NA,cex=ls) #lm.fit
legend(xmax,ymax[15],"reg",col=kol3,bty="n",lty=1,lwd=s,border=NA,cex=ls) #lm.fit
legend(xmax,ymax[17],"M.Marciniak\nnr ind. 214727",bty="n",border=NA)
par(xpd=F)
dev.off()