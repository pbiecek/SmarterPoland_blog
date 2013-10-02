setwd("c:/_Przemek_/GitHub/SmarterPoland_blog/2013/Wizytowki Polskiej Nauki")

d1 <- read.table("daneScisle.csv", stringsAsFactors=FALSE)
d2 <- read.table("daneSpoleczne.csv", stringsAsFactors=FALSE)
d3 <- read.table("daneZycie.csv", stringsAsFactors=FALSE)
colnames(d1) <- colnames(d2)

dane <- rbind(data.frame(grupa = "SI", d1[,-1]), data.frame(grupa = "HS", d2[,-1]), data.frame(grupa = "NZ",d3[,-1]))

write.table(dane,file="wszystkieJednostki.csv")
