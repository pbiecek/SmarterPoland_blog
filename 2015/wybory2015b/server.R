library(ggplot2)
library(scales)
library(lubridate)
load("elections1.rda")

shinyServer(function(input, output) {
  position <- reactiveValues(x = NULL)
  
  observeEvent(input$plot_hower, {
    hower <- input$plot_hower
    if (!is.null(hower)) {
      position$x <- hower$x
    } 
  })
  
  # 
  output$plot <- renderPlot({ 
    elections <- elections1[elections1$source %in% input$pola,]
    
    pl <- ggplot(elections, aes(x=daysToElections, y=support)) + 
      geom_point(aes(shape=source, color=candidate), size=4) +
      scale_shape_manual(values=LETTERS) + theme_bw() + xlab("days to elections") + ylab("support (%)") +
      scale_y_continuous(limits=c(10,75), breaks=seq(10,70,10)) +
      geom_smooth(size=2,aes(color=candidate),se=FALSE, method="lm") 
  
    if (!is.null(position$x)) {
      pl <- pl + geom_linerange(x=position$x, ymin=10, ymax=65)
      
      cand <- c("Bronisław Komorowski", "Andrzej Duda" )
      npoints <- predict(lm(support~daysToElections*candidate, data=elections1),
        newdata = data.frame(daysToElections = position$x, 
                             candidate=cand))
      ndf <- data.frame(candidate=cand, support=npoints, daysToElections = position$x)
      ndf2 <- data.frame(support=72, daysToElections = position$x, 
                         text=paste0("Days to elections: ",round(position$x),"\n", 
                                     paste0(cand, " (", round(npoints,1), "%)", collapse="\n"),
                                     "\ndiff: ", round(diff(npoints),1), "%"))
      pl <- pl + geom_point(data=ndf, aes(color=candidate), size=4) +
        geom_text(data=ndf2, aes(x=daysToElections, y=support, label=text), size=4, hjust=1+position$x/170)
    }
      
    pl + scale_color_manual(values=c("blue3", "orange3")) 
      
  })
  
})
