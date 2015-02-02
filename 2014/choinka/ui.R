## ui.R
library(shiny)

shinyUI(fluidPage(
  textInput(inputId = "imie",
            label = "Zaznacz imiona",
            value = ""),
  plotOutput("choinka", width=720, height=720)
)
)
