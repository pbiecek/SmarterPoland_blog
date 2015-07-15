#wlaczam pdf
pdf("C:/regresje/Regresje_100zm.pdf",width=11,height=8.5)# pdf

#parametry wyswietlania
par(mar=c(4.5,5,3,11)) #marginesy
plot.new() #rysuje nowe okno
plot.window(xlim=c(10^3, 10^7), ylim=c(0.01,3500),log="xy") #ustawiam zasieg zmiennych
box(col="gray",lwd=2) #ramka wykresu
lx=c(10^3,3*10^3,10^4,3*10^4,10^5,3*10^5,10^6,3*10^6,10^7)
axis(1,at=lx,labels=c("1 tyœ","3 tyœ","10 tyœ","13 tyœ","100 tyœ","300 tyœ",
	"1 mln","3 mln","10 mln"),col="gray") #os OX
ly=c(0.01,0.1,1,10,60,600,3600)
axis(2,at=ly,labels=c("10ms","100ms","1s","10s","1m",
	"10m","1h"),col="gray") # os OY

#kolory
kol1="deepskyblue"
kol2="blue"
kol3="gold"
kol4="orange"
kol5="red"
kol6="red3"

#dane
lm=c(0.036,0.1512,0.5303,1.331,3.994,15.864,NA,NA,NA)
lmfit=c(0.0182,0.0606,0.2223,0.7147,2.404,10.592,NA,NA,NA)
glm_r=c(0.0578,0.2176,0.7417,2.125,6.958,27.628,NA,NA,NA)
glmfit=c(0.0388,0.1202,0.459,1.4883,5.1,22.08,NA,NA,NA)
reg=c(0.04,0.055,0.11,0.21,0.6467,2.79,5.967,16.86,513.69)
glm_sas=c(0.042,0.07,0.19,0.333,1.0967,5.16,28.89,568.57,1049.06)
genmod=c(0.138,0.356,1.134,3.243,11.61,32.98,235.79,3713.69,NA)
mixed=c(0.041,0.068,0.174,0.47,1.56,4.79,62.827,145.67,1220.96)

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
points(lx[8],genmod[8],cex=1.5,pch=17)
points(lx[8],genmod[8],cex=1,pch=17,col=kol6)

#tytul 
title( xlab="iloœæ obserwacji (wierszy)",ylab="œredni czas wykonania",
	main="Czas przeprowadzenia regresji dla 100 zmiennych")

#legenda - parametry
par(xpd=NA)
xmax=1.65*lx[9]
ymax[1]=1.8*ly[7]
for (i in 2:18)
ymax[i]=ymax[i-1]/2.15
dy=0.4
ls=1.1
ts=1.2
s=2.3
#legenda - regresje z R
legend(xmax,ymax[1],"Regresje z R:",bty="n",border=NA, cex=ts)
legend(xmax,ymax[2],"(ostatni mo¿liwy wêze³:\n 300 tyœ obserwacji)",bty="n",border=NA, cex=ts/1.5)
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