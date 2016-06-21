 alergicy <- c(1, 7, 5, 3, 8, 4, 5, 1, 7, 0, 6) + 10
 zanieczyszczenie <- 0:10
 
 cor(zanieczyszczenie, alergicy, method="kendall")
 -0.03739788

 cor(zanieczyszczenie, alergicy, method="spearman")
 -0.04576767

 library(Cairo)
 CairoSVG("ecapZ.svg", 6,6)
 plot(zanieczyszczenie,alergicy, type="b", cex=1.1, pch=19, ylim=c(8,20), ylab="% osob z potwierdzonym niezytem nosa",las=1,bty="n")
 axis(1,at=1:10)
 abline(h=seq(2,20,2),col="grey95",lty=2)
 points(zanieczyszczenie,alergicy, type="b", cex=1.1, pch=19)
 abline(lm(alergicy~zanieczyszczenie),lwd=2,lty=2,col="green3")
 dev.off()




# wlasne

rokUrodzenia <- dane[,"v127"]
kiedyPali <- dane[,"v274"]
czyPali <- dane[,"v273"]
kiedyPali[which(kiedyPali=="99")] = NA

ile1 <- dane[,"v276.001"]
ile2 <- dane[,"v279.001"]
ile1[which(ile1=="999")] = NA
quantile(ile1, c(0,0.1,0.25,0.5,0.75,0.9,1),na.rm=T)
lkw <- tapply(ile1, 2007-rokUrodzenia-kiedyPali, quantile, c(0,0.1,0.5,0.9,1), na.rm=T)

tmp = tmp[,3:30]
kol = c("red1","red2","red3","red2","red1")

library(Cairo)

CairoSVG("palenieEcap.svg",8,6)
x = as.numeric(colnames(tmp))
matplot(x, t(tmp), type="o", pch=19, xlim=c(1962, 1987), las=1, xlab="rok urodzenia", ylab="wiek rozpoczecia palenia", lwd=c(1,2,3,2,1), col=kol, lty=c(3,2,1,2,3),bty="n",cex=c(0.4,0.7,1,0.7,0.4))
axis(2,at=seq(5,40,5),las=1)
axis(1,at=seq(1960,1990,5),las=1)
abline(2007,-1)
for (y in seq(5,40,2.5))
   lines(c(0,2007-y),c(y,y),col="grey90",lty=2)
matpoints(x, t(tmp), type="o", pch=19, lwd=c(1,2,3,2,1), col=kol, bty="n",lty=c(3,2,1,2,3),cex=c(0.4,0.7,1,0.7,0.4))
legend("topright",paste("kwantyl",c(100,90,50,10,0),"%"),lwd=c(1:3,2,1),col=kol,bg="white",border="white",bty="n",pch=19,lty=c(3,2,1,2,3))
dev.off()












kiedyPali[which(kiedyPali=="99")] = NA
rokUrodzenia[which(rokUrodzenia=="9999")] = NA


lkw <- tapply(kiedyPali, rokUrodzenia, function(x) c(quantile(x,c(0,0.1,0.5,0.9,1), na.rm=TRUE),mean(x, na.rm=T)))
tmp <- matrix(unlist(lkw), 6)
colnames(tmp) <- names(lkw)

tmp = tmp[,3:28]


kol = c("red1","red2","red3","red2","red1","blue3")

library(Cairo)

CairoSVG("palenieEcap.svg",8,6)
x = as.numeric(colnames(tmp))
matplot(x, t(tmp), type="o", pch=19, xlim=c(1962, 1987), las=1, xlab="rok urodzenia", ylab="wiek rozpoczecia palenia", lwd=c(1,2,3,2,1,2), col=kol, lty=c(3,2,1,2,3,2),bty="n",cex=c(0.4,0.7,1,0.7,0.4,0.8))
axis(2,at=seq(5,40,5),las=1)
axis(1,at=seq(1960,1990,5),las=1)
abline(2007,-1)
for (y in seq(5,40,2.5))
   lines(c(0,2007-y),c(y,y),col="grey90",lty=2)
matpoints(x, t(tmp), type="o", pch=19, lwd=c(1,2,3,2,1), col=kol, bty="n",lty=c(3,2,1,2,3),cex=c(0.4,0.7,1,0.7,0.4,0.8))
legend("topright",c(paste("kwantyl",c(100,90,50,10,0),"%"),"œrednia"),lwd=c(1:3,2,1,2),col=kol,bg="white",border="white",bty="n",pch=19,lty=c(3,2,1,2,3,1,2))
dev.off()



CairoSVG("palenieEcap2.svg",8,6)
prop <- 100*prop.table(table(czyPali,rokUrodzenia),2)[2,3:28]
plot(as.numeric(names(prop)),prop,type="o",pch=19,las=1,xlab="rok urodzenia",ylab="% osob palacych przez przynajmniej rok",ylim=c(30,70))
for (y in seq(30,70,5))
   lines(c(0,2007),c(y,y),col="grey90",lty=2)
dev.off()
