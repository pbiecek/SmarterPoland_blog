#
# pobieramy dane pakietem htmltable
#
devtools::install_github("crubba/htmltable")
library(htmltab)

# z wikipedii
url <- "https://pl.wikipedia.org/wiki/Ludno%C5%9B%C4%87_Polski"
urodzenia <- htmltab(doc = url, which = 4)
head(urodzenia)

# mała obróbka
sel <- urodzenia[,c(1,3)]
sel[,1] <- as.numeric(sel[,1])
sel[,2] <- as.numeric(gsub(sel[,2], pattern = "[^0-9]", replacement = ""))

colnames(sel) <- c("rok", "urodzenia")
urodzenia <- sel

#
# Zapisujemy dane do repo
# 
library(archivist)
setLocalRepo("/Users/pbiecek/GitHub/graphGallery")

saveToRepo(urodzenia)
# 5a6c2a732c20d5a1bebe6507ebf09afa

#
# rysujemy słupki
#
library(ggplot2)
library(scales)

pl1 <- ggplot(urodzenia, aes(x=rok, ymin=0, ymax=urodzenia)) + 
  geom_linerange(size=2) +
  theme_bw() +
  scale_y_continuous(label=comma) + scale_x_continuous(limits=c(1965,2015)) +
  ggtitle("Liczba urodzin w ostatnich 50 latach")


pl2 <- ggplot(urodzenia, aes(x=rok, ymin=0, ymax=urodzenia)) + 
  geom_linerange(size=5) +
  theme_bw() +
  scale_y_continuous(label=comma) + scale_x_continuous(limits=c(2000,2015)) +
  ggtitle("Liczba urodzin w ostatnich 15 latach")

saveToRepo(pl1)
# 6db6919611a91a549a585da6fbeda194

saveToRepo(pl2)
# c8577642b69dab0bc50c579ce969401c




sel2000 <- sel[sel$rok >=2000, ]

ggplot(sel, aes(x=rok, ymin=0, ymax=urodzenia)) + 
  geom_linerange()

ggplot(sel2000, aes(x=rok, ymin=0, ymax=urodzenia)) + 
  geom_linerange()

sel2000 <- rbind(sel2000, data.frame(rok=2015:2025, urodzenia=0, szkola=0))

sel2000$szkola = 0
sel2000$szkola[sel2000$rok>=2007 & sel2000$rok<=2013] = sel2000$urodzenia[sel2000$rok>=2000 & sel2000$rok<=2006]
sel2000$szkola[sel2000$rok==2014] = sel2000$urodzenia[sel2000$rok == 2007] + sel2000$urodzenia[sel2000$rok == 2008]/2
sel2000$szkola[sel2000$rok==2015] = sel2000$urodzenia[sel2000$rok == 2009] + sel2000$urodzenia[sel2000$rok == 2008]/2
sel2000$szkola[sel2000$rok>=2016 & sel2000$rok<=2025] = sel2000$urodzenia[sel2000$rok>=2010 & sel2000$rok<=2019]

sel2000$szkola2 = sel2000$szkola
sel2000$szkola2[sel2000$rok==2019] = sel2000$urodzenia[sel2000$rok == 2013]/2
sel2000$szkola2[sel2000$rok==2020] = sel2000$urodzenia[sel2000$rok == 2013]/2

sel2000

ggplot(sel2000, aes(x=rok, ymin=0, ymax=szkola)) + 
  geom_linerange(size=3)+ 
  geom_linerange(aes(x=rok+0.3,ymax=szkola2), size=3, color="red")


