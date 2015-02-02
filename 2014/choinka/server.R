## server.r
library(ggplot2)
library(scales)
library(Cairo)
library(ggthemes)
library(shiny)

load("dzch.rda")

zielonaChoinka <- function() {
  ggplot(chlopcy, aes(x=-0.04+col*(2-row), y=row^1, label=imie, angle=-(1.5-col)*45*(row+0.1)^.2, size=liczba, color=liczba)) + 
    geom_text(hjust=0, vjust=0) +
    geom_text(data=dziewczynki, aes(x=0.04-col*(2-row), angle=(1.5-col)*45*(row+0.1)^.2), hjust=1, vjust=1) +
    scale_size_continuous(range=c(4,6))+
    scale_color_gradient(low="green4",high = "green1") + 
    theme_tufte() + ylim(-0.05,0.95) + xlim(-2.1,2.1) + xlab("") + ylab("") +
    theme(legend.position="none", 
          axis.ticks=element_line(color="white", size=0),
          axis.text=element_text(color="white", size=0))
}

shinyServer(function(input, output, session) {
  output$choinka <- renderImage({
  outfile <- tempfile(fileext='.svg')
  CairoSVG(outfile, width=12, height=12)

  pl <- zielonaChoinka()
  if (input$imie != "")  {
    chlopcy3 <- chlopcy[grepl(tolower(chlopcy$imie), pattern= tolower(input$imie)),,drop=FALSE]
    if (nrow(chlopcy3) > 0) 
      pl <- pl + geom_text(data=chlopcy3, color="red3", hjust=0, vjust=0)
    
    dziewczynki3 <- dziewczynki[grepl(tolower(dziewczynki$imie), pattern= tolower(input$imie)),,drop=FALSE]
    if (nrow(dziewczynki3) > 0) 
      pl <- pl + geom_text(data=dziewczynki3, color="red3", aes(x=0.04-col*(2-row), angle=(1.5-col)*45*(row+0.1)^.2), hjust=1, vjust=1) 
      
  }

  print(pl)
  dev.off()
      
  list(src = outfile, width = 720, height = 720)
    })
})

