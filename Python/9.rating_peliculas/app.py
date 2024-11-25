from flask import Flask, request, render_template
import requests

app = Flask(__name__)

API_KEY = "788cedbd"

@app.route("/", methods=["GET", "POST"])
def home():
    movie_info = None
    error = None

    if request.method == "POST":
        movie_title = request.form.get("movie_title")
        if movie_title:
            # Realizar la solicitud a la API
            url = f"http://www.omdbapi.com/?t={movie_title}&apikey={API_KEY}"
            response = requests.get(url)
            data = response.json()

            if data.get("Response") == "True":
                movie_info = {
                    "title": data.get("Title"),
                    "year": data.get("Year"),
                    "rating": data.get("imdbRating"),
                    "genre": data.get("Genre"),
                    "plot": data.get("Plot"),
                    "poster": data.get("Poster"),
                }
            else:
                error = "Película no encontrada. Intenta con otro título."
        else:
            error = "Por favor, ingresa un título de película."

    return render_template("index.html", movie_info=movie_info, error=error)

if __name__ == "__main__":
    app.run(debug=True, port=8080)

