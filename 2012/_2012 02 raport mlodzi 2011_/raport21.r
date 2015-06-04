x1 <- c(72,47,32,28,16,45,15,24,29)
x2 <- c(78,77,70,72,68,78,59,61,42)

et<-c('Spokojne ¿ycie', 'Barwne ¿ycie', 'Du¿e pieni±dze',
'Interesuj¹ca praca', 'Dobre wykszta³cenie', 'Presti¿ i szacunek',
'Bycie u¿ytecznym', 'PrzyjaŸñ', 'Udane ¿ycie rodzinne')

library(Cairo)
CairoSVG("rys21.svg",8,7)
CairoPNG("rys21.png",700,550)
par(xpd=F)
plot(10-rank(x2),10-rank(x1),xlim=c(9,1),ylim=c(9,1), pch=19,bty="n", xaxt="n", yaxt="n", xlab="Pozycja w hierarchii wa¿noœci w 2007", ylab="Pozycja w hierarchii wa¿noœci w 1976", las=1)
abline(h=seq(1,9,2), col="grey", lty=3)
abline(v=seq(1,9,2), col="grey", lty=3)
abline(0,1, col="grey", lty=3)
par(xpd=NA)
text(10-rank(x2),10-rank(x1), paste(rev(et), " (", ifelse(rank(x2) - rank(x1) > 0,"+",""),  rank(x2) - rank(x1), ")", sep=""), adj=c(0.5,-0.5))
axis(1,1:9)
axis(2,1:9)
dev.off()



CairoPNG("rys21d.png",700,550)
par(xpd=F)
plot(x2,x1, pch=19, xlab="Wa¿noœc w 2007", ylab="Wa¿noœc w 1976", bty="n", xlim=c(40,80))
abline(h=seq(10,100,10), col="grey", lty=3)
abline(v=seq(10,100,10), col="grey", lty=3)
par(xpd=NA)
text(x2,x1, rev(et), adj=c(0.5,-0.5))
dev.off()


pdf("rys21g.pdf",9,9)
par(xpd=F)
plot(x1,x2, pch=19, ylab="Wa¿no¶æ w 2007", xlab="Wa¿noœc w 1976", bty="n" ,ylim=c(40,80), las=1)
abline(h=seq(10,100,10), col="grey", lty=3)
abline(v=seq(10,100,10), col="grey", lty=3)
par(xpd=NA)
text(x1,x2, rev(et), adj=c(0.5,-0.5))
dev.off()

