load("serialeIMDB.rda")
load("newIMDB.rda")

# add nice names for collumns
groups <- colnames(ratingsGroup)
colnames(votesGroup) <- groups
# sorry ninjago, this row will be removed
votesGroup <- votesGroup[-200,]

slownik <- serialeIMDB %>%
  dplyr::select(serial, imdbId) %>%
  unique()
rownames(slownik) <- slownik$imdbId

votesGroup <- cbind(votesGroup, serialName = as.character(slownik[rownames(votesGroup), "serial"]))



colnames(votesGroup) <- gsub(gsub(colnames(votesGroup), pattern = "^ ", replacement = ""), pattern = " $", replacement = "")

save(votesGroup, file="votesGroup.rda")





#
# load the data

load("votesGroup.rda")
# [1] "Males"              "Females"            "Aged under 18"      "Males under 18"     "Females under 18"  
# [6] "Aged 18-29"         "Males Aged 18-29"   "Females Aged 18-29" "Aged 30-44"         "Males Aged 30-44"  
# [11] "Females Aged 30-44" "Aged 45+"           "Males Aged 45+"     "Females Aged 45+"   "serialName"    

#
# select only specific cols
group1 <- "Males"
group2 <- "Females"

# convert characters to numbers
xx <- as.numeric(votesGroup[,group1])
yy <- as.numeric(votesGroup[,group2])
gr <- cut(xx - yy, c(-10,-0.5,0.5,10))


df <- data.frame(x = xx, y = yy, gr = gr,
               name = votesGroup[,"serialName"])
    
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



