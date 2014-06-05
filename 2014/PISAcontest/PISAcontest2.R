#
# required packages
library(ggplot2)
library(reshape2)
library(likert) # version 1.2
library(intsvy)

#
# read students data from PISA 2012
# directly from URL
con <- url("http://beta.icm.edu.pl/PISAcontest/data/student2012.rda")
load(con)

#
# variable ST87Q07 codes 'Sense of Belonging - Feel Happy at School'
# pisa.table calculates weighted fractions and it's standard errors
tab <- pisa.table(variable="ST87Q07", by="CNT", data=student2012)
ptab <- acast(tab, CNT~ST87Q07, value.var="Percentage")

# remove single states and plot it
ddat <- data.frame(Item=rownames(ptab), cbind(ptab[,4:3], 0, ptab[,2:1]))
ddat <- ddat[-grep(rownames(ddat),pattern="(", fixed=TRUE),]
plot1 <- likert.bar.plot(likert(summary=ddat),  plot.percent.neutral=FALSE) + 
  ggtitle("Sense of Belonging - Feel Happy at School") 


#
# variable ST62Q13 codes familiarity with 'Declarative Fraction'
tab <- pisa.table(variable="ST62Q13", by="ST04Q01", data=student2012)
ptab <- acast(tab, ST04Q01~ST62Q13, value.var="Percentage")

ddat <- data.frame(Item=rownames(ptab), ptab)
plot2 <- likert.bar.plot(likert(summary=ddat), center=2) + 
  ggtitle("Declarative Fraction") + theme_bw()

#
# variable ST62Q13 codes familiarity with 'Declarative Fraction'
tab <- pisa.table(variable="ST62Q13", by="CNT", data=student2012)
ptab <- acast(tab, CNT~ST62Q13, value.var="Percentage")

ddat <- na.omit(data.frame(Item=rownames(ptab), ptab[,1:5]))
ddat <- ddat[-grep(rownames(ddat),pattern="(", fixed=TRUE),]
plot4 <- likert.bar.plot(likert(summary=ddat),  plot.percent.neutral=FALSE) + 
  ggtitle("Declarative Fraction") 

#
# variable ST88Q02 codes 'Attitude towards School - Waste of Time'
tab <- pisa.table(variable="ST88Q02", by="CNT", data=student2012)
ptab <- acast(tab, CNT~ST88Q02, value.var="Percentage")

ddat <- data.frame(Item=rownames(ptab), cbind(ptab[,4:3], 0, ptab[,2:1]))
ddat <- ddat[-grep(rownames(ddat),pattern="(", fixed=TRUE),]
plot3 <- likert.bar.plot(likert(summary=ddat),  plot.percent.neutral=FALSE) + 
  ggtitle("Attitude towards School - Waste of Time") 


#
# save plots
ggsave(plot1, filename="feelHappy.png", width=8, height=10)
ggsave(plot2, filename="DeclarativeFraction.png", width=8, height=2)
ggsave(plot3, filename="WasteofTime.png", width=8, height=10)
ggsave(plot4, filename="DeclarativeFraction2.png", width=8, height=10)
