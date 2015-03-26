library(shiny)
library(ggvis)
library(dplyr)
#setwd("~/GitHub/MOOC/4_modelowanie/serialeIMDB/")
load("newIMDB.rda")
load("serialeIMDB.rda")

groups <- colnames(ratingsGroup)
colnames(votesGroup) <- groups
votesGroup <- votesGroup[-200,]

slownik <- serialeIMDB %>%
  select(serial, imdbId) %>%
  unique()
rownames(slownik) <- slownik$imdbId


shinyServer(function(input, output) {
  xy <- reactive({
    xx <- as.numeric(votesGroup[,input$group1])
    yy <- as.numeric(votesGroup[,input$group2])
    gr <- cut(xx - yy, c(-10,-0.5,0.5,10))
    
    data.frame(x = xx,
               y = yy,
               gr = gr,
               name = slownik[rownames(votesGroup), "serial"],
               xl = input$group1,
               yl = input$group2)

  })
  
  etykieta <- function(data){
    if(is.null(data)) return(NULL)

    paste0("<b>",data$name, "</b><br/> ",data$xl, ": ", data$x, " <br/>", data$yl, ": ", data$y,"")
  }
  
  abline_data <- function (domain, intercept, slope) {
    data.frame(x = domain, y = domain * slope + intercept)
  }
  layer_abline <- function (.vis, domain, intercept = 0, slope = 1, dash = 6, ...) {
    df <- abline_data(domain, intercept, slope)
    names(df) <- with(.vis$cur_props, c(x.update$value, y.update$value))
    layer_paths(.vis, data = df, ..., strokeDash := dash)
  }

  
  xy %>% 
    ggvis(x =~ x, y =~ y) %>%
    group_by(name, xl, yl) %>%
    layer_points(fill = ~gr, size.hover := 200,
                 fillOpacity := 0.9,
                 fillOpacity.hover := 0.95) %>%
    layer_abline(c(7,10)) %>%
    add_axis("x", title = "Criterion for OX axis") %>%
    add_axis("y", title = "Criterion for OY axis") %>%
    add_tooltip(etykieta, "hover") %>%
    set_options(width = 640,padding = padding(10, 10, 50, 50)) %>%
    bind_shiny("serialPlot")
  
})

