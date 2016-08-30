library(shiny)
library(networkD3)
load("data.rda")

shinyUI(fluidPage(
  tags$head(
    tags$style(HTML("
                    .well {
                    background-color: #ffffff!important;
                    border: #ffffff!important;
                    padding: 0px!important;
                    margin-bottom: 0px!important;
                    margin-top: 20px!important;
                    }
                    body {
                    font-size: 12px!important;
                    }
                    "))
    ),
  
  fluidRow(
    column(2,br()),
    column(4,
      selectInput("cnt1", "Select country", levels(data$Country), "Poland")),
    column(4,
      selectInput("cnt2", "Select country", levels(data$Country), "Greece")
    )
  ),
  HTML("<center>"),
  plotOutput("text", width = 1000, height = 550),
 br(),br(),
 p("Designed by", HTML("<a href='http://smarterpoland.pl'>Fundacja SmarterPoland.pl</a>"),br(),
   "Data from", HTML("<a href='https://www.globalinnovationindex.org/content/page/data-analysis/'>https://www.globalinnovationindex.org</a>")),
  HTML("</center>")
))
