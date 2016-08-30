library(shiny)
library(ggplot2)
load("data.rda")

shinyServer(function(input, output) {
  
  output$text <- renderPlot({
    cnt1 <- input$cnt1
    cnt2 <- input$cnt2
    ggplot(data, aes(topic, Percentage.Rank, group=Country, label=paste0(Country, " ", Percentage.Rank*100,"%"))) +
      geom_line(color="grey80") +
      geom_point(color="grey60") + 
      geom_line(data=data[data$Country == cnt1,], color="red4", size=1.5) +
      geom_point(data=data[data$Country == cnt1,], color="red4", size=3) + 
      geom_text(data=data[data$Country == cnt1,], color="red4", size=5, hjust=0, vjust=-0.3) + 
      geom_line(data=data[data$Country == cnt2,], color="blue4", size=1.5) +
      geom_point(data=data[data$Country == cnt2,], color="blue4", size=3) + 
      geom_text(data=data[data$Country == cnt2,], color="blue4", size=5, hjust=0, vjust=-0.3) + 
      coord_flip() + theme_bw() + xlab("") + 
      ylim(1,0)+
      ylab("best     <---     Percent Rank     --->     worst")+
      theme(panel.border=element_rect(color="white"), text=element_text(size=16)) +
      ggtitle("Country ranking in The Global Innovation Index 2015")

  })

})
