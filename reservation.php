<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    
    if (isset($_POST["firstName"]) && !empty($_POST["firstName"]) &&
        isset($_POST["lastName"]) && !empty($_POST["lastName"]) &&
        isset($_POST["location"]) && !empty($_POST["location"]) &&
        isset($_POST["phoneNumber"]) && !empty($_POST["phoneNumber"]) &&
        isset($_POST["reservationTime"]) && !empty($_POST["reservationTime"])) {

        // Définir votre adresse e-mail où vous souhaitez recevoir les détails de réservation
        $to = "speedcleanservice1@gmail.com";
        $subject = "Détails de réservation";

        // Préparer le message
        $message = "Détails de réservation :\n";
        $message .= "Prénom : " . $_POST["firstName"] . "\n";
        $message .= "Nom : " . $_POST["lastName"] . "\n";
        $message .= "Lieu : " . $_POST["location"] . "\n";
        $message .= "Numéro de téléphone : " . $_POST["phoneNumber"] . "\n";
        $message .= "Heure de réservation : " . $_POST["reservationTime"] . "\n";

        
        $headers = "De: " . $_POST["firstName"] . " " . $_POST["lastName"] . " <" . $_POST["email"] . ">\r\n";
        $headers .= "Répondre à : " . $_POST["email"] . "\r\n";

        // Envoyer l'e-mail
        if (mail($to, $subject, $message, $headers)) {
            // E-mail envoyé avec succès
            echo json_encode(["success" => true, "message" => "Détails de réservation envoyés avec succès !"]);
        } else {
            // Échec de l'envoi de l'e-mail
            echo json_encode(["success" => false, "message" => "Impossible d'envoyer les détails de réservation. Veuillez réessayer plus tard."]);
        }
    } else {
        
        echo json_encode(["success" => false, "message" => "Veuillez remplir tous les champs obligatoires."]);
    }
} else {
    
    header("Location: reservation1.html");
    exit;
}
?>

