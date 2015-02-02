## ui.R
library(shiny)

shinyUI(fluidPage(
  textInput(inputId = "msc",
                     label = "Zaznacz imiona",
                     value = ""),
  plotOutput("gmina", width=720, height=720)
  )
)
