dzialy <- c("Institutions",
"Human capital and research",
"Infrastructure",
"Market sophistication",
"Business sophistication",
"Knowledge and technology outputs",
"Creative outputs")

dat <- lapply(7:1, function(i) {
  data.frame(read.table(paste0("gridData (",i,").csv"), sep=",", h=T, quote='"')[,c(2,3,5)],
             topic=paste0(i,". ",dzialy[i]))
})

data <- do.call(rbind, dat)

library(ggplot2)
library(scales)
ggplot(data, aes(topic, Percentage.Rank, group=Country, label=paste0(Country, " ", Percentage.Rank*100,"%"))) +
  geom_line(color="grey80") +
  geom_point(color="grey60") + 
  geom_line(data=data[data$Country == "Poland",], color="red3", size=1.5) +
  geom_point(data=data[data$Country == "Poland",], color="red3", size=3) + 
  geom_text(data=data[data$Country == "Poland",], color="red3", size=5, hjust=0, vjust=-0.3) + 
  coord_flip() + theme_bw() + xlab("") + 
  ylim(1,0)+
  ylab("best     <---     Percent Rank     --->     worst")+
  theme(panel.border=element_rect(color="white")) +
  ggtitle("Country rank in The Global Innovation Index 2015")
  

