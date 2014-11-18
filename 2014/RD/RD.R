library(ggplot2)
library(reshape2)
rd <- read.table("Dropbox/RD.txt", sep=" ", h=FALSE)
rd$V1 <- reorder(rd$V1, rd$V3, mean)
rd$V6 <- rd$V3 - rd$V2

melt(rd[,c(1,2,6)])

ggplot(rd, aes(x=V1, y=V3, fill=V1=="Poland")) + geom_bar(stat="identity") +
  coord_flip() + theme_bw() + 
  theme(legend.position="none" ) + ggtitle("R&D expenditure as % of GDP 2013") + ylab("")+ xlab("")+
  scale_fill_manual(values=c("grey", "red3"))+ 
  scale_y_continuous(expand = c(0,0)) 




rd$V1 <- reorder(rd$V1, rd$V2, mean)

ggplot(rd, aes(x=V1, y=V2, fill=V1=="Poland")) + geom_bar(stat="identity") +
  coord_flip() + theme_bw() + 
  theme(legend.position="none")

