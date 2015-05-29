wynagrodzenie <- c(2500, 2888, 3100, 4000, 3768, 4934, 4606, 6500, 9900, 16925)

library(Cairo)

CairoSVG("wynagrodzenia.svg", 6,5)

par(mar=c(5,3,1,3))
plot(wynagrodzenie[seq(2,10,2)], type="n", las=1, ylim=c(0,17500), xaxt="n", ylab="",yaxs="i",xlab="",cex=1,bty="n", yaxt="n")
abline(h=seq(2000,16000,2000), col="grey90")
lines(1:5 - 0.1, wynagrodzenie[seq(2,10,2)], type="h", pch=19,cex=1, col="red1", lwd=20, lend=1)
lines(1:5 + 0.01, wynagrodzenie[seq(1,10,2)]+75, type="h", pch=19,cex=1, col="white", lwd=20, lend=1)
lines(1:5 + 0.1, wynagrodzenie[seq(1,10,2)], type="h", pch=19,cex=1, col="red4", lwd=20, lend=1)
axis(1,at=1:5,label=c("p. szeregowy", "specjalista", "starszy specjalista", "kierownik", "dyrektor/zarzad"),cex.axis=0.8)
par(xpd=NA)
kw <- wynagrodzenie[seq(2,10,2)]
text(1:5+0.06 -0.15,kw,kw,adj=c(1,.5),cex=0.85)
kw <- wynagrodzenie[seq(1,10,2)]
text(1:5 -0.15,kw,kw,adj=c(1,.5),cex=0.85)
par(xpd=F)

legend("topleft", c("firmy z kapitalem zagranicznym", "firmy z kapitalem polskim"), cex=.9, bty="n", fill=c("red1","red4"))

dev.off()
