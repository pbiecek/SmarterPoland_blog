x <- c('Wypadku samochodowego', 'Grypy lub zapalenia płuc', 'Udanych prób samobójczych', 'Nie wiem')
y <- c(84, 65, 9, 3)

library(ggvis)

df <- data.frame(przyczyny = factor(x, levels=x), liczba.odpowiedzi = y, stringsAsFactors = FALSE)

ggvis(df, ~przyczyny, ~liczba.odpowiedzi) %>%
  layer_bars(width = 0.75) %>%
  add_axis("x", properties = axis_props(
    grid = list(stroke = "white")
  ))

