from flask import Flask, request, render_template, session, redirect, url_for
import random

app = Flask(__name__)
app.secret_key = "ahorcado_secret_key"  # Necesario para manejar sesiones

# Lista de palabras para el juego
WORDS = ["python", "flask", "javascript", "programacion", "ahorcado"]

@app.route("/", methods=["GET", "POST"])
def home():
    # Inicializar el juego si no está en la sesión
    if "word" not in session:
        session["word"] = random.choice(WORDS)
        session["guesses"] = []
        session["attempts"] = 6

    word = session["word"]
    guesses = session["guesses"]
    attempts = session["attempts"]
    message = None

    if request.method == "POST":
        guess = request.form.get("guess").lower()

        if guess in guesses:
            message = "Ya has adivinado esa letra."
        elif guess in word:
            guesses.append(guess)
            session["guesses"] = guesses
            message = f"¡Bien hecho! La letra '{guess}' está en la palabra."
        else:
            guesses.append(guess)
            session["guesses"] = guesses
            session["attempts"] -= 1
            message = f"La letra '{guess}' no está en la palabra. Intentos restantes: {session['attempts']}"

        # Comprobar si el jugador ganó
        if set(word) <= set(guesses):
            return render_template("win.html", word=word)

        # Comprobar si el jugador perdió
        if session["attempts"] <= 0:
            return render_template("lose.html", word=word)

    return render_template("index.html", word=word, guesses=guesses, attempts=session["attempts"], message=message)

@app.route("/reset")
def reset():
    session.clear()
    return redirect(url_for("home"))

if __name__ == "__main__":
    app.run(debug=True, port=8080)
