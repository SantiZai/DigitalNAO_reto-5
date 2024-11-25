from flask import Flask, request, render_template

app = Flask(__name__)

# Definición del menú
menu = {
    "1": {"text": "Consultar saldo", "action": "Tu saldo es de $500."},
    "2": {"text": "Transferir dinero", "submenu": {
        "1": {"text": "Transferir a un amigo", "action": "Transferencia a amigo realizada."},
        "2": {"text": "Transferir a cuenta bancaria", "action": "Transferencia a cuenta bancaria realizada."},
    }},
    "3": {"text": "Recargar saldo", "action": "Recarga realizada con éxito."}
}

@app.route("/", methods=["GET", "POST"])
def home():
    current_menu = menu  # Menú inicial
    message = None
    selected_option = None

    if request.method == "POST":
        user_input = request.form.get("option", "")
        selected_option = user_input

        # Navegar en el menú según la opción seleccionada
        try:
            if "submenu" in current_menu[user_input]:
                current_menu = current_menu[user_input]["submenu"]
            else:
                message = current_menu[user_input]["action"]
        except KeyError:
            message = "Opción no válida. Inténtalo nuevamente."

    return render_template("index.html", menu=current_menu, message=message, selected_option=selected_option)

if __name__ == "__main__":
    app.run(debug=True, port=8080)

