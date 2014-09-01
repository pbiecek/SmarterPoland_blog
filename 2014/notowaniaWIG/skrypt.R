setwd("/Users/pbiecek/Dropbox/notowaniaWIG/")

library(xlsx)
WIG <- read.xlsx("PL9999999995.xls", sheetIndex = 1)

WIG20 <- read.xlsx("PL9999999987.xls", sheetIndex = 1)

summary(WIG$Zmiana)

plot(ecdf(WIG$Zmiana), las=1)

boxplot(WIG$Zmiana)


plot(ecdf(WIG20$Zmiana), las=1)

WIG20[WIG20$Zmiana < -5,]


prop.table(table(WIG20$Zmiana < -1.86))

tail(WIG20)

plot(WIG20$Zmiana, type="l")
abline(h = -1.86)

install.packages("ggthemes")
library(ggthemes)
library(ggplot2)
WIG20$Data <- as.Date(as.character(WIG20$Data))
pl <- ggplot(WIG20, aes(x=Data, y=Zmiana, group= Nazwa)) + 
  geom_line() + theme_tufte() + 
  geom_hline(yintercept= -1.86, col="darkred")

ggsave(pl, file="wykres.png", width = 7.2*2, height=10, dpi = 100)

tail(WIG20)

pl2 <- ggplot(tail(WIG20,170), aes(x=Data, y=Zmiana, group= Nazwa)) + 
  geom_line() + geom_point() + theme_tufte() + 
  geom_smooth(span=0.4, method="loess", se=TRUE) +
  geom_hline(yintercept= 0, col="gray")

ggsave(pl2, file="wykres2.png", width = 7.2*2, height=10, dpi = 100)
