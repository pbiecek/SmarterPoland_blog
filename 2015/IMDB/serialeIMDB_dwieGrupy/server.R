library(shiny)
library(ggvis)
library(dplyr)
#setwd("~/GitHub/MOOC/4_modelowanie/serialeIMDB/")
load("serialeIMDB.rda")

shinyServer(function(input, output) {
  mySerial <- reactive({
    serialeIMDB2 <- serialeIMDB
    serialeIMDB2$serial <- paste0(serialeIMDB2$serial, " ")
    serialeIMDB <- rbind(serialeIMDB, serialeIMDB2)
    tmp <- serialeIMDB[serialeIMDB$serial %in% c(input$serial1, input$serial2), ]
    tmp$serial <- factor(tmp$serial, levels=c(input$serial1, input$serial2))
    tmp$col <- c("#4d4dce", "#EE7600")[as.numeric(droplevels(tmp$serial))]
    tmp <- tmp %>% 
      group_by(serial) %>%
      mutate(serialx = as.numeric(as.character(id))/(1.2*max(as.numeric(as.character(id)))))
    tmp$serialx <- as.numeric(droplevels(tmp$serial)) + tmp$serialx
    tmp
  })
  
  output$opis = renderUI({
    ser <- mySerial()
    napis1 <- paste0("http://www.imdb.com/title/",unique(ser$imdbId)[1],"/epdate?ref_=ttep_ql_4")
    if (length(unique(ser$imdbId))>1) {
      napis2 <- paste0("http://www.imdb.com/title/",unique(ser$imdbId)[2],"/epdate?ref_=ttep_ql_4")
    } else {
      napis2 <- ""  
    }
    p.val <- wilcox.test(ocena~serial, data=ser)$p.value
    srednie <- tapply(ser$ocena, droplevels(ser$serial), mean, na.rm=TRUE)
    HTML("Średnia ocena dla ",  input$serial1 ," to <b>", signif(srednie[input$serial1], 3), "</b>, ",
         "średnia ocena dla ",  input$serial2 ," to <b>", signif(srednie[input$serial2], 3), "</b>, wynik testu na istotność różnicy p.value to <b>", signif(p.val, 2),
         "</b><br><br>Dane o ocenach serialu <b>",input$serial1,"</b> można pobrać ze strony <br/> <a href='", napis1, "'>",napis1,"</a><br>",
         "Dane o ocenach serialu <b>",input$serial2,"</b> można pobrać ze strony <br/> <a href='", napis2, "'>",napis2,"</a><br><br>")
  })
  
  etykieta <- function(data){
    if(is.null(data)) return(NULL)
    if (is.null(data$id)) return(NULL)
    df <- isolate(mySerial())
    df2 <- df[df$id == data$id & df$serial == data$serial, ]
    paste0("<b>",df2$nazwa, " (S",df2$sezon, "/", df2$odcinek,")</b>",
           "<br>ocena: ",as.character(df2$ocena))
  }
  
  mySerial %>%
    ggvis(x = ~serialx, y = ~ocena, fill = ~sezon) %>%
    group_by(serial) %>%
    layer_model_predictions(model = "lm", formula = ocena ~ I(serialx*0)) %>%
    layer_points(size.hover := 200,
                 fillOpacity := 0.55,
                 fillOpacity.hover := 0.95, shape = ~serial) %>%
    hide_axis("x") %>%
    set_options(width = 640,padding = padding(10, 10, 50, 50)) %>%
    add_legend(c("fill", "shape")) %>%
    add_tooltip(etykieta, "hover") %>%
    bind_shiny("serialPlot")
  
})

