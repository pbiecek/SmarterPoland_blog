library(shiny)
library(gridExtra)
library(dplyr)
library(ggplot2)
library(ggthemes)
library(scales)
load("sredniaSzkol.rda")
load("szkoly2.rda")
load("sredniaSzkolP.rda")

sredniaSzkol$id_szkoly <- as.character(sredniaSzkol$id_szkoly)
levels(sredniaSzkol$zadanie) <- paste("Zadanie", 1:34)

sredniaSzkolP$id_szkoly <- as.character(sredniaSzkolP$id_szkoly)
levels(sredniaSzkolP$zadanie) <- c(paste0("Zadanie 1.", 3:7),
                                   paste0("Zadanie 2.", 1:5))


shinyServer(function(input, output) {

  output$distPlot <- renderPlot({
    miasto <- input$miasto
    id_sz <- unique((szkoly %>% filter(poczta == miasto))$id_szkoly)

    df <- filter(sredniaSzkol, id_szkoly!= "wszystkie")
    if (length(unique(df$id_szkoly)) >= 2) {
      ndf <- df %>%
        mutate(id_szkoly = factor(ifelse(id_szkoly %in% id_sz,  miasto, "Pozostałe miasta"), levels = c( miasto, "Pozostałe miasta"), labels = c( miasto, "Pozostałe miasta"))) %>%
        group_by(zadanie, id_szkoly) %>%
        summarise(procent = mean(procent, na.rm=TRUE))

      zM <- ggplot(ndf, aes(x=id_szkoly, y=procent, group=zadanie)) +
        geom_line() +
        geom_text(data=ndf[ndf$id_szkoly == "Pozostałe miasta", ], aes(x=id_szkoly, y=procent, label=zadanie), hjust=-0.2, size=3, color="blue3") +
        geom_text(data=ndf[ndf$id_szkoly != "Pozostałe miasta", ], aes(x=id_szkoly, y=procent, label=zadanie), hjust=1.2, size=3, color="red3") +
        geom_text(data=data.frame(id_szkoly=factor(c("Pozostałe miasta", miasto), levels = c("Pozostałe miasta", miasto), labels = c("Pozostałe miasta", miasto)), procent=1.05), aes(label=id_szkoly, x=id_szkoly, y=procent, group=id_szkoly, color=id_szkoly)) + 
        scale_color_manual(values=c("blue3","red3")) +
        theme_tufte() +
        scale_y_continuous(label=percent, breaks=seq(0,1,0.1), limit=c(0,1.05)) + xlab("") + ylab("Procent uczniów, którzy rozwiązali to zadanie\n(uzyskali więcej niż 0 punktów)") +
        ggtitle(paste("Matematyka 2015\n\n",miasto)) +
        theme(text = element_text(size=18),
              title= element_text(size=12),
legend.position="none")
      
    } else {

      zM <- ggplot(df, aes(x=id_szkoly, y=procent, group=zadanie)) +
        geom_text(data=df[df$id_szkoly == "Średnia w Polsce", ], aes(x=id_szkoly, y=procent, label=zadanie), hjust=0) +
        theme_tufte() +
        scale_y_continuous(label=percent, breaks=seq(0,1,0.1)) +
        ggtitle("Wybierz Twoją szkołę") + xlab("") + ylab("")
    }
    
    df <- filter(sredniaSzkolP, id_szkoly != "wszystkie")
    if (length(unique(df$id_szkoly)) >=2) {
      ndf <- df %>%
        mutate(id_szkoly = factor(ifelse(id_szkoly %in% id_sz,  miasto, "Pozostałe miasta"), levels = c( miasto, "Pozostałe miasta"), labels = c( miasto, "Pozostałe miasta"))) %>%
        group_by(zadanie, id_szkoly) %>%
        summarise(procent = mean(procent, na.rm=TRUE))
      
      zP <- ggplot(ndf, aes(x=id_szkoly, y=procent, group=zadanie)) +
        geom_line() +
        geom_text(data=ndf[ndf$id_szkoly == "Pozostałe miasta", ], aes(x=id_szkoly, y=procent, label=zadanie), hjust=-0.2, size=3, color="blue3") +
        geom_text(data=ndf[ndf$id_szkoly != "Pozostałe miasta", ], aes(x=id_szkoly, y=procent, label=zadanie), hjust=1.2, size=3, color="red3") +
        geom_text(data=data.frame(id_szkoly=factor(c("Pozostałe miasta", miasto), levels = c("Pozostałe miasta", miasto), labels = c("Pozostałe miasta", miasto)), procent=1.05), aes(label=id_szkoly, x=id_szkoly, y=procent, group=id_szkoly, color=id_szkoly)) + 
        scale_color_manual(values=c("blue3","red3")) +
        theme_tufte() +
        scale_y_continuous(label=percent, breaks=seq(0,1,0.1), limit=c(0,1.05)) + xlab("") + ylab("Procent uczniów, którzy rozwiązali to zadanie\n(uzyskali więcej niż 0 punktów)") +
        ggtitle(paste("Język polski 2015\n\n",miasto)) +
        theme(text = element_text(size=18),
              title= element_text(size=12),
              legend.position="none")

    } else {
      zP <- ggplot(df, aes(x=id_szkoly, y=procent, group=zadanie)) +
        geom_text(data=df[df$id_szkoly == "Średnia w Polsce", ], aes(x=id_szkoly, y=procent, label=zadanie), hjust=0) +
        theme_tufte() +
        scale_y_continuous(label=percent, breaks=seq(0,1,0.1)) +
        ggtitle("Wybierz Twoją szkołę") + xlab("") + ylab("")
    }
    
    grid.arrange(zM, zP, ncol=2)
    
  })

})
