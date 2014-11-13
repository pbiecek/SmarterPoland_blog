library(ggplot2)
library(dplyr)
load("df.rda")

df2 <- df %>% 
  arrange(-kwota) %>%
  group_by(posel = paste(imie, partia)) %>% 
  mutate(skumulowana = cumsum(kwota)/0.8358,
         liczba = seq_along(kwota))

df3 <- df2 %>% arrange(-skumulowana) %>%
  group_by(posel) %>% 
  summarise(ms=max(skumulowana),ml=max(liczba)) %>%
  arrange(-ms) %>%
  head(3)

ggplot(df2, aes(x=liczba, y=skumulowana, group=posel)) +
  geom_line() + geom_point() + 
  geom_hline(yintercept=c(40000,81000)) +
  geom_text(data=df3, aes(x=ml, y=ms, label=posel),
            vjust=0, hjust=-0.1) +
  theme_bw() + ggtitle("Wyjazdy samochodowe posłów VII kadencji") +
  xlab("Liczba przejazdów") + xlim(0,38) + ylab("Zadeklarowanych km")
 