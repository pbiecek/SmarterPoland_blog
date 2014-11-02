library(SmarterPoland)

getBDLsearch("czas")

(pracujacy <- getBDLseries(metric_id = "440", wojewodztwo_id = "02"))

(pracujacy <- getBDLseries(metric_id = "440", wojewodztwo_id = ""))

(pracujacy <- getBDLseries(metric_id = "440"))

(pracujacy <- getBDLseries(metric_id = "744"))
pracujacy <- pracujacy %>%
  mutate(value = as.numeric(value)) %>%
  filter(dimension.1 != "ogółem")

pl <- ggplot(pracujacy, aes(x=year, y=value, color=dimension.1)) +
  geom_point(size=3) +  geom_line() + 
  facet_wrap(~dimension, scales="free_y") +
  ggtitle("Pracujący wg wymiaru czasu pracy i płci") +
  ylab("w tys. osób") + xlab("rok")

ggsave(pl, width=10, height = 7, file="bdl.png")



getBDLsearch("dochody")
