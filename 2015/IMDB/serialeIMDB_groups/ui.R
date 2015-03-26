library(shiny)
library(ggvis)

load("newIMDB.rda")
groups <- colnames(ratingsGroup)

shinyUI(fluidPage(tags$script("(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
                  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
                  ga('create', 'UA-5650686-6', 'icm.edu.pl');
                  ga('send', 'pageview');"),
            tags$head(tags$style(HTML("
                            .ggvis-output-container {
                            margin-left: auto ;
                            margin-right: auto ;
                            width: 500px;
                            }
                            .shiny-html-output {
                            margin-left: auto ;
                            margin-right: auto ;
                            width: 500px;
                            }
                            .selectize-control {
                            margin-left: auto ;
                            margin-right: auto ;
                            width: 250px;
                            }
                            .control-label {
                            margin-left: auto ;
                            margin-right: auto ;
                            width: 250px;
                            }
                            .row {
                            margin-left: auto!important;
                            margin-right: auto!important;
                            width: 700px!important;
                            }
                            .col-sm-4 {
                            margin-left: auto ;
                            margin-right: auto ;
                            width: 300px;
                            }
                            .shiny-input-container {
                            margin-left: auto ;
                            margin-right: auto ;
                            width: 250px!important;
                            }
                            "))),
    fluidRow(HTML("<center><h3>How different age / gender groups rate movies?</h3> <br/>Based on IMDB database (see <a href='http://www.imdb.com/title/tt1344204/ratings'>here for example</a>).<br>
                  Each dot is a movie. <br/>Colors stand for differences in ratings, orange - small differences.</center><br>")),
    fluidRow(column(width = 4, selectInput("group1", "Criterion for OX axis", 
                             choices = groups, 
                             selected = groups[1]), offset=2),
          column(width = 4, selectInput("group2", "Criterion for OY axis", 
                              choices = groups, 
                              selected = groups[2]))),
  fluidRow(ggvisOutput("serialPlot"))
  )
)
