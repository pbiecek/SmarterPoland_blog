library(PISA2012lite)

srednie <- unclass(by(student2012[,c("PV1MATH", "W_FSTUWT")],student2012$CNT, function(x) weighted.mean(x[,1],x[,2])))

srednie2 <- scan(what="character",sep="\n")
Australia  523
Austria	506
Belgium	508
Canada	526
Chile	448
Czech Republic	509
Denmark	497
Estonia	515
Finland	523
France	511
Germany	509
Hungary	459
Ireland	498
Israel	454
Italy	510
Japan	552
Korea	561
Netherlands	511
Norway	503
Poland	481
Portugal	494
Slovak Republic	483
Slovenia	476
Spain	477
Sweden	491
Turkey	454
England (United Kingdom)	517
United States	508
Brazil	428
Bulgaria	402
Colombia	399
Croatia	466
Cyprus	445
Hong Kong-China	540
Macao-China	540
Malaysia	422
Montenegro	407
Russian Federation	489
Serbia	473
Shanghai-China	536
Singapore	562
Chinese Taipei	534
United Arab Emirates	411
Uruguay	403


srednie3 <- as.numeric(gsub(srednie2, pattern="[^0-9]+", replacement=""))
names(srednie3) <- gsub(srednie2, pattern="[ \t]*[0-9]+", replacement="")

nam <- intersect(names(srednie), names(srednie3))

df <- data.frame(problem.solving = srednie3[nam], math = srednie[nam], country=nam)
library(ggplot2)

pdf("Dropbox/pisaps.pdf",10,10)
ggplot(df, aes(problem.solving, math, label=country)) + geom_point() + geom_text(vjust=-0.4) +theme_bw()
dev.off()




plot(srednie3[nam], srednie[nam])
text(srednie3[nam], srednie[nam], nam)


