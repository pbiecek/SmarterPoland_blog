library(openxlsx)
library(maptools)
library(ggplot2)
library(rgdal)
library(dplyr)

sejmiki <- read.xlsx("1461143032_a1c242476ecfd74febac7beef6a12fcb.xlsx")
shp1 <- readShapePoly("gminy/gminy") 

sejmiki2 <- sejmiki[,c(1,2,3,4,5,25,26)]

sejmiki2$kod <- paste0(sejmiki2$TERYT, sejmiki2$Typ)

df <- data.frame(shp1@data, 
                 long=wsp[,1], lat=wsp[,2])


sejmiki3 <- merge(df, sejmiki2, by.x='jpt_kod_je', by.y = 'kod')
sejmiki4 <- arrange(sejmiki3, odl)

group_by(sejmiki4[,c(1,2,3,4,5,11,12)], jpt_kod_je) %>%
  summarise(Głosy.ważne = sum(Głosy.ważne),
            PiS = sum(Komitet.Wyborczy.Prawo.i.Sprawiedliwość),
            niePiS = Głosy.ważne - PiS,
            long = mean(long),
            lat = mean(lat),
            odl = mean(odl),
            jpt_nazwa_ = head(jpt_nazwa_,1)) ->
  sejmiki5

sejmiki6 <- arrange(sejmiki5, odl)
sejmiki6$cumPiS <- cumsum(sejmiki6$PiS)
sejmiki6$cumniePiS <- cumsum(sejmiki6$niePiS)

library(tidyr)
sejmiki7 <- gather(sejmiki6[,c(5,6,7,8)+2], naco, ile, -jpt_nazwa_, -odl)

ggplot(sejmiki7, aes(odl/1000, ymin=0, ymax=ile/10000000,y=ile/1000000, fill=naco)) +
  geom_area()+theme_light()+theme(legend.position="top")

sejmiki6 <- arrange(sejmiki6, odl)
sejmiki6$prop2 <- sejmiki6$cumPiS / (sejmiki6$cumniePiS + sejmiki6$cumPiS)

ggplot(sejmiki6, aes(odl/1000, y=100*prop2)) +
  geom_line() + xlab("km") + theme_light()

shp1f <- fortify(shp1)
ggplot() +
  geom_path(data=shp1f, aes(x=long, y=lat, group=id), colour="black", size=0.25)

iid <- as.numeric(rownames(df[(df$jpt_nazwa_ %in% as.character(head(sejmiki6[[6]], 22))) &
                                df$lat > 400000, ]))

sejmiki6$prop <- signif(100*sejmiki6$PiS/sejmiki6$Głosy.ważne, digits = 3)

ggplot() +
  geom_map(data=shp1f[shp1f$id %in% c(iid),], aes(map_id=id), fill="grey80", map=shp1f[shp1f$id %in% c(iid),]) +
  geom_path(data=shp1f[shp1f$id %in% c(iid),], aes(x=long, y=lat, group=id), 
            colour="grey", size=0.25) +
  geom_text_repel(data=sejmiki6[1:22,], aes(long, lat, label=paste0(jpt_nazwa_, "\n", prop,"%")), size=3) +
  theme_bw() +
  theme(axis.ticks = element_blank(),
        axis.text.x = element_blank(),
        axis.text.y = element_blank(),
        panel.grid.minor=element_blank(),
        panel.grid.major=element_blank(),
        axis.title.x = element_blank(),
        axis.title.y = element_blank(),
        panel.border = element_blank())
