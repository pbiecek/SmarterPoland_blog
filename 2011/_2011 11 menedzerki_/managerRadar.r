# http://www.egospodarka.pl/73883,Kobieta-menedzer-ma-mniejsze-szanse-na-awans,1,39,1.html

dane <- matrix(c(12, 51,
415, 332,
228, 370,
364, 275,
249, 299,
265, 404,
358, 383,
380, 290,
396, 332, 
376, 359), 10,2,byrow=T)
nazwy <- c("Inne", "Zaangazowanie w prace", "Dyspozycyjnosc", "Wyksztalcenie", "Znajomosci towarzyskie", "Umiejetnosc podejmowania szybkich decyzji", "Wczesniejsze sukcesy zawodowe", "Umiejetnosc wspolzycia z ludzmi", "Umiejetnosc komunikowania sie", "Dobra opinia w srodowisku zawodowym")
nazwy2 <- sapply(nazwy, function(n) {
   tmp <- strsplit(n, split=" ")[[1]]
   c(paste(tmp[1:(length(tmp)/2)],collapse=" "),
     paste(tmp[-(1:(length(tmp)/2))],collapse=" "))
})


# wykresy radarowe 
grup <- nrow(dane)
x <- sin(2*pi*(1:grup)/grup)
y <- cos(2*pi*(1:grup)/grup)

plotPath <- function (wsp, labs, col="#dddddd", col2=col, pch=19, lwd=3, cex2=1, cex=0.8,adj=c(0.5,0.5)) {
  inds <- c(seq_along(wsp),1)
#  polygon((x*wsp)[inds],(y*wsp)[inds], col=col, lwd=lwd)
#  polygon((x*wsp)[inds],(y*wsp)[inds], border=col, col=NA, lwd=lwd)
  points(x*wsp,y*wsp, col=col, pch=pch, cex=cex2)
  text(x*(wsp+0.07),y*(wsp+0.07), labs, adj=adj, cex=cex,col=col2)
}
plotSpider <-function(nazwy,skala=c(0,0.5,1), skala2=1.1, skala3=1.4, cex=1, cex2=0.7, pch=19) {
  for (i in seq_along(skala)) 
    points(x*skala[i],y*skala[i],pch=pch,cex=cex)
  for (i in 1:grup) 
     lines(c(0,skala2*x[i]), c(0,skala2*y[i]),lty="1818") #3
  for (i in 1:grup) {
     text(skala3*x[i], skala3*y[i], nazwy[1,i], adj=c(0.5,-0.5), cex=cex2)
     text(skala3*x[i], skala3*y[i], nazwy[2,i], adj=c(0.5,0.5), cex=cex2)
  }
}

# kolejnosc, wielkosc grup

kol <- order(dane[,1]/dane[,2])
nazwy <- nazwy[kol]
nazwy2 <- nazwy2[,kol]
dane <- dane[kol,]

library(Cairo)

CairoSVG("radar1.svg",8,8)
par(mar=c(0,0,0,0))
plot(c(-1.6,1.6),c(-1.6,1.6), xlab="",ylab="",bty="n",type="n",xaxt="n",yaxt="n")
plotSpider(nazwy2,cex=0.8,skala=0)
# udzial kobiet
wsp2 <- rowSums(dane)/(2.2*mean(dane))
plotPath(wsp2, rowSums(dane), col="#dd000050",col2="#660000",lwd=1,pch=15)
wsp <- dane[,1]/rowSums(dane)
plotPath(wsp, paste(round(wsp*100),"%"),col="#dddddd50", col2="#666666",lwd=1)
legend("topright",c("suma wskazan", "% wskazan kobiet"),pch=c(15,19),cex=1,col=c("#dd0000","#dddddd"),bty="n")
dev.off()

# kolejnosc, roznica pomiedzy odpowiedziami

kol <- order(dane[,1] - dane[,2])
nazwy <- nazwy[kol]
nazwy2 <- nazwy2[,kol]
dane <- dane[kol,]

CairoSVG("radar2.svg",8,8)
par(mar=c(0,0,0,0))
plot(c(-1.6,1.6),c(-1.6,1.6), xlab="",ylab="",bty="n",type="n",xaxt="n",yaxt="n")
plotSpider(nazwy2,cex=0.8,skala=0)
# udzial kobiet
wsp <- dane[,1]/max(dane)
wsp2 <- dane[,2]/max(dane)
plotPath(wsp2, dane[,2],col="#dd0000",pch=17,cex2=1.5,lwd=1)
plotPath(wsp, dane[,1],col="#0000dd",cex2=1.5,lwd=1)
legend("topright",c("wskazania mezczyzn", "wskazania kobiet"),pch=c(17,19),cex=1,col=c("#dd0000","#0000dd"),bty="n")
dev.off()

CairoSVG("radar3.svg",8,8)
par(mar=c(0,0,0,0))
plot(c(-1.6,1.6),c(-1.6,1.6), xlab="",ylab="",bty="n",type="n",xaxt="n",yaxt="n")
plotSpider(nazwy2,cex=0.8,skala=0)
# udzial kobiet
wsp <- dane[,1]/max(dane)
wsp2 <- dane[,2]/max(dane)
plotPath(wsp2, dane[,2],col="#dd0000",pch=17,cex2=1.5,lwd=1)
plotPath(wsp, dane[,1],col="#0000dd",cex2=1.5,lwd=1)
legend("topright",c("wskazania mezczyzn", "wskazania kobiet"),pch=c(17,19),cex=1,col=c("#dd0000","#0000dd"),bty="n")
dev.off()




CairoSVG("radar4.svg",8,8)
par(mar=c(0,0,0,0))
plot(c(-1.6,1.6),c(-1.6,1.6), xlab="",ylab="",bty="n",type="n",xaxt="n",yaxt="n")
plotSpider(nazwy2,cex=0.8,skala=0)
# udzial kobiet
wsp <- dane[,1]/max(dane)
wsp2 <- dane[,2]/max(dane)
plotPath(wsp2, dane[,2],col="#dd000070",pch=17,cex2=1.5,lwd=1)
plotPath(wsp, dane[,1],col="#0000dd70",cex2=1.5,lwd=1)
legend("topright",c("wskazania mezczyzn", "wskazania kobiet"),pch=c(17,19),cex=1,col=c("#dd0000","#0000dd"),bty="n")
dev.off()


