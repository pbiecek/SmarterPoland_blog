library(ggplot2)
library(reshape2)
library(RColorBrewer)

# read students data from PISA 2012
# directly from URL
con <- url("http://beta.icm.edu.pl/PISAcontest/data/student2012.rda")
load(con)

cnt <- "Poland"
cutoffs <- seq(350,700,10)

plotCountry <- function(cnt) {
  selected <- student2012[student2012$CNT == cnt, ]
  
  getQuants <- function(group) {
    selectedG <- selected[group, ]
    sapply(cutoffs, function(cutoff) {
      sum(selectedG[selectedG$PV1MATH < cutoff, "W_FSTUWT"])
    }) / sum(selectedG$W_FSTUWT)
  }
  
  ecdf1 <- getQuants(selected$ST04Q01 == "Male")
  ecdf2 <- getQuants(selected$ST04Q01 == "Female")
  
  df <- data.frame(MATH = cutoffs,
                   Male = ecdf1,
                   Female = ecdf2)
  
  ggplot(df, aes(x = MATH, ymin = Male, ymax = Female)) + 
    geom_point(aes(y = Male), col="red", size=5)+
    geom_point(aes(y = Female), col="green", size=5)+
    geom_linerange() +
    theme_bw() + ylab("ecdf") + ylim(0,1)
  
}

plotCountry("Denmark")




cutoffs <- c(0,seq(250,800,10),1000)

plotCountry <- function(cnt) {
  selected <- student2012[student2012$CNT == cnt, ]

  tab <- unclass(by(selected$W_FSTUWT, 
     list(cut(selected$PV1MATH, cutoffs),
          selected$ST04Q01),
     sum, na.rm=TRUE))
  tab[is.na(tab)] = 0
  props <- prop.table(tab, 2)
  
  odds <- (1 - apply(props, 2, cumsum))/apply(props, 2, cumsum)
  
  df <- data.frame(MATH = cutoffs[-1],
                   OR = odds[,1]/odds[,2])
  
  ggplot(df, aes(x = MATH, ymax = OR, ymin = 1)) + 
    geom_ribbon() +
    xlim(350,650) + 
    scale_y_log10(breaks=seq(0.3,2.5,0.1)) +
    theme_bw() + ylab("Odds that Female has higher score \n/ Odds that Male has higher score") +
    ggtitle(cnt)
  
}

plotCountry("Denmark")
plotCountry("Poland")
plotCountry("Mexico")
plotCountry("Lithuania")
plotCountry("Jordan")
