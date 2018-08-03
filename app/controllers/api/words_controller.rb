
class Api::WordsController < ApplicationController

  def show
    query = params[:id]
    url = "https://od-api.oxforddictionaries.com/api/v1/entries/en/#{query}"
    @response = HTTParty.get(url,
      headers: {
      "Accept": "application/json",
      "app_id": ENV['ID'],
      "app_key": ENV['KEY']
    })
    puts @response
    render json: @response
  end
end
