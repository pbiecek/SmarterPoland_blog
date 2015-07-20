library(rvest)

# dla roku 2014
rok <- 2014
wszystkie <- lapply(1:12, function(miesiac) {
  premiery <- html(paste0("http://www.filmweb.pl/premiere/",rok,"/", miesiac))
  
  nazwy <- premiery %>%
    html_nodes(".filmContent") %>%
    html_nodes(".entityTitle") %>%
    html_text()
  
  gatunki <- premiery %>%
    html_nodes(".filmContent") %>%
    html_node(".filmGenres a") %>%
    html_text()
  
  oceny <- premiery %>%
    html_nodes(".filmContent") %>%
    html_node("strong") %>%
    html_text()
  
  oceny2 <- as.numeric(gsub(sapply(strsplit(as.character(oceny), split="/"), `[`, 1), pattern=",", replacement="."))
  
  data.frame(miesiac, nazwy, gatunki, oceny, oceny2)
})

wszystkieFilmy <- do.call(rbind, wszystkie)

library(archivist)
setLocalRepo("/Users/pbiecek/GitHub/graphGallery/")
saveToRepo(wszystkieFilmy)

#
#
# odczytaj z archivist
#
wszystkieFilmy2015 <- archivist::aread("pbiecek/graphGallery/7e68a07cb7fea14c7327d39d1ff465e2")
wszystkieFilmy2014 <- archivist::aread("pbiecek/graphGallery/1f22770967c8b87c1b9028957055eff2")

wszystkieFilmy2014$nazwy <- sapply(strsplit(as.character(wszystkieFilmy2014$nazwy), split="(", fixed=T),
                                   `[`, 1)

#
#
#
library(circlize)
library(RColorBrewer)
k <- brewer.pal(3,"Set1")

# kolory
kolory <- sapply(sort(-table(wszystkieFilmy2014$gatunki)), as.character)
kolory[1] <- k[1]
kolory[2] <- k[2]
kolory[3] <- k[3]
kolory[-(1:3)] <- "grey40"

png("kolko2015.png", 12*300, 12*300, res = 300)

par(mar = c(1,1,1,1)*15, cex = 0.6, xpd=NA)
factors = 1:12
szerokosci <- as.vector(table(wszystkieFilmy2014$miesiac))
circos.par(points.overflow.warning = FALSE)
circos.initialize(factors = factors, xlim = c(0, 1), sector.width = szerokosci)
circos.trackPlotRegion(factors = 1:12, ylim = c(2,9), 
                       track.height = 0.5,bg.border = "grey",
                       bg.col = "grey96")

for (k in 1:12) {
  miesiac <- wszystkieFilmy2014[wszystkieFilmy2014$miesiac==k, ]
  
  for (j in 1:nrow(miesiac)) {
    circos.trackPoints(factors = k, 
                       seq(0, 1, length.out = nrow(miesiac))[j],
                       miesiac$oceny2[j],
                       1,
                       col=kolory[as.character(miesiac$gatunki[j])],
                       pch=19)
    circos.trackLines(factors = k, 
                      seq(0, 1, length.out = nrow(miesiac))[j],
                      miesiac$oceny2[j],
                      1,
                      col=kolory[as.character(miesiac$gatunki[j])],
                      type="h")
    circos.trackText(factors = k, 
                     seq(0, 1, length.out = nrow(miesiac))[j],
                     10,
                     miesiac$nazwy[j],
                     1,
                     col=kolory[as.character(miesiac$gatunki[j])],
                     facing = "clockwise", adj=c(0,0),
                     cex=1)
  }
  circos.trackText(factors = k, 
                   0.5,
                   1,
                   month.abb[k],
                   1,
                   facing = "clockwise", adj=c(1,1),
                   cex=1.8)
}

circos.clear()

dev.off()



