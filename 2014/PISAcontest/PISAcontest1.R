library(ggplot2)

#
# read students data from PISA 2012
# directly from URL
con <- url("http://beta.icm.edu.pl/PISAcontest/data/student2012.rda")
load(con)

#
# calcualte weighted mean from math / reading scores
# W_FSTUWT stands for final weights
mathScores <- unclass(by(student2012[,c("PV1MATH", "W_FSTUWT")], 
                 student2012$CNT,
                 function(x) weighted.mean(x[,1], x[,2])) )

readScores <- unclass(by(student2012[,c("PV1READ", "W_FSTUWT")], 
                 student2012$CNT,
                 function(x) weighted.mean(x[,1], x[,2])) )

sizeScores <- unclass(by(student2012[,"W_FSTUWT"], 
                         student2012$CNT,
                         sum) )

#
# create a data.frame with scores, sizes and country names
# remove names with ( in name)
readMathScores <- data.frame(Country=names(readScores), readScores, mathScores, sizeScores)
readMathScores <- readMathScores[-grep(readMathScores$Country, pattern="(", fixed=TRUE),]

#
# two plots in ggplot2
plot1 <- ggplot(readMathScores, aes(x=mathScores + readScores, y = mathScores - readScores, label = Country)) + 
  geom_text() +
  theme_bw()

plot2 <- ggplot(readMathScores, aes(x=mathScores + readScores, y = mathScores - readScores, label = Country, size = sqrt(sizeScores))) + 
  geom_text() +
  theme_bw() + theme(legend.position="none")

ggsave(plot1, filename="mathReading.png")
ggsave(plot2, filename="mathReadingSize.png")
