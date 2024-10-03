# TimeLens: Dein Portrait auf Zeitreise

## Projektteam
- Artur Reimer
- Erfanulla Kazikhil
- Mohammad Samani
- Robin Luthe

## Abstract
In Modul „Interdisziplinärer Projekt Container“ haben wir als Gruppe einen KI-Generator entwickelt, der es Nutzern ermöglicht, ein personalisiertes Bild von sich selbst in verschiedenen historischen Epochen, an unterschiedlichen Orten und basierend auf ihrem aktuellen Alter und Geschlecht zu erstellen. Dabei können Nutzer frei entscheiden, ob sie ihr eigenes Geschlecht darstellen oder sich in einem anderen Geschlecht sehen möchten, um zu erfahren, wie sie z.B. als Frau, Mann oder Divers in dieser Zeit und an diesem Ort aussehen würden.

Eine besondere Funktion ist die Möglichkeit, eine eigene Eingabe (Prompt) zu formulieren, durch die der Nutzer zusätzliche Elemente oder Objekte im Bild platzieren lassen kann. Um den Einstieg zu erleichtern, werden außerdem einige Beispiel-Prompts angezeigt, die den Nutzern helfen, Ideen zu finden oder sie inspirieren, falls ihnen selbst nichts einfällt. Zudem können die Nutzer ein bereits vorhandenes Bild hochladen oder ihre Kamera verwenden, um ein aktuelles Foto zu integrieren. Nachdem das Bild generiert wurde, erhalten die Nutzer mehrere ver-schiedene Versionen ihrer Eingaben, sodass sie verschiedene Darstellungen und Stile sehen können. Dadurch wird das Bild individuell anpassbar und bietet jedem Nutzer eine einzigartige Darstellung.

Unser Ziel ist es, den Nutzern eine unterhaltsame und spielerische Anwendung zu bieten, die es ihnen ermöglicht, die Vielfalt menschli-cher Erfahrungen visuell darzustellen und gleichzeitig in die faszinie-rende Welt der Zeitreise einzutauchen, während sie die technischen Möglichkeiten von KI und Bildgenerierung aufzeigen.

## Installation/Bedienungsanleitung

1. Installiere [Node.js](https://nodejs.org/en/).

2. Installiere [Git](https://git-scm.com/downloads).

3. Öffne eine Konsole, navigiere zum gewünschten Verzeichnis und klone das [Projekt-Repository](https://github.com/vgep/image-generator) von GitHub mit folgendem Befehl:
    ```
    git clone https://github.com/vgep/image-generator.git
    ``` 
    Zugang zum Repository kann beim Projektteam angefragt werden.

4. Öffne das geklonte Projekt mit [Visual Studio Code](https://code.visualstudio.com/).

5. Navigiere zum _backend_-Ordner, erstelle eine _.env_-Datei für Umgebungsvariablen (wie z.B. API-Keys) und füge folgenden Inhalt hinzu:
    ```
    STABILITY_API_KEY=your_api_key_here
    OPENAI_API_KEY=your_api_key_here
    ``` 
    Die API-Keys können im Nutzerprofil der jeweiligen AI-Plattformen abgerufen werden.

6. Öffne ein [Terminal](https://code.visualstudio.com/docs/terminal/basics) in Visual Studio Code und installiere die benötigten Projekt-Pakete mit folgendem Befehl:
    ```
    npm install
    ``` 

7. Starte den lokalen Entwicklungsserver mit folgendem Befehl:
    ```
    npm start
    ``` 
    Ein neues Browserfenster http://localhost:3000/ öffnet sich und zeigt die Startseite des Projekts.