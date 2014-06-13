library(ggplot2)
library(reshape2)
library(rworldmap)
library(RColorBrewer)
map.world <- map_data(map = "world")
cols <- brewer.pal(n=7, "PiYG")

# read students data from PISA 2012
# directly from URL
con <- url("http://beta.icm.edu.pl/PISAcontest/data/student2012.rda")
load(con)
prof.scores <- c(0, 358, 420, 482, 545, 607, 669, 1000)
prof.levels <- cut(student2012$PV1MATH, prof.scores, paste("level", 1:7))

plotCountry <- function(cntname = "Poland", cntname2 = cntname) {
  props <- prop.table(tapply(student2012$W_FSTUWT[student2012$CNT == cntname],
         prof.levels[student2012$CNT == cntname], 
         sum))
  cntlevels <- rep(1:7, times=round(props*5000))
  cntcontour <- map.world[map.world$region == cntname2,]
  cntcontour <- cntcontour[cntcontour$group == names(which.max(table(cntcontour$group))), ]
  wspx <- range(cntcontour[,1])
  wspy <- range(cntcontour[,2])
  N <- length(cntlevels)
  px <- runif(N) * diff(wspx) + wspx[1]
  py <- sort(runif(N) * diff(wspy) + wspy[1])
  sel <- which(point.in.polygon(px, py, cntcontour[,1], cntcontour[,2], mode.checked=FALSE) == 1)
  df <- data.frame(long = px[sel], lat = py[sel], level=cntlevels[sel])
  
  par(pty="s", mar=c(0,0,4,0))
  plot(df$long, df$lat, col=cols[df$level], pch=19, cex=3,
       bty="n", xaxt="n", yaxt="n", xlab="", ylab="")
}



par(mfrow=c(1,7))

#
# PISA and World maps are using differnt country names,
# thus in some cases we need to give two names
plotCountry(cntname = "Korea", cntname2 = "South Korea")
plotCountry(cntname = "Japan", cntname2 = "Japan")
plotCountry(cntname = "Finland")
plotCountry(cntname = "Poland")
plotCountry(cntname = "France", cntname2 = "France")
plotCountry(cntname = "Italy", cntname2 = "Italy")
plotCountry(cntname = "United States of America", cntname2 = "USA")

