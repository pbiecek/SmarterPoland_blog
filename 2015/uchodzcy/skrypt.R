setwd("~/GitHub/SmarterPoland_blog/2015/uchodzcy/")

library(ggplot2)
library(scales)
library(archivist)
library(openxlsx)
library(tidyr)

uch <- read.xlsx("poprefg.xlsx",1)[,-2]
uch2 <- gather(uch, rok, liczba, -Country.Name)
sel <- uch2 %>% filter(Country.Name %in% c("Poland", "Austria", "Czech Republic", 
                                           "Germany", "France", "Spain",
                                           "Italy", "United Kingdom", "Turkey"
                                           ))
sel$rok <- as.numeric(as.character(sel$rok))

ggplot(sel, aes(rok, liczba, group=Country.Name)) + 
  geom_line() + geom_point() + theme_bw() +
  facet_wrap(~Country.Name, scales = "free_y") +
  scale_y_continuous(label=comma) + ylab("Liczba uchodźców")
