library(openxlsx)
library(archivist)
library(networkD3)

setLocalRepo("/Users/pbiecek/GitHub/graphGallery/")

liczby <- read.xlsx("seprm.xlsx", 1)
etykiety <- read.xlsx("seprm.xlsx", 2)

saveToRepo(liczby)
# af0b5130b2db42b23c61d3ab373d7946
archivist::aread("pbiecek/graphGallery/af0b5130b2db42b23c61d3ab373d7946")

table(z = liczby$"1970", do = liczby$"1980")
table(z = liczby$"1970", do = liczby$"2010")


flow <- rbind(
  data.frame(table(z = paste0(liczby$"1974", "-lat w ", "1974"), 
                   do = paste0(liczby$"1984", "-lat w ", "1984"))),
  data.frame(table(z = paste0(liczby$"1984", "-lat w ", "1984"), 
                   do = paste0(liczby$"1994", "-lat w ", "1994"))),
  data.frame(table(z = paste0(liczby$"1994", "-lat w ", "1994"), 
                   do = paste0(liczby$"2004", "-lat w ", "2004"))),
  data.frame(table(z = paste0(liczby$"2004", "-lat w ", "2004"), 
                   do = paste0(liczby$"2014", "-lat w ", "2014"))))

flow <- flow[flow[,3] > 0,]


nodes <- data.frame(name=unique(c(levels(flow[,1]), levels(flow[,2]))))
nam <- seq_along(nodes[,1])-1
names(nam) <- nodes[,1]

links <- data.frame(source = nam[as.character(flow[,1])],
           target = nam[as.character(flow[,2])],
           value = flow[,3])


sankeyNetwork(Links = links, Nodes = nodes,
              Source = "source", Target = "target",
              Value = "value", NodeID = "name",
              width = 700, fontSize = 12, nodeWidth = 30)



library(dplyr)

a1 <- links %>%
  group_by(source) %>%
  summarise(sum = sum(value))

a2 <- links %>%
  group_by(target) %>%
  summarise(sum = sum(value))

colnames(a1) = c("link", "sum")
colnames(a2) = c("link", "sum")

aa <- rbind(a1[1:4,], a2)

bb <- as.data.frame(aa)[,2]
nodes2 <- nodes
nodes2$name <- paste0(substr(nodes2$name, 1, 6), "(", bb, " ",
                      ifelse(bb==1, "kraj",
                             ifelse(bb %% 10 %in% 1:5, "kraje",
                             "krajów")), substr(nodes2$name, 6, 100),"r.)")

sankeyNetwork(Links = links, Nodes = nodes2,
              Source = "source", Target = "target",
              Value = "value", NodeID = "name",
              width = 1000, fontSize = 12, nodeWidth = 30)


