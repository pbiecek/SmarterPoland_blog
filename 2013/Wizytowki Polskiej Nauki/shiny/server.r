## server.r
require(ggplot2)
#setwd("/Users/pbiecek/camtasia/GitHub/SmarterPoland_blog/2013/Wizytowki Polskiej Nauki/shiny/")

#dane <- read.table("wszystkieJednostki.csv")
#save(dane, file="wszystkieJednostki.rda")

(load("wszystkieJednostki.rda"))

shinyServer(function(input, output) {
  output$wykresInteraktywny <- renderUI({
    dziedzina <- strsplit(input$dziedzina, split="[\\(\\)]")[[1]][2]
    link <- paste0("http://smarterpoland.pl/materialy/parametryzacja/chart_",dziedzina, "_", input$kryterium1, input$kryterium2,".html")
    
    HTML(newHtml(link))
  })
  
  output$downloadData <- downloadHandler(
    filename = paste('dane.csv', sep=''),
    content = function(file) {
      dziedzina <- strsplit(input$dziedzina, split="[\\(\\)]")[[1]][2]
      dat <- dane[dane[,"grupa"] == dziedzina, c(1, 2, 3, 4, 5, 6, 7)]
      write.csv(dat, file)
    }
  )
  output$downloadPlot <- downloadHandler(
    filename = paste('wykres.pdf', sep=''),
    content = function(file) {
      dziedzina <- strsplit(input$dziedzina, split="[\\(\\)]")[[1]][2]
      dat <- dane[dane[,"grupa"] == dziedzina, c(1, 2, 3, 4, 5, 6, 7)]
      
      require(ggplot2)
      pdf(file=file, 12, 12)
      print(qplot(dat[,input$kryterium1], dat[,input$kryterium2], col = Kategoria, size=I(4), shape = Kategoria, data=dat)+
        xlab(input$kryterium1) + ylab(input$kryterium2) + theme_bw()+
        ggtitle(input$dziedzina) )
      dev.off()
    }, contentType = 'image/pdf'
  )
  
})

newHtml <- function (link){
  pre <- paste0('<object type="text/html" border=0 data="',link,
                '" width="720" height="560"><embed src="',link,
                '" width="720" height="560"> </embed></object>')
  return(pre)
}

