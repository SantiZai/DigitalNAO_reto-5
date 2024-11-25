from flask import Flask, request, render_template
from num2words import num2words

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def home():
    if request.method == "POST":
        try:
            number = int(request.form["number"])
            words = num2words(number, lang="es")
            return render_template("index.html", result=words)
        except ValueError:
            return render_template("index.html", error="Por favor, ingrese un número válido.")
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True, port=8080)

