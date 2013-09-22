# install.packages("HH")
require(grid)
require(lattice)
require(latticeExtra)
require(HH)
require(Cairo)

getTable <- function(x1, x2) {
  df <- rbind(cbind(rep(c("Zdecydowanie Tak", "Tak", "Trudno powiedziec", "Nie", "Zdecydowanie Nie"), x1), "szesciolatki"),
              cbind(rep(c("Zdecydowanie Tak", "Tak", "Trudno powiedziec", "Nie", "Zdecydowanie Nie"), x2), "siedmiolatki"))
  df <- as.data.frame(df)
  df[,1] <- factor(df[,1], ordered=TRUE, levels=rev(c("Zdecydowanie Tak", "Tak", "Trudno powiedziec", "Nie", "Zdecydowanie Nie")))
  colnames(df) <- c("odpowiedz", "grupa")
  prop.table(table(df[,2], df[,1]),1)  
}

x1 <- c(17, 21, 2, 1, 9)
x2 <- c(19, 15, 8, 15, 17)


CairoPNG("likert1.png", 720, 300)
HH::likert(getTable(x1, x2),
           main='Czy najblizsza publiczna szkola jest odpowiednio przygotowana dla 6latków?',
           xlab="Procent")
dev.off()


x1 <- c(30, 17, 0, 4, 0)
x2 <- c(38, 29, 0, 6, 1)

CairoPNG("likert2.png", 720, 300)
HH::likert(getTable(x1, x2),
           main='Czy dziecko chetnie uczestniczy w zajeciach?',
           xlab="Procent")
dev.off()


x1 <- c(5, 7, 0, 9, 28)
x2 <- c(4, 2, 0, 27, 41)

CairoPNG("likert3.png", 720, 300)
HH::likert(getTable(x1, x2),
           main='Czy chetnie uczestniczylo ale potem stracilo entuzjazm?',
           xlab="Procent")
dev.off()



x1 <- c(2, 4, 0, 21, 21)
x2 <- c(3, 9, 0, 27, 34)

CairoPNG("likert4.png", 720, 300)
HH::likert(getTable(x1, x2),
           main='Czy dziecko na ogól nudzi sie na lekcjach?',
           xlab="Procent")
dev.off()

