## ui.R
require('rjson');

showOutput2 <- function(outputId) {
  div(class="rChart", 
#      tagList(
#        singleton(tags$head(tags$link(href = "http://smarterpoland.pl/materialy/parametryzacja/polychart2.standalone.js", rel="stylesheet")))
#      ),
      uiOutput(outputId)
  )
}

shinyUI(pageWithSidebar(
  headerPanel("Oceny jednostek, projekt fundacji SmarterPoland.pl"),
  
  sidebarPanel(
    tags$div(title="Wybierz interesującą Cię dziedzinę",
             selectInput(inputId = "dziedzina",
                label = "Wybierz interesującą Cię dziedzinę",
                choices = c("Nauki o Zyciu (NZ)", "Nauki Scisle (SI)", "Nauki Humanistyczne (HS)"),
                selected = "June, 6/01/2013 -- 6/30/2013")),
    p("Wybierz kryteria do porownania"),
    selectInput(inputId = "kryterium1",
                label = "Kryterium na osi OX",
                choices = c("Osiagniecia_naukowe_i_tworcze", "Potencjal_naukowy",  "Materialne_efekty_dzialalnosci_naukowej", 
                            "Pozostale_efekty_dzialalnosci_naukowej", "Ocena_ostateczna"), 
                selected = "Potencjal_naukowy"),
    br(),
    selectInput(inputId = "kryterium2",
                label = "Kryterium na osi OY",
                choices = c("Osiagniecia_naukowe_i_tworcze", "Potencjal_naukowy",  "Materialne_efekty_dzialalnosci_naukowej", 
                            "Pozostale_efekty_dzialalnosci_naukowej", "Ocena_ostateczna"), 
                selected = "Osiagniecia_naukowe_i_tworcze")
    ),
      mainPanel(
        tabsetPanel(
          tabPanel("Wykres interkatywny", showOutput2("wykresInteraktywny")),  
          tabPanel("Wykres do pobrania", downloadButton('downloadPlot', 'Pobierz wykres w formacie pdf')), 
          tabPanel("Dane do pobrania", downloadButton('downloadData', 'Pobierz dane w formacie csv'))
        )
    )
))

