Ogółem 15-19 lat 20-29 30-39 40-49 50-59 60-69 70 lat i
Wyszczególnienie więcej

Męzczyźni

Nerwica lub depresja (stany lękowe. zaburzenia nastroju)
obecnie c(4.8, 1.8, 2.2, 3.6, 5.0, 8.4, 7.2, 7.4)
w przeszłości c(1.1, 0.3, 0.5, 1.0, 1.3, 1.7, 1.8, 0.9)
nigdy c(93.3, 97.3, 96.6, 94.5, 92.9, 88.9, 89.8, 91.4)
brak danych c(0.8, 0.6, 0.7, 0.9, 0.7, 0.9, 1.2, 0.3)

obecnie <- c(4.8, 1.8, 2.2, 3.6, 5.0, 8.4, 7.2, 7.4)
w.przeszlosci <- c(1.1, 0.3, 0.5, 1.0, 1.3, 1.7, 1.8, 0.9)
nigdy <- c(93.3, 97.3, 96.6, 94.5, 92.9, 88.9, 89.8, 91.4)
brak.danych <- c(0.8, 0.6, 0.7, 0.9, 0.7, 0.9, 1.2, 0.3)
m <- data.frame(plec = "mezczyzni", obecnie, w.przeszlosci, nigdy, brak.danych)
m$wiek <- c("ogolnie", "15-19",  "20-29",  "30-39", "40-49", "50-59", "60-69", "70 i wiecej")

Kobiety

Nerwica lub depresja (stany lękowe. zaburzenia nastroju)
obecnie <- c(9.7, 2.6, 4.6, 7.1, 11.1, 14.6, 13.3, 14.3)
w.przeszlosci <- c(2.3, 0.6, 1.0, 1.4, 2.8, 4.0, 3.3, 2.9)
nigdy <- c(87.0, 96.0, 93.9, 90.5, 85.3, 80.0, 82.2, 81.9)
brak.danych <- c(0.9, 0.8, 0.5, 1.0, 0.9, 1.3, 1.2, 0.9)
k <- data.frame(plec = "kobiety", obecnie, w.przeszlosci, nigdy, brak.danych)
k$wiek <- c("ogolnie", "15-19",  "20-29",  "30-39", "40-49", "50-59", "60-69", "70 i wiecej")


library(reshape2)
library(ggplot2)
melted <- melt(rbind(m,k))

pdf("stanZdrowia.pdf",12,6)
ggplot(melted, aes(y=value, col=variable, x=wiek, fill=variable)) + 
  geom_bar(stat="identity", width=0.8) + facet_wrap(~plec) + coord_flip() + ylim(0,20) + theme_bw()
dev.off()



m <- c(2.1, 0.1, 0.9, 1.5, 2.9, 2.8, 3.6, 3.5, 3.1)
k <- c(3.7, 0.8, 1.2, 1.9, 4.6, 5.7, 6.2, 6.0, 3.9)
d <- data.frame(m,k)
d$wiek <- c("ogolnie", "15-19",  "20-29",  "30-39", "40-49", "50-59", "60-69", "70-79", "80 i wiecej")
melted <- melt(d)
pdf("stanZdrowia2.pdf",12,6)
ggplot(melted, aes(y=value, x=wiek)) + 
  geom_bar(stat="identity", width=0.8) + facet_wrap(~variable) + coord_flip() + ylim(0,8) + theme_bw()
dev.off()


