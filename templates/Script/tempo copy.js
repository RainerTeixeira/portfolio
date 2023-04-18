$(document).ready(function() {
    // URL da API de tempo
    var api_url = 'https://api.weatherapi.com/v1/current.json?key=0db0c47f31a04683b28170629231503&q=Volta%20Redonda';
  
    // faz uma solicitação AJAX para a API
    $.getJSON(api_url, function(data) {
      // extrai as informações relevantes da resposta JSON
      var city = data.location.name;
      var country = data.location.country;
      var temperature = data.current.temp_c;
      var condition = data.current.condition.text;
      var icon = data.current.condition.icon;
  
      // constrói a string HTML para exibir as informações do tempo
      var html = '<div class="weather-city">' + city + ', ' + country + '</div>';
      html += '<div class="weather-condition">' + condition + '</div>';
      html += '<div class="weather-temperature">' + temperature + ' °C</div>';
      html += '<div class="weather-icon"><img src="' + icon + '"></div>';
  
      // exibe as informações do tempo no widget
      $('.weather-widget .weather-info').html(html);
    });
  });
  