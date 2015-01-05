# data from
# https://github.com/pbiecek/SmarterPoland_blog/tree/master/2014/choinka
head(chlopcy)

ggplot(chlopcy, aes(x=col, y=row)) + 
  geom_point()

ggplot(chlopcy, aes(x=col, y=row, label="abcde", 
                    angle=-(1.5-col)*45*(row+0.1)^.2)) + 
  geom_text(hjust=0, vjust=0)

ggplot(chlopcy, aes(x=col, y=row, label=imie, 
                    angle=-(1.5-col)*45*(row+0.1)^.2, 
                    size=liczba, color=liczba)) + 
  geom_text(hjust=0, vjust=0)

ggplot(chlopcy, aes(x=-0.04+col*(2-row), y=row, label=imie, 
                    angle=-(1.5-col)*45*(row+0.1)^.2, 
                    size=liczba, color=liczba)) + 
  geom_text(hjust=0, vjust=0)

ggplot(chlopcy, aes(x=-0.04+col*(2-row), y=row^1, label=imie, 
                    angle=-(1.5-col)*45*(row+0.1)^.2, 
                    size=liczba, color=liczba)) + 
  geom_text(hjust=0, vjust=0) +
  scale_size_continuous(range=c(4,6))+
  scale_color_gradient(low="green4",high = "green1") + 
  theme_tufte() + ylim(-0.05,0.95) + xlim(0,2.1) + xlab("") + ylab("") +
  theme(legend.position="none", 
        axis.ticks=element_line(color="white", size=0),
        axis.text=element_text(color="white", size=0))

ggplot(chlopcy, aes(x=-0.04+col*(2-row), y=row^1, 
                    label=imie, angle=-(1.5-col)*45*(row+0.1)^.2, 
                    size=liczba, color=liczba)) + 
  geom_text(hjust=0, vjust=0) +
  scale_size_continuous(range=c(4,6))+
  scale_color_gradient(low="green4",high = "green1") + 
  theme_tufte() + ylim(-0.05,0.95) + xlim(-2.1,2.1) + xlab("") + ylab("") +
  theme(legend.position="none", 
        axis.ticks=element_line(color="white", size=0),
        axis.text=element_text(color="white", size=0)) +
  geom_text(data=dziewczynki, aes(x=0.04-col*(2-row), angle=(1.5-col)*45*(row+0.1)^.2), hjust=1, vjust=1) 
  

