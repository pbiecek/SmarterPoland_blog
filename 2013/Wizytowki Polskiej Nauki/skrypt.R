setwd("c:/_Przemek_/GitHub/SmarterPoland_blog/2013/Wizytowki Polskiej Nauki")

dane <- readLines("dane.txt", encoding="UTF-8")
dane <- substr(dane, 11, 1000)

daneMat <- t(sapply(strsplit(gsub(dane, pattern="^[^0-9]*", replacement=""), split=" "), as.numeric))
ocena <- sapply(strsplit(dane, split = " "), tail, 1)
nazwa <- gsub(dane, pattern="[0-9 \\.ABCD\\+\\-]*$", replacement="")
  
rownames(daneMat) = nazwa
colnames(daneMat) = c("ID", "Osiagniecia naukowe i twórcze", "Potencjal naukowy",
                      "Materialne efekty dzialalnosci naukowej",
                      "Pozostale efekty dzialalnosci naukowej",
                      "Ocena ostateczna",
                      "Kategoria")

#Kryterium I - Osiagniecia naukowe i twórcze
#Kryterium II - Potencjal naukowy
#Kryterium III - Materialne efekty dzialalnosci naukowej
#Kryterium IV - Pozostale efekty dzialalnosci naukowej
daneMat <- as.data.frame(daneMat)
daneMat[,7] <- factor(ocena, ordered=TRUE, levels=c("A+", "A", "B", "C"))

qplot(daneMat[,2], daneMat[,3], data=daneMat, 
      col=Kategoria,
      shape=Kategoria, size=I(3)) + theme_bw()

qplot(daneMat[,3], daneMat[,4], data=daneMat, 
      col=Kategoria,
      shape=Kategoria, size=I(3)) + theme_bw()

qplot(daneMat[,5], daneMat[,2], data=daneMat, 
      col=Kategoria,
      shape=Kategoria, size=I(3)) + theme_bw()




