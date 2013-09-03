library(PISA2009lite)
library(PISAtools)
library(ggplot2)
library(MASS)
library(class)
library(gridExtra)
library(reshape2)
library(grid)
library(digest)
library(RCurl)


sstudent2009 <- student2009[student2009$CNT == "Japan",]
sstudent2009 <- student2009[student2009$CNT == "Korea",]
sstudent2009 <- student2009[student2009$CNT == "Poland",]
sstudent2009 <- student2009[student2009$CNT == "Switzerland",]
sstudent2009 <- student2009[student2009$CNT == "Germany",]

schmeans <- by(sstudent2009[,c("PV1MATH", "W_FSTUWT")], sstudent2009$SCHOOLID, function(x) weighted.mean(x[,1], x[,2], na.rm=TRUE))
# out of school
df <- na.omit(data.frame(MATH = sstudent2009$PV1MATH, MATHrelative =  sstudent2009$PV1MATH - schmeans[as.character(sstudent2009$SCHOOLID)], extraHours = sstudent2009$ST32Q02 != "Do not attend", z = 0.1+ 0.2*runif(nrow(sstudent2009))))

os1 <- seq(min(df[,1]), max(df[,1]), length.out=50)
os2 <- seq(min(df[,2]), max(df[,2]), length.out=50)
grid <- expand.grid(x = os1, y = os2)

voting <- knn(df[,1:2], grid, cl=df[,3], prob=TRUE, k= 170, use.all=FALSE)
z <- attr(voting, "prob")

df2 <- data.frame(grid, z=1-z)

p <- ggplot(df2, aes(x = x, y = y, z = z, fill= z))
p2 <- p + geom_tile() + stat_contour( size=1, breaks=seq(0,1,0.1)) + theme_bw() +
  scale_fill_gradient2(low = ("red"), mid = "white", high = ("blue"), midpoint = .32) +
  geom_point(aes(x = MATH, y = MATHrelative, z = z, fill=z, shape=extraHours, color=extraHours), data=df, alpha=0.3) + 
  scale_color_manual(values=c("blue", "red")) +
  xlab("Wynik ucznia z matematyki") +
  ylab("Wynik ucznia - sredni wynik szkoly z matematyki") 

p2

