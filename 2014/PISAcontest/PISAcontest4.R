library(Hmisc)
library(ggplot2)
library(reshape2)

# read students data from PISA 2012
# directly from URL
con <- url("http://beta.icm.edu.pl/PISAcontest/data/student2012.rda")
load(con)

# plot quantiles for a country
plotCountry <- function(cnt) {
  cutoffs <- seq(0,1,0.01)
  selected <- student2012[student2012$CNT == cnt, ]
  
  getQuants <- function(group) {
    selectedG <- selected[group, ]
    wtd.quantile(selectedG$PV1MATH, weights=selectedG$W_FSTUWT, probs=cutoffs)
  }
  ecdf1 <- getQuants(selected$ST04Q01 == "Male")
  ecdf2 <- getQuants(selected$ST04Q01 == "Female")
  df1 <- data.frame(cutoffs, Male = ecdf1, Female = ecdf2, subject="MATH")
  getQuants <- function(group) {
    selectedG <- selected[group, ]
    wtd.quantile(selectedG$PV1READ, weights=selectedG$W_FSTUWT, probs=cutoffs)
  }
  ecdf1 <- getQuants(selected$ST04Q01 == "Male")
  ecdf2 <- getQuants(selected$ST04Q01 == "Female")
  df2 <- data.frame(cutoffs, Male = ecdf1, Female = ecdf2, subject="READ")

  df <- rbind(df1, df2)
  
  ggplot(df, aes(x = Male, y = Female, col = subject, shape = subject)) + 
    geom_point() +
    xlim(350,650) + ylim(350,650) + 
    geom_abline(intercept=0, slope=1) + ggtitle(cnt)
}  
  
for (cnt in c("Bulgaria", "Canada", "Germany", "United Kingdom","United States of America", "Poland"))
  ggsave(plotCountry(cnt), filename=paste0("Quant", cnt, ".png"), width=600/72, height=600/72)

