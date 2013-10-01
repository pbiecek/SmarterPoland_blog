setwd("c:/_Przemek_/GitHub/SmarterPoland_blog/2013/Wizytowki Polskiej Nauki")

dane <- readLines("dane2.txt", encoding="UTF-8")
daneMat <- as.data.frame(t(matrix(dane, 10, 303)))

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

#
# SVG
#
library(rCharts)



i1 <- 2 
i2 <- 5
qplot(daneMat[,i1], daneMat[,i2], data=daneMat, 
      col=Kategoria,
      shape=Kategoria, size=I(3)) + theme_bw() +
      xlab(colnames(daneMat)[i1]) + ylab(colnames(daneMat)[i2])

r1 <- rPlot(as.formula(paste0("`", colnames(daneMat)[i1], "`~`", colnames(daneMat)[i2], "`"))
  , data = daneMat[,c(8,i1,i2,7)], type = "point", color = "Kategoria")
r1$save("chart1Spoleczne.html")


i1 <- 2
i2 <- 3
qplot(daneMat[,i1], daneMat[,i2], data=daneMat, 
      col=Kategoria,
      shape=Kategoria, size=I(3)) + theme_bw() +
  xlab(colnames(daneMat)[i1]) + ylab(colnames(daneMat)[i2]) 

r1 <- rPlot(as.formula(paste0("`", colnames(daneMat)[i1], "`~`", colnames(daneMat)[i2], "`"))
            , data = daneMat[,c(8,i1,i2,7)], type = "point", color = "Kategoria")
r1$save("chart2Spoleczne.html")

i1 <- 5
i2 <- 4
qplot(daneMat[,i1], daneMat[,i2], data=daneMat, 
      col=Kategoria,
      shape=Kategoria, size=I(3)) + theme_bw() +
  xlab(colnames(daneMat)[i1]) + ylab(colnames(daneMat)[i2]) 

r1 <- rPlot(as.formula(paste0("`", colnames(daneMat)[i1], "`~`", colnames(daneMat)[i2], "`"))
            , data = daneMat[,c(8,i1,i2,7)], type = "point", color = "Kategoria")
r1$save("chart3Spoleczne.html")



"tooltip": function(item){return item.nazwy}, 
"guides": { "y": { "min":    -2, "max":    102, "numticks": 10  } ,
            "x": { "min":    -20, "max":    1200, "numticks": 10  } },

