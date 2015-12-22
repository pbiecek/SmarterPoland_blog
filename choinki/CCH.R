
library(ggplot2)

baum <- do.call(rbind, lapply(0:8/10, function(i) data.frame(x=c(2*i-1, 3-2*i, 1), y=c(4 * i, 4 * i, 0.7 + 4 * i), z=c(i, i, i))))

rotate <- function(a) matrix(c(cos(a), -sin(a), sin(a), cos(a)), nrow=2)

triangle <- do.call(rbind, lapply(seq(0,1.99*pi,2*pi/3), function(a) data.frame(t(rotate(a) %*% c(0,.3)))))
stern <- do.call(rbind, lapply(2*seq(0, pi/3,pi/9), function(a) {df <- data.frame(t(apply(triangle, 1, function(row) df <- rotate(a) %*% row))); df$z <- a; df }))
top <- baum[nrow(baum), ]
stern$X1 <- stern$X1 + top$x
stern$X2 <- stern$X2 + top$y

baum$kugeln <- runif(nrow(baum))

ggplot(baum, aes(x = x, y = y, group = z)) + geom_polygon(color="green", fill="green") +     coord_fixed() +
  geom_point(size=5, position="jitter", mapping=aes(x = x, y = y, color=factor(kugeln))) +
  geom_polygon(mapping=aes(x=X1, y=X2, group=z), data=stern, fill="red") +
  theme_bw() + theme(legend.position = "none")

