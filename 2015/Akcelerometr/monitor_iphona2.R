setwd("~/GitHub/SmarterPoland_blog/2015/Akcelerometr/")

library(ggplot2)
library(lubridate)

read.table("2015-01-20_09-50-28.csv", h=T, sep=",") -> marsz
read.table("2015-01-26_12-32-02.csv", h=T, sep=",") -> schody
read.table("2015-01-26_20-43-38.csv", h=T, sep=",") -> skoki

read.table("2015-02-02_11-33-40.csv", h=T, sep=",") -> schody_dol
read.table("2015-02-02_12-04-34.csv", h=T, sep=",") -> schody_gora

marsz$loggingTime <- ymd_hms(marsz$loggingTime)
schody$loggingTime <- ymd_hms(schody$loggingTime)
skoki$loggingTime <- ymd_hms(skoki$loggingTime)
schody_dol$loggingTime <- ymd_hms(schody_dol$loggingTime)
schody_gora$loggingTime <- ymd_hms(schody_gora$loggingTime)


marsz2 <- with(marsz, 
               sqrt(accelerometerAccelerationX^2 + accelerometerAccelerationY^2 +accelerometerAccelerationZ^2))
schody2 <- with(schody, 
               sqrt(accelerometerAccelerationX^2 + accelerometerAccelerationY^2 +accelerometerAccelerationZ^2))
skoki2 <- with(skoki, 
               sqrt(accelerometerAccelerationX^2 + accelerometerAccelerationY^2 +accelerometerAccelerationZ^2))
schody_dol2 <- with(schody_dol, 
                    sqrt(accelerometerAccelerationX^2 + accelerometerAccelerationY^2 +accelerometerAccelerationZ^2))
schody_gora2 <- with(schody_gora, 
                    sqrt(accelerometerAccelerationX^2 + accelerometerAccelerationY^2 +accelerometerAccelerationZ^2))

library(ggthemes)

g1 <- ggplot(marsz, aes(x=loggingSample, y=marsz2)) +
  geom_line() + geom_point() + xlim(200,400) + theme_tufte() + ylab("Akcelerometr") + ggtitle("Marsz")+ scale_y_continuous(trans="sqrt", limits=c(0,7))

ggplot(marsz, aes(x=loggingSample, y=marsz2)) +
  geom_line(data=skoki, aes(y=skoki2), col="grey") + 
  geom_line(data=schody, aes(y=schody2), col="grey")+
  geom_line() + geom_point() + xlim(200,400) + theme_tufte() + ylab("Akcelerometr") + ggtitle("Marsz")+ scale_y_continuous(trans="sqrt", limits=c(0,7)) 

ggplot(marsz, aes(x=loggingSample, y=marsz2)) +
  geom_line(data=schody, aes(x=loggingSample-51, y=schody2), col="grey")+
  geom_line() + xlim(200,400) + theme_tufte() + ylab("Akcelerometr") + ggtitle("Marsz")+ scale_y_continuous(trans="sqrt") 

ggplot(schody_dol, aes(x=loggingSample, y=schody_dol2)) +
  geom_line(data=schody_dol, aes(x=loggingSample-51, y=schody_dol2), col="grey")+
  geom_line() + xlim(200,400) + theme_tufte() + ylab("Akcelerometr") + ggtitle("Schody dół")+ scale_y_continuous(trans="sqrt") 

ggplot(schody_gora, aes(x=loggingSample, y=schody_gora2)) +
  geom_line(data=schody_gora, aes(x=loggingSample-51, y=schody_gora2), col="grey")+
  geom_line() + xlim(200,400) + theme_tufte() + ylab("Akcelerometr") + ggtitle("Schody góra")+ scale_y_continuous(trans="sqrt") 


g2 <- ggplot(schody, aes(x=loggingSample, y=schody2)) +
  geom_line() + geom_point() + xlim(350,550) + theme_tufte() + ylab("Akcelerometr") + ggtitle("Schody")+ scale_y_continuous(trans="sqrt", limits=c(0,7))
g3 <- ggplot(skoki, aes(x=loggingSample, y=skoki2)) +
  geom_line() + geom_point() + xlim(150,350) + theme_tufte() + ylab("Akcelerometr") + ggtitle("Skoki")+ scale_y_continuous(trans="sqrt", limits=c(0,7))
g4 <- ggplot(schody_dol, aes(x=loggingSample, y=schody_dol2)) +
  geom_line() + geom_point() + xlim(150,350) + theme_tufte() + ylab("Akcelerometr") + ggtitle("Schody dol")+ scale_y_continuous(trans="sqrt", limits=c(0,7))
g5 <- ggplot(schody_gora, aes(x=loggingSample, y=schody_gora2)) +
  geom_line() + geom_point() + xlim(150,350) + theme_tufte() + ylab("Akcelerometr") + ggtitle("Schody gora")+ scale_y_continuous(trans="sqrt", limits=c(0,7))

ggsave("marsz.png", g1, width = 10, height = 7)
ggsave("schody.png", g2, width = 10, height = 7)
ggsave("skoki.png", g3, width = 10, height = 7)

png("ACFmarsz.png", 700, 400)
acf(marsz2, lag.max = 100, ylim=c(-1,1), las=1, main="Marsz, autokorelacja")
dev.off()
png("ACFschody.png", 700, 400)
acf(schody2, lag.max = 100, ylim=c(-1,1), las=1, main="Schody, autokorelacja")
dev.off()
png("ACFskoki.png", 700, 400)
acf(skoki2, lag.max = 100, ylim=c(-1,1), las=1, main="Skoki, autokorelacja")
dev.off()

acf(schody_dol2, lag.max = 100, ylim=c(-1,1), las=1, main="Schody dol, autokorelacja")
acf(schody_gora2, lag.max = 100, ylim=c(-1,1), las=1, main="Schody gora, autokorelacja")
