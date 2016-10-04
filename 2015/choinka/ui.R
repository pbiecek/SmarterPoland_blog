## ui.R
library(shiny)

shinyUI(fluidPage(
  tags$head(
    tags$link(rel="stylesheet", type="text/css", href="mojcss.css"),
    tags$script("(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
                  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
                  ga('create', 'UA-5650686-6', 'icm.edu.pl');
                  ga('send', 'pageview');")),
  fluidRow(column(12,
           textInput(inputId = "msc",
                     label = "Zaznacz imiona",
                     value = "")
           )),
  fluidRow(column(12,
           plotOutput("gmina", width=720, height=720)))
  )
)
