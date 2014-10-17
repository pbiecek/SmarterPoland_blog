etykiety <- c("Nabycie nowej wiedzy, umiejętności",
"Zdobycie/utrzymywanie kontaktów towarzyskich",
"Zagospodarowanie wolnego czasu",
"Możliwość rozwijania swoich pasji, zainteresowań",
"Lepsze samopoczucie",
"Możliwość wykorzystania zdobytych umiejętności także poza spotkaniami")

wart <- c(30, 44.1,
32, 47.1,
23, 33.8,
45, 66.2,
29, 42.6,
13, 19.1)

dat <- data.frame(etykiety, wart = wart[seq(1,length(wart), 2)])
dat$etykiety <- reorder(dat$etykiety, dat$wart, mean)
library(ggplot2)
ggplot(dat, aes(x=etykiety, y=wart)) + geom_bar(stat="identity") +
  coord_flip() + ylab("") + xlab("") + ggtitle("Korzyści płynące z uczestnictwa w zajęciach chórów, orkiestr i zespołów muzycznych")
