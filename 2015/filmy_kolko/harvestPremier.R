library(rvest)

# dla roku 2014
rok <- 2015
wszystkie <- lapply(1:12, function(miesiac) {
  premiery <- html(paste0("http://www.filmweb.pl/premiere/",rok,"/", miesiac))
  
  nazwy <- premiery %>%
    html_nodes(".filmContent") %>%
    html_nodes(".entityTitle") %>%
    html_text()

  nazwy2 <- premiery %>%
    html_nodes(".filmSubtitle") %>%
    html_text()

  ind <- !grepl(nazwy2, pattern = "[A-Za-z]")
  nazwy2[ind] <- nazwy[ind]
  nazwy2 <- gsub(nazwy2, pattern="^ ", replacement="")

  gatunki <- premiery %>%
    html_nodes(".filmContent") %>%
    html_node(".filmGenres a") %>%
    html_text()
  
  oceny <- premiery %>%
    html_nodes(".filmContent") %>%
    html_node("strong") %>%
    html_text()
  
  oceny2 <- as.numeric(gsub(sapply(strsplit(as.character(oceny), split="/"), `[`, 1), pattern=",", replacement="."))
  
  data.frame(miesiac, nazwy2, gatunki, oceny, oceny2)
})

wszystkieFilmy <- do.call(rbind, wszystkie)
colnames(wszystkieFilmy) = c("month", "name", "gendre", "rate", "rate2")


library(archivist)
setLocalRepo("/Users/pbiecek/GitHub/graphGallery/")
saveToRepo(wszystkieFilmy)

# 2014 eng 88a0baa22b4165fc9356f86d85afdece
# 2015 eng b8fc8cff338fa865af0604f7d22e3840

#
#
# odczytaj z archivist
#
wszystkieFilmy2015 <- archivist::aread("pbiecek/graphGallery/7e68a07cb7fea14c7327d39d1ff465e2")
wszystkieFilmy2014 <- archivist::aread("pbiecek/graphGallery/1f22770967c8b87c1b9028957055eff2")

# eng
wszystkieFilmy2014 <- archivist::aread("pbiecek/graphGallery/88a0baa22b4165fc9356f86d85afdece")
wszystkieFilmy2014 <- archivist::aread("pbiecek/graphGallery/b8fc8cff338fa865af0604f7d22e3840")

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

png("kolko2015eng.png", 12*300, 12*300, res = 300)

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
                     cex=1, niceFacing=TRUE)
  }
  circos.trackText(factors = k, 
                   0.5,
                   1,
                   month.abb[k],
                   1,
                   facing = "clockwise", adj=c(1,1),
                   cex=1.8, niceFacing=TRUE)
}

circos.clear()

dev.off()



