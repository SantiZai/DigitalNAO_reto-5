from flask import Flask, request, render_template
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def home():
    if request.method == "POST":
        url = request.form["url"]
        try:
            response = requests.get(url)
            response.raise_for_status()
            soup = BeautifulSoup(response.text, "html.parser")

            titles = [tag.get_text() for tag in soup.find_all("h2")]
            if not titles:
                titles = ["No se encontraron títulos en esta página."]

            return render_template("index.html", titles=titles)
        except requests.exceptions.RequestException as e:
            return render_template("index.html", error=f"Error al acceder a la URL: {e}")
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True, port=8080)

