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

archivist::aread("pbiecek/graphGallery/5a6c2a732c20d5a1bebe6507ebf09afa")

#
# rysujemy słupki
#
library(ggplot2)
library(scales)

pl1 <- ggplot(urodzenia, aes(x=rok, ymin=0, ymax=urodzenia)) + 
  geom_linerange(size=2) +
  theme_bw() +
  scale_y_continuous(label=comma) + 
  scale_x_continuous(limits=c(1965,2015)) +
  ggtitle("Liczba urodzin w ostatnich 50 latach")


pl2 <- ggplot(urodzenia, aes(x=rok, ymin=0, ymax=urodzenia)) + 
  geom_linerange(size=7) +
  theme_bw() +
  scale_y_continuous(label=comma, limits=c(0,650000)) + 
  scale_x_continuous(limits=c(2000,2015)) +
  ggtitle("Liczba urodzin w ostatnich 15 latach")

# 6db6919611a91a549a585da6fbeda194
saveToRepo(pl1)
archivist::aread("pbiecek/graphGallery/6db6919611a91a549a585da6fbeda194")


# 280783b967ac985fb6217958596687d5
saveToRepo(pl2)

#
# pierwsza strategia, komasujemy 3 roczniki w dwóch latach
#

urodzenia2000 <- urodzenia[urodzenia$rok >=2000, ]
urodzenia2000$szkola = 0
urodzenia2000 <- rbind(urodzenia2000, data.frame(rok=2015:2025, urodzenia=0, szkola=0))
urodzenia2000$szkola[urodzenia2000$rok>=2007 & urodzenia2000$rok<=2013] = urodzenia2000$urodzenia[urodzenia2000$rok>=2000 & urodzenia2000$rok<=2006]
urodzenia2000$szkola[urodzenia2000$rok==2014] = urodzenia2000$urodzenia[urodzenia2000$rok == 2007] + urodzenia2000$urodzenia[urodzenia2000$rok == 2008]/2
urodzenia2000$szkola[urodzenia2000$rok==2015] = urodzenia2000$urodzenia[urodzenia2000$rok == 2009] + urodzenia2000$urodzenia[urodzenia2000$rok == 2008]/2
urodzenia2000$szkola[urodzenia2000$rok>=2016 & urodzenia2000$rok<=2025] = urodzenia2000$urodzenia[urodzenia2000$rok>=2010 & urodzenia2000$rok<=2019]

urodzenia2000$szkola2 = urodzenia2000$szkola
urodzenia2000$szkola2[urodzenia2000$rok==2019] = urodzenia2000$urodzenia[urodzenia2000$rok == 2013]/2
urodzenia2000$szkola2[urodzenia2000$rok==2020] = urodzenia2000$urodzenia[urodzenia2000$rok == 2013]/2

urodzenia2000

pl3 <- ggplot(urodzenia2000, aes(x=rok, ymin=0, ymax=urodzenia)) + 
  geom_linerange(aes(x=rok,ymax=szkola), size=7, color="orange") +
  theme_bw() +
  scale_y_continuous(label=comma, limits=c(0,650000)) + scale_x_continuous(limits=c(2006,2021)) +
  ggtitle("Szacunek liczby uczniów trafiających do I klasy podstawówki")



pl4 <- ggplot(urodzenia2000, aes(x=rok, ymin=0, ymax=urodzenia)) + 
  geom_linerange(aes(x=rok+0,ymax=szkola2), size=7, color="blue") +
  theme_bw() +
  scale_y_continuous(label=comma, limits=c(0,650000)) + 
  scale_x_continuous(limits=c(2006,2021)) +
  ggtitle("Szacunek liczby uczniów trafiających do I klasy podstawówki")

# 03be6170a664764126c21f6a45dbd90e
saveToRepo(pl3)

# 9c6cd7842b95fabac987a9db79cf0de4
saveToRepo(pl4)

ggsave("v1.png", pl1, width = 7, height = 7)
ggsave("v2.png", pl2, width = 7, height = 7)
ggsave("v3.png", pl3, width = 7, height = 7)
ggsave("v4.png", pl4, width = 7, height = 7)


