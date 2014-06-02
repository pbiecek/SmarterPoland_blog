nazwy <- c("SURGE", "STORMER", "EVO", "ROCKA", "BULK", "BREEZ", "FURNO")
pancerz <- c(2700, 2800, 2500, 2700, 2700, 2700, 2900)
ogien <- c(238, 244, 228, 239, 247, 243, 232)
bieg <- c(43, 43, 48, 44, 41, 45, 43)

hero.factory <- data.frame(nazwy, pancerz, ogien, bieg)
rownames(hero.factory) <- nazwy

library(ggplot2)
library(gridExtra)

p1 <- ggplot(hero.factory, aes(x=pancerz, y=bieg, label=nazwy)) + geom_text() + theme_bw()
p2 <- ggplot(hero.factory, aes(x=pancerz, y=ogien, label=nazwy)) + geom_text() + theme_bw()
p3 <- ggplot(hero.factory, aes(x=bieg, y=ogien, label=nazwy)) + geom_text() + theme_bw()

pdf("heroF.pdf",12,10)
grid.arrange(p1, p2, p3, nrow=2)
dev.off()

pdf("heroF2.pdf",12,10)
biplot(prcomp(hero.factory[,2:4], scale.=T))
dev.off()
