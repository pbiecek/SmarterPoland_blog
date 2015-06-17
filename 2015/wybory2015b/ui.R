library(shiny)
load("elections1.rda")

shinyUI(fluidPage(
  tags$head(
    tags$style(HTML("
      .col-sm-4 {
        width: 200px!important;
      }
      .well {
        background-color: #ffffff!important;
        border: #ffffff!important;
      }
      body {
        font-size: 12px!important;
      }

    "))
  ),
  
  titlePanel(h2("Polls prior to the presidential election 2015")),
  
  sidebarLayout(
    sidebarPanel( 
      checkboxGroupInput("pola", "Show results for",
                         unique(elections1$source)[1:9], unique(elections1$source)[1:9]),
      p("Dev:", HTML("<a href='http://smarterpoland.pl'>Fundacja SmarterPoland.pl</a>"))
      ),
    mainPanel( plotOutput("plot", width = 700, height = 550, 
                          hover = hoverOpts(id = "plot_hower")))
  )
))
