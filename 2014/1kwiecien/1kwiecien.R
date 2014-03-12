library(rmeta)
library(ggplot2)
library(sjPlot)

setwd("c:/_Przemek_/GitHub/SmarterPoland_blog/2014/1kwiecien")

student2012 <- student2012[student2012$CNT == "Poland",]

tab <- unclass(by(student2012$W_FSTUWT, list(student2012$ST04Q01,
                                      student2012$ST28Q01), sum))
tab[1,] / tab[2,]


model <- glm(as.numeric(ST04Q01)-1~ST28Q01-1, 
             data=student2012, 
             weights=W_FSTUWT/100,
             family="binomial")

pdf("odds.pdf",8,7)
sjp.glm(model,
        gridBreaksAt=0.4,
        showIntercept=TRUE,
        axisLabels.y = colnames(tab)[-1],
        sortOdds=FALSE, axisTitle.x="Szansa urodzenia chłopca") 
dev.off()
