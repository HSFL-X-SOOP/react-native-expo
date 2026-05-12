import { Linking, ScrollView } from 'react-native';
import { Text, View } from 'tamagui';
import { useTranslation } from '@/hooks/ui';

type Lang = 'de' | 'en';

type Localized = { de: string; en: string };

type Block =
  | { kind: 'h2'; text: Localized }
  | { kind: 'h3'; text: Localized }
  | { kind: 'p'; text: Localized }
  | { kind: 'list'; items: Localized[] }
  | { kind: 'mailto'; text: Localized; email: string };

const TITLE: Localized = { de: 'Datenschutzerklärung', en: 'Privacy Statement' };

const INTRO: Localized = {
  de:
    'Diese Datenschutzerklärung gilt für die mobile und Web-Anwendung „Marlin" (im Folgenden „Marlin" oder „die App") sowie für die zugehörige Backend-Infrastruktur unter marlin-live.com. Marlin stellt Sensor- und Umweltdaten in Echtzeit auf einer Karte dar.',
  en:
    'This privacy statement applies to the mobile and web application "Marlin" (hereinafter "Marlin" or "the app") and the associated backend infrastructure at marlin-live.com. Marlin visualises sensor and environmental data on a map in real time.',
};

const BLOCKS: Block[] = [
  { kind: 'h2', text: { de: 'Verantwortlicher', en: 'Controller' } },
  {
    kind: 'p',
    text: {
      de:
        'Verantwortlich für die Datenverarbeitung im Sinne der DSGVO ist das Marlin-Projekt. Kontakt:',
      en:
        'The controller responsible for data processing within the meaning of the GDPR is the Marlin project. Contact:',
    },
  },
  {
    kind: 'mailto',
    text: { de: 'marlin@marlin-live.com', en: 'marlin@marlin-live.com' },
    email: 'marlin@marlin-live.com',
  },

  { kind: 'h2', text: { de: 'Allgemeines zur Datenverarbeitung', en: 'General information on data processing' } },
  { kind: 'h3', text: { de: '1. Umfang der Verarbeitung personenbezogener Daten', en: '1. Extent of the processing of personal data' } },
  {
    kind: 'p',
    text: {
      de:
        'Wir verarbeiten personenbezogene Daten der Nutzer von Marlin grundsätzlich nur, soweit dies zur Bereitstellung einer funktionsfähigen App sowie unserer Inhalte und Leistungen erforderlich ist. Die Verarbeitung personenbezogener Daten unserer Nutzer erfolgt regelmäßig nur nach Einwilligung des Nutzers. Eine Ausnahme gilt in solchen Fällen, in denen eine vorherige Einholung einer Einwilligung aus tatsächlichen Gründen nicht möglich ist und die Verarbeitung der Daten durch gesetzliche Vorschriften gestattet ist.',
      en:
        'We process the personal data of Marlin users only to the extent necessary to provide a functioning app as well as our content and services. Personal data of our users is only processed with their consent. An exception is made in cases where prior consent cannot be obtained for factual reasons and the processing of data is permitted by law.',
    },
  },
  { kind: 'h3', text: { de: '2. Rechtsgrundlage für die Verarbeitung personenbezogener Daten', en: '2. Legal basis for the processing of personal data' } },
  {
    kind: 'p',
    text: {
      de:
        'Soweit wir für Verarbeitungsvorgänge personenbezogener Daten eine Einwilligung der betroffenen Person einholen, dient Art. 6 Abs. 1 lit. a EU-Datenschutzgrundverordnung (DSGVO) als Rechtsgrundlage.',
      en:
        'In as far as we obtain prior consent to process personal data of a person, art. 6 para. 1 point a of the General Data Protection Regulation (GDPR) of the European Union shall serve as a legal basis.',
    },
  },
  {
    kind: 'p',
    text: {
      de:
        'Bei der Verarbeitung von personenbezogenen Daten, die zur Erfüllung eines Vertrages – etwa zur Bereitstellung eines Marlin-Nutzerkontos – erforderlich ist, dient Art. 6 Abs. 1 lit. b DSGVO als Rechtsgrundlage. Dies gilt auch für Verarbeitungsvorgänge, die zur Durchführung vorvertraglicher Maßnahmen erforderlich sind.',
      en:
        'When we process personal data necessary for the performance of a contract – such as providing a Marlin user account – art. 6 para. 1 point b of the GDPR shall serve as a legal basis. The same applies for the processing of data necessary for the implementation of pre-contractual measures.',
    },
  },
  {
    kind: 'p',
    text: {
      de:
        'Soweit eine Verarbeitung personenbezogener Daten zur Erfüllung einer rechtlichen Verpflichtung erforderlich ist, der der Verantwortliche unterliegt, dient Art. 6 Abs. 1 lit. c DSGVO als Rechtsgrundlage.',
      en:
        'In as far as the processing of data is necessary to meet legal obligations the controller is subject to, art. 6 para. 1 point c of the GDPR shall serve as a legal basis.',
    },
  },
  {
    kind: 'p',
    text: {
      de:
        'Ist die Verarbeitung zur Wahrung eines berechtigten Interesses erforderlich – etwa zur Sicherstellung des sicheren Betriebs von Marlin – und überwiegen die Interessen, Grundrechte und Grundfreiheiten des Betroffenen das erstgenannte Interesse nicht, so dient Art. 6 Abs. 1 lit. f DSGVO als Rechtsgrundlage.',
      en:
        'If the processing of data is necessary for the purposes of the legitimate interests pursued – e.g. to ensure the secure operation of Marlin – and if such interests are not overridden by the interests or fundamental rights and freedoms of the data subject, art. 6 para. 1 point f of the GDPR shall serve as a legal basis.',
    },
  },
  { kind: 'h3', text: { de: '3. Datenlöschung und Speicherdauer', en: '3. Erasure and period for which data will be stored' } },
  {
    kind: 'p',
    text: {
      de:
        'Die personenbezogenen Daten der betroffenen Person werden gelöscht oder gesperrt, sobald der Zweck der Speicherung entfällt. Eine Speicherung kann darüber hinaus erfolgen, wenn dies durch den europäischen oder nationalen Gesetzgeber in unionsrechtlichen Verordnungen, Gesetzen oder sonstigen Vorschriften, denen der Verantwortliche unterliegt, vorgesehen wurde. Eine Sperrung oder Löschung der Daten erfolgt auch dann, wenn eine durch die genannten Normen vorgeschriebene Speicherfrist abläuft, es sei denn, dass eine Erforderlichkeit zur weiteren Speicherung der Daten für einen Vertragsabschluss oder eine Vertragserfüllung besteht.',
      en:
        'Personal data will be erased or blocked as soon as the purpose of the storage becomes void. After that point in time, data may be stored if this is required by European or national legislators in EU regulations, law or other provisions the controller is subject to. Data will also be erased or blocked when the storage period required by the rules and regulations mentioned above expires, unless the continued storage of data is necessary for the conclusion of an agreement or the performance of a contract.',
    },
  },

  { kind: 'h2', text: { de: 'Bereitstellung der App und Server-Logs', en: 'Provision of the app and server logs' } },
  { kind: 'h3', text: { de: '1. Beschreibung und Umfang der Datenverarbeitung', en: '1. Description and scope of the data processing' } },
  {
    kind: 'p',
    text: {
      de:
        'Bei jeder Anfrage der Marlin-App an unser Backend unter marlin-live.com erfasst unser System automatisiert technische Daten, die für die Auslieferung der Inhalte und den sicheren Betrieb erforderlich sind. Folgende Daten werden hierbei erhoben:',
      en:
        'Whenever the Marlin app sends a request to our backend at marlin-live.com, our system automatically records technical data required to deliver the content and to operate the service securely. The following data is collected:',
    },
  },
  {
    kind: 'list',
    items: [
      { de: 'IP-Adresse des anfragenden Geräts', en: "IP address of the requesting device" },
      { de: 'User-Agent (App-Version, Betriebssystem, Browser bei Web-Nutzung)', en: 'User-Agent (app version, operating system, browser when used on the web)' },
      { de: 'Datum und Uhrzeit der Anfrage', en: 'Date and time of the request' },
      { de: 'Aufgerufener API-Endpunkt und HTTP-Statuscode', en: 'Requested API endpoint and HTTP status code' },
    ],
  },
  { kind: 'h3', text: { de: '2. Rechtsgrundlage', en: '2. Legal basis' } },
  {
    kind: 'p',
    text: {
      de: 'Rechtsgrundlage für die vorübergehende Speicherung der Daten und der Logfiles ist Art. 6 Abs. 1 lit. f DSGVO.',
      en: 'The legal basis for temporarily storing data and log files is art. 6 para. 1 point f of the GDPR.',
    },
  },
  { kind: 'h3', text: { de: '3. Zweck der Datenverarbeitung', en: '3. Purpose of the processing' } },
  {
    kind: 'p',
    text: {
      de:
        'Die vorübergehende Speicherung der IP-Adresse ist notwendig, um die Antwort des Servers an das Gerät des Nutzers auszuliefern. Die Speicherung in Logfiles dient der Sicherstellung der Funktionsfähigkeit von Marlin, der Optimierung der Anwendung sowie der Sicherheit unserer informationstechnischen Systeme. Eine Auswertung der Daten zu Marketingzwecken findet nicht statt.',
      en:
        "The temporary storage of the IP address is necessary in order to deliver the server's response to the user's device. The storage in log files serves to ensure the functionality of Marlin, to optimise the application and to ensure the security of our IT systems. The data is not analysed for marketing purposes.",
    },
  },
  { kind: 'h3', text: { de: '4. Speicherdauer', en: '4. Period for which data will be stored' } },
  {
    kind: 'p',
    text: {
      de:
        'Die Daten werden gelöscht, sobald sie für die Erreichung des Zwecks ihrer Erhebung nicht mehr erforderlich sind. Im Falle der Erfassung der Daten zur Bereitstellung einer Antwort ist dies der Fall, sobald die jeweilige Anfrage abgeschlossen ist. Logfiles werden spätestens nach 14 Tagen gelöscht oder die enthaltenen IP-Adressen werden so verfremdet, dass eine Zuordnung zum anfragenden Client nicht mehr möglich ist.',
      en:
        'Data will be erased as soon as it is no longer necessary to achieve the purpose for which it was stored. For data collected to deliver a response, this is the case as soon as the respective request has been completed. Log files are deleted after 14 days at the latest, or the IP addresses they contain are anonymised so that they can no longer be attributed to the requesting client.',
    },
  },
  { kind: 'h3', text: { de: '5. Widerspruchs- und Beseitigungsmöglichkeit', en: '5. Possibility to appeal and delete' } },
  {
    kind: 'p',
    text: {
      de:
        'Die Erfassung dieser Daten und die Speicherung in Logfiles ist für den Betrieb von Marlin zwingend erforderlich. Es besteht folglich seitens des Nutzers keine Widerspruchsmöglichkeit.',
      en:
        'Collecting this data and storing it in log files is imperative to the operation of Marlin. The user therefore has no possibility to appeal.',
    },
  },

  { kind: 'h2', text: { de: 'Nutzerkonto und Registrierung', en: 'User account and registration' } },
  { kind: 'h3', text: { de: '1. Beschreibung und Umfang der Datenverarbeitung', en: '1. Description and scope of the data processing' } },
  {
    kind: 'p',
    text: {
      de: 'Für die Nutzung personalisierter Funktionen von Marlin ist die Anlage eines Nutzerkontos erforderlich. Bei der Registrierung und im Profil verarbeiten wir folgende Daten:',
      en: 'A user account is required to use personalised features of Marlin. When you register and maintain your profile, we process the following data:',
    },
  },
  {
    kind: 'list',
    items: [
      { de: 'E-Mail-Adresse (Pflicht, dient als Anmeldekennung und für Verifizierungs-/Sicherheits-E-Mails)', en: 'Email address (mandatory, used as login identifier and for verification/security emails)' },
      { de: 'Passwort (Pflicht, ausschließlich als sicherer Hash gespeichert)', en: 'Password (mandatory, stored only as a secure hash)' },
      { de: 'Vorname und Nachname (optional)', en: 'First name and last name (optional)' },
      { de: 'Sprachpräferenz und Maßeinheitensystem (optional)', en: 'Language preference and measurement system (optional)' },
      { de: 'Zugewiesener Standort, falls für ein Forschungs- oder Beobachtungsvorhaben gesetzt (optional)', en: 'Assigned location, if set for a research or monitoring activity (optional)' },
      { de: 'Verifizierungsstatus, Rollen und Zeitstempel der Konto- und Profiländerungen', en: 'Verification status, roles and timestamps of account and profile changes' },
    ],
  },
  { kind: 'h3', text: { de: '2. Rechtsgrundlage', en: '2. Legal basis' } },
  {
    kind: 'p',
    text: {
      de:
        'Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Erfüllung des Nutzungsverhältnisses) für Pflichtangaben sowie Art. 6 Abs. 1 lit. a DSGVO (Einwilligung) für freiwillige Angaben.',
      en:
        'The legal basis is art. 6 para. 1 point b of the GDPR (performance of the user relationship) for mandatory data, and art. 6 para. 1 point a of the GDPR (consent) for optional data.',
    },
  },
  { kind: 'h3', text: { de: '3. Zweck und Speicherdauer', en: '3. Purpose and storage period' } },
  {
    kind: 'p',
    text: {
      de:
        'Die Daten dienen der Authentifizierung, der Personalisierung der App und der Kommunikation mit Ihnen in sicherheits- oder kontorelevanten Angelegenheiten. Die Daten werden gespeichert, solange das Nutzerkonto besteht. Auf Ihren Antrag hin werden Konto und zugehörige personenbezogene Daten gelöscht, soweit keine gesetzlichen Aufbewahrungspflichten entgegenstehen.',
      en:
        'The data is used for authentication, for personalising the app and for contacting you regarding security or account matters. The data is stored for as long as your user account exists. Upon your request, the account and associated personal data are deleted, unless statutory retention obligations apply.',
    },
  },

  { kind: 'h2', text: { de: 'Anmeldung über Google und Apple', en: 'Sign-in with Google and Apple' } },
  {
    kind: 'p',
    text: {
      de:
        'Marlin bietet die Anmeldung über „Sign in with Google" und „Sign in with Apple" an. Wenn Sie diese Optionen nutzen, übermittelt Ihr Gerät ein von Google bzw. Apple ausgestelltes Identitäts-Token an unser Backend. Aus diesem Token entnehmen wir Ihre verifizierte E-Mail-Adresse sowie – sofern von Ihnen freigegeben und vom Anbieter übermittelt – Ihren Vor- und Nachnamen, um ein Marlin-Konto anzulegen oder Sie wiederzuerkennen.',
      en:
        'Marlin offers sign-in via "Sign in with Google" and "Sign in with Apple". When you use these options, your device transmits an identity token issued by Google or Apple to our backend. From this token we extract your verified email address and – if released by you and transmitted by the provider – your first and last name, in order to create a Marlin account or to recognise you.',
    },
  },
  {
    kind: 'p',
    text: {
      de:
        'Es werden keine weiteren Profilinformationen abgerufen. Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO. Für die Datenverarbeitung durch Google bzw. Apple selbst gelten die Datenschutzbestimmungen der jeweiligen Anbieter.',
      en:
        'No further profile information is retrieved. Processing is based on art. 6 para. 1 point b of the GDPR. The data processing carried out by Google or Apple themselves is governed by the respective providers\' privacy policies.',
    },
  },

  { kind: 'h2', text: { de: 'Magic-Link-Anmeldung', en: 'Magic link sign-in' } },
  {
    kind: 'p',
    text: {
      de:
        'Sie können sich alternativ per „Magic Link" anmelden. Dazu übermitteln Sie Ihre E-Mail-Adresse sowie die genutzte Plattform (iOS, Android, Web) an unser Backend. Wir versenden einen einmalig gültigen Anmeldelink bzw. Code an die angegebene E-Mail-Adresse. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO.',
      en:
        'You can alternatively sign in via "magic link". To do so, you transmit your email address and the platform used (iOS, Android, web) to our backend. We send a single-use sign-in link or code to the email address provided. The legal basis is art. 6 para. 1 point b of the GDPR.',
    },
  },

  { kind: 'h2', text: { de: 'Anmeldung und Sitzungsverwaltung', en: 'Sign-in and session management' } },
  {
    kind: 'p',
    text: {
      de:
        'Nach erfolgreicher Anmeldung hinterlegt Marlin die für Ihre Sitzung erforderlichen Informationen sicher auf Ihrem Gerät, damit Sie sich nicht bei jeder Nutzung erneut anmelden müssen. Ergänzend wird Ihre Sprachpräferenz lokal gespeichert. Diese Daten verlassen Ihr Gerät nur, soweit sie zur Authentifizierung gegenüber unserem Backend benötigt werden.',
      en:
        'After successful sign-in, Marlin securely stores the information required for your session on your device, so that you do not have to sign in again every time you use the app. Your language preference is additionally stored locally. This data leaves your device only insofar as it is needed to authenticate against our backend.',
    },
  },
  {
    kind: 'p',
    text: {
      de:
        'Sie können diese Daten jederzeit entfernen, indem Sie sich in der App abmelden oder die App deinstallieren. Erkennt das Backend, dass Ihre Sitzung nicht mehr gültig ist, werden Sie automatisch abgemeldet und die Sitzungsdaten verworfen.',
      en:
        'You can remove this data at any time by signing out in the app or by uninstalling the app. If the backend determines that your session is no longer valid, you will be signed out automatically and the session data is discarded.',
    },
  },

  { kind: 'h2', text: { de: 'Push-Benachrichtigungen', en: 'Push notifications' } },
  {
    kind: 'p',
    text: {
      de:
        'Wenn Sie Push-Benachrichtigungen aktivieren, registriert Marlin Ihr Gerät beim Push-Dienst Ihres Betriebssystems (Firebase Cloud Messaging für Android und Web, Apple Push Notification service für iOS) und speichert das daraus zurückgegebene Geräte-Token zusammen mit Ihrer Nutzer-ID in unserem Backend. Das Token wird ausschließlich verwendet, um Ihnen ereignisbezogene Benachrichtigungen (z. B. zu Sensorwerten oder Standorten, die Sie abonniert haben) zuzustellen.',
      en:
        'If you enable push notifications, Marlin registers your device with your operating system\'s push service (Firebase Cloud Messaging for Android and web, Apple Push Notification service for iOS) and stores the device token returned together with your user ID in our backend. The token is used exclusively to deliver event-related notifications to you (e.g. about sensor values or locations you have subscribed to).',
    },
  },
  {
    kind: 'p',
    text: {
      de:
        'Rechtsgrundlage ist Art. 6 Abs. 1 lit. a DSGVO (Einwilligung), die Sie über die Systemeinstellungen Ihres Geräts jederzeit widerrufen können. Bei einem Widerruf wird das gespeicherte Geräte-Token gelöscht.',
      en:
        'The legal basis is art. 6 para. 1 point a of the GDPR (consent), which you may withdraw at any time via your device\'s system settings. Upon withdrawal, the stored device token is deleted.',
    },
  },

  { kind: 'h2', text: { de: 'Benutzerorte und Karteninhalte', en: 'User locations and map content' } },
  {
    kind: 'p',
    text: {
      de:
        'Marlin zeigt Sensor- und Umweltdaten auf einer Karte an. Sie können einzelne Standorte abonnieren, um zugehörige Benachrichtigungen (z. B. „Hafen-Benachrichtigungen") zu erhalten. Hierbei speichern wir die Verknüpfung zwischen Ihrer Nutzer-ID und der jeweiligen Standort-ID sowie die zugehörigen Benachrichtigungseinstellungen.',
      en:
        'Marlin displays sensor and environmental data on a map. You can subscribe to individual locations in order to receive related notifications (e.g. "harbour notifications"). For this purpose, we store the link between your user ID and the respective location ID, along with the associated notification settings.',
    },
  },
  {
    kind: 'p',
    text: {
      de:
        'Die App selbst übermittelt keine kontinuierlichen GPS- oder Standortdaten Ihres Geräts an unser Backend. Sofern Sie Ihrem Gerät den Standortzugriff erlauben, wird dieser ausschließlich lokal verwendet, um Ihre aktuelle Position auf der Karte darzustellen. Rechtsgrundlage für die genannten Verarbeitungen ist Art. 6 Abs. 1 lit. b DSGVO.',
      en:
        'The app itself does not transmit any continuous GPS or location data from your device to our backend. If you grant your device location access, it is used exclusively locally to display your current position on the map. The legal basis for the processing described above is art. 6 para. 1 point b of the GDPR.',
    },
  },

  { kind: 'h2', text: { de: 'Karten- und Kartenkachel-Anbieter', en: 'Map and map tile providers' } },
  {
    kind: 'p',
    text: {
      de:
        'Zur Darstellung der Karte nutzt Marlin auf mobilen Plattformen MapLibre und im Web react-map-gl auf Basis von MapLibre GL. Die Kartenkacheln werden von einem unabhängigen Tile-Server geladen; bei diesem Abruf ist der Tile-Anbieter aus technischen Gründen in der Lage, Ihre IP-Adresse zu verarbeiten. Eine Verarbeitung über das hinaus ist uns nicht bekannt.',
      en:
        'To display the map, Marlin uses MapLibre on mobile platforms and react-map-gl based on MapLibre GL on the web. Map tiles are loaded from an independent tile server; in the course of this request the tile provider is technically able to process your IP address. Any further processing is not known to us.',
    },
  },

  { kind: 'h2', text: { de: 'Cookies und vergleichbare Technologien', en: 'Cookies and similar technologies' } },
  {
    kind: 'p',
    text: {
      de:
        'In der mobilen App werden keine Cookies eingesetzt. In der Web-Version verwenden wir lediglich technisch notwendige Speichermechanismen des Browsers, um Ihre Anmeldung sowie Ihre Sprachpräferenz zwischen Sitzungen zu erhalten. Es findet keine Reichweitenmessung und kein Tracking durch Dritte statt.',
      en:
        'No cookies are used in the mobile app. In the web version we only use technically necessary browser storage mechanisms to preserve your sign-in and your language preference across sessions. No reach measurement and no third-party tracking takes place.',
    },
  },

  { kind: 'h2', text: { de: 'Weitergabe von Daten an Dritte', en: 'Disclosure of data to third parties' } },
  {
    kind: 'p',
    text: {
      de:
        'Eine Weitergabe Ihrer personenbezogenen Daten an Dritte findet nur statt, soweit dies zur Erbringung des Dienstes erforderlich ist (z. B. an Google bzw. Apple bei der entsprechenden Anmeldemethode oder an Firebase Cloud Messaging bzw. den Apple Push Notification service zur Zustellung von Push-Benachrichtigungen) oder soweit wir gesetzlich dazu verpflichtet sind. Eine Übermittlung in Drittländer außerhalb des EWR erfolgt nur unter den Garantien der Art. 44 ff. DSGVO.',
      en:
        'Your personal data is only disclosed to third parties insofar as this is necessary to provide the service (e.g. to Google or Apple when you use the corresponding sign-in method, or to Firebase Cloud Messaging or the Apple Push Notification service to deliver push notifications), or insofar as we are legally obliged to do so. Any transfer to third countries outside the EEA only takes place subject to the safeguards of art. 44 et seq. of the GDPR.',
    },
  },

  { kind: 'h2', text: { de: 'Rechte der betroffenen Person', en: 'Rights of the data subject' } },
  {
    kind: 'p',
    text: {
      de:
        'Werden personenbezogene Daten von Ihnen verarbeitet, sind Sie Betroffener im Sinne der DSGVO und es stehen Ihnen folgende Rechte gegenüber dem Verantwortlichen zu:',
      en:
        'If your personal data is being processed, you are a data subject as defined in the GDPR and you have the following rights vis-à-vis the controller:',
    },
  },
  { kind: 'h3', text: { de: '1. Auskunftsrecht', en: '1. Right of access' } },
  {
    kind: 'p',
    text: {
      de:
        'Sie können vom Verantwortlichen eine Bestätigung darüber verlangen, ob personenbezogene Daten, die Sie betreffen, von uns verarbeitet werden. Liegt eine solche Verarbeitung vor, können Sie u. a. Auskunft über die Verarbeitungszwecke, die Kategorien der verarbeiteten Daten, die Empfänger, die geplante Speicherdauer, das Bestehen von Berichtigungs-, Löschungs- oder Einschränkungsrechten, das Bestehen eines Beschwerderechts und – soweit zutreffend – die Herkunft der Daten sowie das Bestehen automatisierter Entscheidungsfindung verlangen (Art. 15 DSGVO).',
      en:
        'You have the right to obtain confirmation from the controller as to whether personal data concerning you is being processed by us. If such processing is taking place, you may request information about, inter alia, the purposes of processing, the categories of data processed, the recipients, the envisaged storage period, the existence of rights to rectification, erasure or restriction, the existence of a right to lodge a complaint and – where applicable – the origin of the data and the existence of automated decision-making (art. 15 of the GDPR).',
    },
  },
  { kind: 'h3', text: { de: '2. Recht auf Berichtigung', en: '2. Right to rectification' } },
  {
    kind: 'p',
    text: {
      de:
        'Sie haben das Recht auf Berichtigung und/oder Vervollständigung gegenüber dem Verantwortlichen, sofern die verarbeiteten personenbezogenen Daten unrichtig oder unvollständig sind (Art. 16 DSGVO).',
      en:
        'You have the right to have inaccurate or incomplete personal data rectified or completed by the controller (art. 16 of the GDPR).',
    },
  },
  { kind: 'h3', text: { de: '3. Recht auf Einschränkung der Verarbeitung', en: '3. Right to restriction of processing' } },
  {
    kind: 'p',
    text: {
      de: 'Unter den Voraussetzungen des Art. 18 DSGVO können Sie die Einschränkung der Verarbeitung der Sie betreffenden personenbezogenen Daten verlangen.',
      en: 'Under the conditions of art. 18 of the GDPR you may request the restriction of the processing of personal data concerning you.',
    },
  },
  { kind: 'h3', text: { de: '4. Recht auf Löschung', en: '4. Right to erasure' } },
  {
    kind: 'p',
    text: {
      de:
        'Sie können vom Verantwortlichen verlangen, dass die Sie betreffenden personenbezogenen Daten unverzüglich gelöscht werden, sofern einer der in Art. 17 Abs. 1 DSGVO genannten Gründe zutrifft. Das Recht auf Löschung besteht nicht, soweit die Verarbeitung aus den in Art. 17 Abs. 3 DSGVO genannten Gründen erforderlich ist.',
      en:
        'You may request the controller to erase personal data concerning you without undue delay if one of the grounds set out in art. 17 para. 1 of the GDPR applies. The right to erasure does not apply to the extent that processing is necessary for one of the reasons set out in art. 17 para. 3 of the GDPR.',
    },
  },
  { kind: 'h3', text: { de: '5. Recht auf Unterrichtung', en: '5. Right to be informed' } },
  {
    kind: 'p',
    text: {
      de:
        'Haben Sie das Recht auf Berichtigung, Löschung oder Einschränkung der Verarbeitung gegenüber dem Verantwortlichen geltend gemacht, ist dieser verpflichtet, allen Empfängern, denen die Sie betreffenden personenbezogenen Daten offengelegt wurden, diese Berichtigung, Löschung oder Einschränkung mitzuteilen, es sei denn, dies erweist sich als unmöglich oder ist mit einem unverhältnismäßigen Aufwand verbunden (Art. 19 DSGVO).',
      en:
        'If you have exercised your right to rectification, erasure or restriction of processing against the controller, the controller is obliged to inform all recipients to whom the personal data concerning you has been disclosed of this rectification, erasure or restriction, unless this proves impossible or involves disproportionate effort (art. 19 of the GDPR).',
    },
  },
  { kind: 'h3', text: { de: '6. Recht auf Datenübertragbarkeit', en: '6. Right to data portability' } },
  {
    kind: 'p',
    text: {
      de:
        'Sie haben das Recht, die Sie betreffenden personenbezogenen Daten, die Sie dem Verantwortlichen bereitgestellt haben, in einem strukturierten, gängigen und maschinenlesbaren Format zu erhalten und einem anderen Verantwortlichen zu übermitteln, sofern die Voraussetzungen des Art. 20 DSGVO vorliegen.',
      en:
        'You have the right to receive personal data concerning you that you have provided to the controller in a structured, commonly used and machine-readable format and to transmit it to another controller, provided that the conditions of art. 20 of the GDPR are met.',
    },
  },
  { kind: 'h3', text: { de: '7. Widerspruchsrecht', en: '7. Right to object' } },
  {
    kind: 'p',
    text: {
      de:
        'Sie haben das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit gegen die Verarbeitung der Sie betreffenden personenbezogenen Daten, die aufgrund von Art. 6 Abs. 1 lit. e oder f DSGVO erfolgt, Widerspruch einzulegen. Der Verantwortliche verarbeitet die Sie betreffenden personenbezogenen Daten dann nicht mehr, es sei denn, er kann zwingende schutzwürdige Gründe für die Verarbeitung nachweisen, die Ihre Interessen, Rechte und Freiheiten überwiegen, oder die Verarbeitung dient der Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen.',
      en:
        'You have the right, on grounds relating to your particular situation, to object at any time to the processing of personal data concerning you which is based on art. 6 para. 1 point e or f of the GDPR. The controller will then no longer process the personal data concerning you, unless the controller can demonstrate compelling legitimate grounds for the processing which override your interests, rights and freedoms, or for the establishment, exercise or defence of legal claims.',
    },
  },
  { kind: 'h3', text: { de: '8. Recht auf Widerruf der Einwilligung', en: '8. Right to withdraw consent' } },
  {
    kind: 'p',
    text: {
      de:
        'Sie haben das Recht, Ihre datenschutzrechtliche Einwilligungserklärung jederzeit zu widerrufen. Durch den Widerruf der Einwilligung wird die Rechtmäßigkeit der aufgrund der Einwilligung bis zum Widerruf erfolgten Verarbeitung nicht berührt.',
      en:
        'You have the right to withdraw your consent at any time. The withdrawal of consent shall not affect the lawfulness of processing based on consent before its withdrawal.',
    },
  },
  { kind: 'h3', text: { de: '9. Automatisierte Entscheidungen einschließlich Profiling', en: '9. Automated individual decision-making, including profiling' } },
  {
    kind: 'p',
    text: {
      de:
        'Sie haben das Recht, nicht einer ausschließlich auf einer automatisierten Verarbeitung – einschließlich Profiling – beruhenden Entscheidung unterworfen zu werden, die Ihnen gegenüber rechtliche Wirkung entfaltet oder Sie in ähnlicher Weise erheblich beeinträchtigt (Art. 22 DSGVO). In Marlin findet eine solche automatisierte Entscheidungsfindung nicht statt.',
      en:
        'You have the right not to be subject to a decision based solely on automated processing, including profiling, which produces legal effects concerning you or similarly significantly affects you (art. 22 of the GDPR). No such automated decision-making takes place within Marlin.',
    },
  },
  { kind: 'h3', text: { de: '10. Recht auf Beschwerde bei einer Aufsichtsbehörde', en: '10. Right to lodge a complaint with a supervisory authority' } },
  {
    kind: 'p',
    text: {
      de:
        'Unbeschadet eines anderweitigen verwaltungsrechtlichen oder gerichtlichen Rechtsbehelfs steht Ihnen das Recht auf Beschwerde bei einer Aufsichtsbehörde zu, insbesondere in dem Mitgliedstaat Ihres Aufenthaltsorts, Ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes, wenn Sie der Ansicht sind, dass die Verarbeitung der Sie betreffenden personenbezogenen Daten gegen die DSGVO verstößt.',
      en:
        'Without prejudice to any other administrative or judicial remedy, you have the right to lodge a complaint with a supervisory authority, in particular in the EU Member State of your habitual residence, place of work or place of the alleged infringement, if you consider that the processing of personal data concerning you infringes the GDPR.',
    },
  },

  { kind: 'h2', text: { de: 'Kontakt zur Wahrnehmung Ihrer Rechte', en: 'Contact for exercising your rights' } },
  {
    kind: 'p',
    text: {
      de:
        'Anfragen zur Wahrnehmung Ihrer Betroffenenrechte gegenüber dem Marlin-Projekt richten Sie bitte an:',
      en:
        'To exercise your data subject rights in relation to the Marlin project, please contact:',
    },
  },
  {
    kind: 'mailto',
    text: { de: 'marlin@marlin-live.com', en: 'marlin@marlin-live.com' },
    email: 'marlin@marlin-live.com',
  },
];

function getText(loc: Localized, lang: Lang): string {
  return lang === 'en' ? loc.en : loc.de;
}

export default function PrivacyScreen() {
  const { currentLanguage } = useTranslation();
  const lang: Lang = currentLanguage === 'en' ? 'en' : 'de';

  return (
    <View flex={1} width="100%" backgroundColor="$background" alignItems="center">
      <ScrollView
        style={{ width: '100%' }}
        contentContainerStyle={{
          maxWidth: 768,
          width: '100%',
          alignSelf: 'center',
          paddingHorizontal: 16,
          paddingBottom: 40,
        }}
      >
        <Text fontSize="$8" fontWeight="bold" color="$color" marginTop={30} marginBottom={16}>
          {getText(TITLE, lang)}
        </Text>
        <Text fontSize="$5" color="$color" marginBottom={16}>
          {getText(INTRO, lang)}
        </Text>

        {BLOCKS.map((block, idx) => {
          switch (block.kind) {
            case 'h2':
              return (
                <Text key={idx} fontSize="$7" fontWeight="bold" color="$color" marginTop={30} marginBottom={8}>
                  {getText(block.text, lang)}
                </Text>
              );
            case 'h3':
              return (
                <Text key={idx} fontSize="$5" fontWeight="bold" color="$color" marginTop={20} marginBottom={8}>
                  {getText(block.text, lang)}
                </Text>
              );
            case 'p':
              return (
                <Text key={idx} fontSize="$4" color="$color" marginBottom={16} lineHeight={24}>
                  {getText(block.text, lang)}
                </Text>
              );
            case 'list':
              return (
                <View key={idx} marginBottom={16}>
                  {block.items.map((item, j) => (
                    <Text key={j} fontSize="$4" color="$color" marginBottom={4} lineHeight={24}>
                      {'• '}
                      {getText(item, lang)}
                    </Text>
                  ))}
                </View>
              );
            case 'mailto':
              return (
                <Text
                  key={idx}
                  fontSize="$4"
                  color="$accent7"
                  textDecorationLine="underline"
                  marginBottom={16}
                  onPress={() => Linking.openURL(`mailto:${block.email}`)}
                  cursor="pointer"
                >
                  {getText(block.text, lang)}
                </Text>
              );
          }
        })}
      </ScrollView>
    </View>
  );
}
