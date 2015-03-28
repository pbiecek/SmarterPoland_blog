library(ggplot2)

d <- data.frame(Kandydat = c('Komorowski','Duda','Ogórek','Korwin-Mikke',
                             'Kukiz','Jarubaz','Kowalski','Palikot','Wilk',
                             'Tanajno','Braun','Grodzka','Nowicka'),
                Poparcie = c(650,1600,510,300,240,450,188,150,145,130,125,85,91))

d$Kandydat <- reorder(d$Kandydat, d$Poparcie, `-`)

ggplot(data = d,
       aes(x = Kandydat,
           y = Poparcie*1000)) +
  geom_bar(stat='identity') +
  theme_bw() +
  xlab('') + 
  ylab('Liczba głosów') +
  geom_hline(yintercept = 100000,col='red')+
  coord_flip() + ggtitle('Ile podpisów zebrali kandydaci na prezydenta?')+
  scale_y_continuous(labels = comma)

