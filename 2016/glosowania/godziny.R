library(rvest)
library(dplyr)

# kadencja 8
ateam <- read_html("http://www.sejm.gov.pl/Sejm8.nsf/agent.xsp?symbol=posglos&NrKadencji=8")
pages <- html_nodes(ateam, "#view\\:_id1\\:_id2\\:facetMain\\:agentHTML a") %>%
  html_attr("href")
pages <- paste0("http://www.sejm.gov.pl/Sejm8.nsf/", pages)
allRes8 <- lapply(pages, function(page) {
  ateam <- read_html(page)
  html_nodes(ateam, "td:nth-child(2)") %>%  html_text()
})

# kadencja 7
ateam <- read_html("http://www.sejm.gov.pl/Sejm8.nsf/agent.xsp?symbol=posglos&NrKadencji=7")
pages <- html_nodes(ateam, "#view\\:_id1\\:_id2\\:facetMain\\:agentHTML a") %>%
  html_attr("href")
pages <- paste0("http://www.sejm.gov.pl/Sejm7.nsf/", pages)
allRes7 <- lapply(pages[153:168], function(page) {
  ateam <- read_html(page)
  html_nodes(ateam, "td:nth-child(2)") %>%  html_text()
})


save(allRes7, allRes8, file="allRes.rda")

library(devtools)
install_github('ramnathv/rCharts@dev')

#
# start tutaj
#
load("allRes.rda")

barplot(table(substr(unlist(allRes7), 1, 2)))
barplot(table(substr(unlist(allRes8), 1, 2)))


k78 <- rbind(data.frame(kadencja = "K7", as.data.frame(table(substr(unlist(allRes7), 1, 2)))),
             data.frame(kadencja = "K8", as.data.frame(table(substr(unlist(allRes8), 1, 2)))))

colnames(k78) <- c("kadencja", "godzina", "glosowan")

library(tidyr)
k78s <- spread(k78, kadencja, Freq, fill = 0)
k78s$K7 <- -k78s$K7
colnames(k78s)[1] = "godzina"
k78s <- arrange(k78s, as.character(godzina))

k78sg <- gather(k78s, kadencja, glosowan, -godzina)
levels(k78sg$kadencja) <- c("Kadencja 7", "Kadencja 8")

n1 <- nPlot(
  y = 'glosowan', 
  x = 'godzina', 
  group = 'kadencja', 
  type = 'multiBarHorizontalChart', 
  data = k78sg)
n1$chart(stacked = TRUE)
n1$chart(tooltipContent = "#! function(key, x, y, e){
         var format = d3.format('0,000');
         return '<h3>' + key + ', godzina ' + x + '</h3>'
         } !#")
n1$yAxis(axisLabel = "Głosowań",  
         tickFormat = "#! function(d) {
         return d3.format(',.0f')(Math.abs(d)) + ''
         } !#")
n1$set(width = 700, height = 500)
n1$chart(color = c('darkred', 'silver'))

n1$setTemplate(
  afterScript = "<style>
  .nvd3 .nv-x line  {
  stroke:rgb(255,255,255)!important;
  };
  </style>")

n1

n1$save('kadencja.html', standalone = TRUE)


