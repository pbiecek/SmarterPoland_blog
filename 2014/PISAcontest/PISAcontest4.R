library(ggplot2)
library(reshape2)
library(RColorBrewer)

# read students data from PISA 2012
# directly from URL
con <- url("http://beta.icm.edu.pl/PISAcontest/data/student2012.rda")
load(con)


