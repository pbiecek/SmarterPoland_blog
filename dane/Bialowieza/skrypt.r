dane <- read.table("bialowieza.csv", sep=";", h=T)
dane2 <- na.omit(dane)

par(mar=c(5,5,5,5))
matplot(dane2[,1], dane2[,c(2,4)], type="o", pch=19, lty=1, xaxs="i", yaxs="i", xlab="rok", ylab="liczba chrztów / zgonów", las=1, xlim=c(1875,2005), ylim=c(0,185), col=c("gold3", "red2"))

polygon(c(dane2[,1], rev(dane2[,1])), c(dane2[,2], rev(dane2[,4])), border=NA, col="#00000011")
polygon(c(dane2[1,1], dane2[,1], rev(dane2[,1])[1]), c(0,dane2[,2], 0), border=NA, col="#cdac0066")
polygon(c(dane2[1,1], dane2[,1], rev(dane2[,1])[1]), c(0,pmin(dane2[,4], dane2[,2]), 0), border=NA, col="#FFFFFF")

braki <- dane[which(is.na(dane[,2])),1]
rect(braki - 0.55, 5, braki + 0.55, 160, border=NA, col="white", density = -1)

legend("topleft", c("# chrztów", "# zgonów", "bilans od 1877"), lty=1, pch=c(19,19,15), col=c("gold3","black","green4"), ncol=3, bty="n", cex=1.1)
matpoints(dane2[,1], dane2[,c(2,4)], type="o", pch=19, lty=3,  col=c("gold3", "black"))

abline(h=seq(0,150,25), col="#77777722")
abline(v=seq(1880,2020,20), col="#77777722")

par(usr=c(1875,2005,0,3700))
axis(4, las=1, col="green4", col.ticks="green4", col.axis="green4")
mtext("bilans", 4, col="green4", line=3)
points(dane2[,1], cumsum(dane2[,2]) - cumsum(dane2[,4]), type="o", pch=15, lty=1, col="green4", cex=0.8)

mtext("Chrzty i zgony w parafii prawoslawnej sw. Mikolaja Cudotwórcy w Bialowiezy", 3, line=2.5, cex=1.8)













CairoPNG("chrztyZgonyBialowiezaDuze2.png",1200,600)

par(mar=c(5,5,5,5))
matplot(dane2[,1], dane2[,c(2,4)], type="o", pch=19, lty=1, xaxs="i", yaxs="i", xlab="rok", ylab="liczba chrztów / zgonów", las=1, xlim=c(1875,2005), ylim=c(0,185), col=c("gold3", "red2"))

polygon(c(dane2[,1], rev(dane2[,1])), c(dane2[,2], rev(dane2[,4])), border=NA, col="#00000011")
polygon(c(dane2[1,1], dane2[,1], rev(dane2[,1])[1]), c(0,dane2[,2], 0), border=NA, col="#cdac0066")
polygon(c(dane2[1,1], dane2[,1], rev(dane2[,1])[1]), c(0,pmin(dane2[,4], dane2[,2]), 0), border=NA, col="#FFFFFF")

braki <- dane[which(is.na(dane[,2])),1]
rect(braki - 0.55, 5, braki + 0.55, 160, border=NA, col="white", density = -1)

legend("topright", c("# chrztów        ", "# zgonów"), lty=1, pch=c(19,19), col=c("gold3","black"), ncol=2, bty="n", cex=1.8)
matpoints(dane2[,1], dane2[,c(2,4)], type="o", pch=19, lty=3,  col=c("gold3", "black"))

abline(h=seq(0,150,25), col="#77777722")
abline(v=seq(1880,2020,20), col="#77777722")

mtext("Chrzty i zgony w parafii prawoslawnej sw. Mikolaja Cudotwórcy w Bia³owiezy", 3, line=2.5, cex=1.8)

dev.off()
