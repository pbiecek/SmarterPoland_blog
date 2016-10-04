## server.r
library(ggplot2)
library(scales)
library(dplyr)
library(Cairo)
library(ggthemes)
library(shiny)
library(lubridate)

# load("imiona_warszawa.rda")
# 
# ramka <- imiona_warszawa %>% 
#   filter(rok == 2014) %>% 
#   group_by(imie, plec) %>%
#   summarise(liczba=sum(liczba)) %>%
#   filter(liczba > 0)
# 
# chlopcy <- ramka %>% 
#   filter(plec == "M") %>%
#   group_by() %>%
#   arrange(liczba, imie)
# chlopcy$row <- 1 - rep(1:20,1:20)[1:nrow(chlopcy)]/18
# chlopcy$col <- unlist(sapply(1:20, function(x) x:1))[1:nrow(chlopcy)]/18
# 
# dziewczynki <- ramka %>% 
#   filter(plec == "K") %>%
#   group_by() %>%
#   arrange(liczba, imie)
# dziewczynki$row <- 1 - rep(1:20,1:20)[1:nrow(dziewczynki)]/18
# dziewczynki$col <- unlist(sapply(1:20, function(x) x:1))[1:nrow(dziewczynki)]/18
# 
# save(dziewczynki, chlopcy, file="dzch.rda")
load("dzch.rda")

shinyServer(function(input, output, session) {
  output$gmina <- renderImage({
    outfile <- tempfile(fileext='.svg')
  CairoSVG(outfile, width=12, height=12)

if (input$msc == "") {
  pl <- ggplot(chlopcy, aes(x=-0.04+col*(2-row), y=row^1, label=imie, angle=-(1.5-col)*45*(row+0.1)^.2, size=liczba, color=liczba)) + 
    geom_text(hjust=0, vjust=0) +
    geom_text(data=dziewczynki, aes(x=0.04-col*(2-row), angle=(1.5-col)*45*(row+0.1)^.2), hjust=1, vjust=1) +
    scale_size_continuous(range=c(4,6))+
    scale_color_gradient(low="green4",high = "green1") + 
    theme_tufte() + ylim(-0.05,0.95) + xlim(-2.1,2.1) + xlab("") + ylab("") +
    theme(legend.position="none", 
          axis.ticks=element_line(color="white", size=0),
          axis.text=element_text(color="white", size=0))
} else {
  chlopcy2 <- chlopcy[!grepl(tolower(chlopcy$imie), pattern= tolower(input$msc)),,drop=FALSE]
  dziewczynki2 <- dziewczynki[!grepl(tolower(dziewczynki$imie), pattern= tolower(input$msc)),,drop=FALSE]
  chlopcy3 <- chlopcy[grepl(tolower(chlopcy$imie), pattern= tolower(input$msc)),,drop=FALSE]
  dziewczynki3 <- dziewczynki[grepl(tolower(dziewczynki$imie), pattern= tolower(input$msc)),,drop=FALSE]
  
  pl <- ggplot(chlopcy2, aes(x=-0.04+col*(2-row), y=row^1, label=imie, angle=-(1.5-col)*45*(row+0.1)^.2, size=liczba, color=liczba)) + 
    geom_text(hjust=0, vjust=0) +
    geom_text(data=dziewczynki2, aes(x=0.04-col*(2-row), angle=(1.5-col)*45*(row+0.1)^.2), hjust=1, vjust=1) +
    scale_size_continuous(range=c(4,6))+
    scale_color_gradient(low="green4",high = "green1") + 
    theme_tufte() + ylim(-0.05,0.95) + xlim(-2.1,2.1) + xlab("") + ylab("") +
    theme(legend.position="none", 
          axis.ticks=element_line(color="white", size=0),
          axis.text=element_text(color="white", size=0))

  if (nrow(chlopcy3) > 0)
    pl <- pl + geom_text(data=chlopcy3, size=5, color="red3", hjust=0, vjust=0)
  if (nrow(dziewczynki3) > 0)
    pl <- pl + geom_text(data=dziewczynki3, size=5, color="red3", aes(x=0.04-col*(2-row), angle=(1.5-col)*45*(row+0.1)^.2), hjust=1, vjust=1) 
    
}
print(pl)

    dev.off()
      
    # Return a list containing the filename
    list(src = outfile,
         width = 720,
         height = 720)
    })
})

