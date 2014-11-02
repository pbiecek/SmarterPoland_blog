setwd("/Users/pbiecek/camtasia/Dropbox/Diagnoza2014/")
library(foreign)

osoby = read.spss("ds_0_13_2014_03_23_ind_internet.sav", to.data.frame=TRUE)
gospodrstwa = read.spss("ds_0_13_2014_03_25_GD_internet.sav", to.data.frame=TRUE)

osobyDict <- attr(osoby, "variable.labels")
osobyDict <- data.frame(name = names(osobyDict), description=osobyDict)
head(osobyDict)
grep(osobyDict$description, pattern="zarob")

gospodrstwaDict <- attr(gospodrstwa, "variable.labels")
gospodrstwaDict <- data.frame(name = names(gospodrstwaDict), description=gospodrstwaDict)
head(gospodrstwaDict)


save(osoby, file="osoby.rda")
save(osobyDict, file="osobyDict.rda")
save(gospodrstwa, file="gospodrstwa.rda")
save(gospodrstwaDict, file="gospodrstwaDict.rda")

#
# TODO: zrobić rozkład wynagrodzenia
#


grep(osobyDict$description, pattern="jest wa")

library(dplyr)
library(scales)

agregat <- 
  osoby[,c("fp29", "PLEC", "WAGA_2013_OSOBY", "WIEK6_2013")] %>% 
  group_by(fp29, PLEC, WIEK6_2013) %>%
  summarise(waga = sum(WAGA_2013_OSOBY, na.rm=TRUE)) %>%
  na.omit()
  
pl <- ggplot(agregat, aes(x=WIEK6_2013, y=waga, fill=fp29)) + 
  geom_bar(stat="identity", position="fill") + facet_wrap(~PLEC) +
  theme(legend.position="top") + 
  scale_fill_manual(name="Co jest według Pana ważniejsze w życiu?", values=c("gold3", "blue3")) +
  scale_y_continuous(labels = percent) + ylab("Procent osób") + xlab("Wiek")

ggsave(pl, file="Diagnoza.png", width=10, height=10)

