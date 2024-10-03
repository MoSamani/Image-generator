import { useNavigate } from 'react-router-dom'
import './start/start.css'
import img1 from '../img/stockperson_v2.png'
import img2 from '../img/ai_generiret_v3.png'

const Start = () => {
  const navigate = useNavigate()

  return (
    <div className="homepageTextContainer">
      <div className="startimage">
        <img src={img1} alt="" />
        <img src={img2} alt="" />
      </div>
      <h1>Willkommen bei TimeLens – Dein Portrait auf Zeitreise!</h1>
      <p>
        Hast du dich jemals gefragt, wie du im Mittelalter als Ritter oder
        vielleicht in der Zukunft als Weltraumreisender ausgesehen hättest? Mit
        TimeLens hast du die Chance, das herauszufinden!
      </p>

      <p>
        Lade einfach ein Bild von dir hoch oder nutze deine Webcam, um dich
        ablichten zu lassen. Anschließend kannst du verschiedene Einstellungen
        wie Zeitalter und Ort wählen – möchtest du dich als Bewohner der
        Steinzeit in Afrika sehen oder lieber als jemand aus dem
        Digitalzeitalter in Europa? Die Entscheidung liegt ganz bei dir!{' '}
      </p>
      <p>
        TimeLens generiert ein völlig neues Bild von dir, das dich in deiner
        gewählten Zeit und an deinem Wunschort darstellt. Erlebe auf
        spielerische Weise, wie sich die Welt zu verschiedenen Zeiten und an
        verschiedenen Orten entwickelt hat – und wie du darin aussehen würdest.
      </p>
      <p>Viel Spaß beim Entdecken und Gestalten deiner eigenen Zeitreise!</p>
      <button
        className="nextbutton"
        onClick={() => navigate(`/promptsettings`)}
      >
        Start
      </button>
    </div>
  )
}

export default Start
