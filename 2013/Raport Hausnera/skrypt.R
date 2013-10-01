polska <- c(32.5, 38.3, 34.9)
europa <- c(655.9, 738.2, 719.3)
swiat <- c(3696.2, 6895.9, 9306.1)

names(polska) = c("1970", "2010", "2050")

setwd("/Users/pbiecek/camtasia/GitHub/SmarterPoland_blog/2013/Raport Hausnera/")

pdf("demografiaN.pdf", 12, 9)
par(mfrow=c(1,2))

barplot(polska, ylim=c(0,40), las=1, border="white", yaxt = "n")
axis(2, seq(0,40,5), paste0(seq(0,40,5), "mln"), las=1)
abline(h=seq(5,45,5), lty=3, col="white", lwd=3)

barplot(100*polska / swiat, las=1, ylim=c(0,.9), border="white", yaxt = "n")
axis(2, seq(0,1,0.1), paste0(seq(0,1,0.1), "%"), las=1)
abline(h=seq(0.1,0.8,0.1), lty=3, col="white", lwd=3)
dev.off()


dat <- readLines("konkurencyjnosc.txt")
nazwy <- gsub(dat, pattern="[0-9\\. ]*$", replacement="")
liczby <- gsub(dat, pattern="^[^0-9]*", replacement="")
liczbyMat <- t(sapply(strsplit(liczby, split=" "), as.numeric))
rownames(liczbyMat) = nazwy

pdf("konkurencyjnoscN.pdf", 12, 12)
par(xpd=NA)
plot(rep(1, nrow(liczbyMat)), liczbyMat[,4], bty="n", xaxt="n", yaxt="n", xlab="", ylab="", pch='+', cex=2, col="#00000022", ylim=c(4.5, 6.2), xlim=c(0,2))
points(1, liczbyMat["Poland", 4], pch='+', cex=3, col="red3")
text(1.07, liczbyMat["Poland", 4], paste0("Poland (", liczbyMat["Poland",3], ")"), col="red3", adj=c(0,0.5))
axis(2, seq(4, 6.2, 0.2), las=1)

inne <- c("Finland", "Singapore", "Germany", "Norway", "United Kingdom", "Ireland", "France", "Ukraine", "Russian Federation", "Slovenia", "Spain", "Czech Republic", "United States", "Korea, Rep", "Barbados", "Malaysia", "Taiwan, China", "Bahrain", "Portugal")

for (i in inne) {
  text(0.93, liczbyMat[i, 4], paste0(i," (", liczbyMat[i,3], ")"), col="blue3", adj=c(1,0.5))
}

dev.off()

