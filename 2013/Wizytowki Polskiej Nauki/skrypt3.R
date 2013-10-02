setwd("c:/_Przemek_/GitHub/SmarterPoland_blog/2013/Wizytowki Polskiej Nauki")

dane <- readLines("dane3.txt", encoding="UTF-8")
daneMat <- as.data.frame(t(matrix(dane, 10, 233)))

rownames(daneMat) <- daneMat[,3]
ocena <- daneMat[,10]

colnames(daneMat) = c("ID", "ID2", "Nazwa", "ID3", "Osiagniecia naukowe i tworcze", "Potencjal naukowy",
                      "Materialne efekty dzialalnosci naukowej",
                      "Pozostale efekty dzialalnosci naukowej",
                      "Ocena ostateczna",
                      "Kategoria")

#Kryterium I - Osiagniecia naukowe i twórcze
#Kryterium II - Potencjal naukowy
#Kryterium III - Materialne efekty dzialalnosci naukowej
#Kryterium IV - Pozostale efekty dzialalnosci naukowej
daneMat[,10] <- factor(ocena, ordered=TRUE, levels=c("A+", "A", "B", "C"), labels=c("+A", "A", "B", "C"))
daneMat <- daneMat[,-c(1, 2, 4)]

colnames(daneMat) <- gsub(colnames(daneMat), pattern=" ", replacement="_")
daneMat <- data.frame(daneMat, nazwy=rownames(daneMat))

for(i in 2:6)
daneMat[,i] <- as.numeric(as.character(daneMat[,i]))

write.table(daneMat,file="daneZycie.csv")
