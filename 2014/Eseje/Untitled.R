ggsave(ob1, filename = "fig1.png", width=11, height = 6)
pmeansNCA <- 
  pmeansNCA %>% 
  filter(CNTRYID %in% c("Japan", "Finland", "Sweden", "Canada", "Korea", "United Kingdom", "Poland", "United states", "Italy" ,"Spain"))

pmeansNCA<- 
  pmeansNCA %>% 
  filter(!(AGEG10LFS %in% c("24 or less")))


colnames(pmeansNCA)[2] <- "Gr.Wiekowa"

ob1 <- plot.intsvy.mean(pmeansNCA, sort=TRUE, se=FALSE) + 
  ylab("Umiejętnosci matematyczne PIAAC") + xlab("Kraj") +
  theme_grey()

library(ggthemes)
ggsave(ob1, filename = "fig1.png", width=11, height = 6)


ggsave(ob3 + theme_tufte(), 
       filename = "fig2.png", width=11, height = 6)


ob3 <- plot.intsvy.mean2(pmeansNCA, sort=TRUE, se=FALSE) + 
  ylab("Umiejętnosci matematyczne PIAAC") + xlab("Kraj")

ggsave(ob3 , filename = "fig3.png", width=11, height = 6)




x = pmeansNCA
vars <- setdiff(colnames(x), c("Freq", "Mean", "s.e.", "SD", 
                               "s.e"))
nvar <- length(vars)
x$MeanL <- x$Mean - x$s.e.
x$MeanH <- x$Mean + x$s.e.
x[, 1] <- reorder(factor(x[, 1]), x[, "Mean"], mean, 
                  na.rm = TRUE)

pl <- ggplot(data = x, aes_string(y = "Mean", x = vars[1], 
                                  shape = vars[2])) + geom_point(size = 5) + theme_bw() + 
  coord_flip() + theme(legend.position = "top")
pl <- pl + geom_errorbar(aes_string(ymin = "MeanL", ymax = "MeanH"), 
                         width = 0.1)

ggvis(x, ~Mean, ~CNTRYID, shape = ~Gr.Wiekowa, size:=120) %>%
  layer_points()




