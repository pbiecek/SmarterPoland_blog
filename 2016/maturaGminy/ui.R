library(shiny)

load("szkoly2.rda")

listaSzkol <- sort(unique(szkoly$poczta))

shinyUI(fluidPage(
  tags$head(tags$script("(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
                        })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
                        ga('create', 'UA-5650686-6', 'auto');
                        ga('send', 'pageview');")),
  # Sidebar with a slider input for number of bins
  sidebarLayout(
    sidebarPanel(
  HTML("<div id='fb-root'></div>
<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = '//connect.facebook.net/pl_PL/sdk.js#xfbml=1&version=v2.5&appId=636734043128492';
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>"),
      h1("Nowa Matura 2015"),
HTML('<div class="fb-like" data-href="http://mi2.mini.pw.edu.pl:8080/SmarterPoland/matura2015/" data-width="100" data-layout="button_count" data-action="like" data-show-faces="false" data-share="true"></div>'),
      br(),br(),
      p("Jak szkoły w Twojej miejscowości wypadły na nowej maturze z matematyki 2015?"),
      br(),
      p("Jeżeli któreś zadanie poszło wyjątkowo słabo, może warto przyjrzeć się mu bliżej?"),
      br(),
      p("Porównaj skuteczność rozwiązywania zadań w porównaniu do średniej z całej Polski"),
      br(),
      selectInput("miasto", "Miejscowość:", listaSzkol, selected = "Warszawa"),
      br(),
      p("Projekt i wykonanie:", br(),a("Fundacja SmarterPoland.pl", href="http://smarterpoland.pl")),br(),
      img(src="http://smarterpoland.pl/logo.png", width=100, align="center"),br(),br(),br(),
      p("Wykorzystano dane udostępnione przez ", a("pakiet ZPD", href="http://zpd.ibe.edu.pl/"), "wykonany przez Instytut Badań Edukacyjnych."),
      width = 3
    ),
    # Show a plot of the generated distribution
    mainPanel(
      plotOutput("distPlot", width = 800, height = 900),
      width = 9
    )
  )
))
