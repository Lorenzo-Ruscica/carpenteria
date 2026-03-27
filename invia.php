<?php
// Questo è uno script nativo in PHP utilizzabile se carichi il sito su un normale hosting web (es. Aruba, Aruba, SiteGround, ecc).
// Per attivarlo, sostituisci nella pagina "contatti.html" il form attuale eliminando l'attributo id="contactForm" 
// e aggiungendo action="invia.php" method="POST".

header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Raccogli i dati dal form in modo sicuro
    $nome = htmlspecialchars(strip_tags($_POST['name'] ?? ''));
    $email = filter_var($_POST['email'] ?? '', FILTER_SANITIZE_EMAIL);
    $servizio = htmlspecialchars(strip_tags($_POST['service'] ?? 'Non specificato'));
    $messaggio = htmlspecialchars(strip_tags($_POST['message'] ?? ''));

    // Configurazione dell'email
    $destinatario = "lorenzo.ruscica2008@gmail.com"; 
    $oggetto = "Nuova richiesta dal Sito Web - " . $nome;
    
    // Corpo dell'email
    $corpo_messaggio = "Hai ricevuto un nuovo messaggio dal form contatti del sito web.\n\n";
    $corpo_messaggio .= "Dettagli:\n";
    $corpo_messaggio .= "Nome: " . $nome . "\n";
    $corpo_messaggio .= "Email: " . $email . "\n";
    $corpo_messaggio .= "Servizio d'interesse: " . $servizio . "\n\n";
    $corpo_messaggio .= "Messaggio inserito:\n" . $messaggio . "\n";

    // Intestazioni (Headers)
    $headers = "From: noreply@" . $_SERVER['HTTP_HOST'] . "\r\n"; // Usa in automatico il dominio per evitare spam
    $headers .= "Reply-To: " . $email . "\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    // Se i dati sono validi, invia l'email
    if (!empty($nome) && !empty($email) && filter_var($email, FILTER_VALIDATE_EMAIL)) {
        if (mail($destinatario, $oggetto, $corpo_messaggio, $headers)) {
            // Risposta ok (potresti fare un reindirizzamento o mandare json per Javascript)
            echo json_encode(['status' => 'success', 'message' => 'Messaggio inviato correttamente.']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Errore del server durante linvio. Riprova più tardi.']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Dati non validi o email non corretta.']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Metodo non consentito.']);
}
?>
