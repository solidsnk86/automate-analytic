export const EmailTemplate = ({ visitors, cities, countries, lastVisitTemp }) => `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Resumen de Visitas · Portafolio 2025</title>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,600;1,400&family=Poppins:wght@300;400;500&display=swap" rel="stylesheet"/>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      background: #f4f4f4;
      font-family: 'Poppins', sans-serif;
      color: #111;
      padding: 40px 16px;
    }

    .wrapper {
      max-width: 560px;
      margin: 0 auto;
    }

    /* Header */
    .header {
      background: rgba(255,255,255,0.5);
      backdrop-filter: blur(8px);
      border: 1px solid #e9e8e8;
      border-radius: 16px 16px 0 0;
      padding: 36px 40px 28px;
      text-align: center;
    }

    .header-eyebrow {
      font-family: 'Poppins', sans-serif;
      font-size: 10px;
      font-weight: 500;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: #888;
      margin-bottom: 10px;
    }

    .header h1 {
      font-family: 'Fraunces', serif;
      font-size: 30px;
      font-weight: 600;
      color: #111;
      line-height: 1.15;
    }

    .header h1 em {
      font-style: italic;
      font-weight: 400;
    }

    /* Body */
    .body {
      background: #efeff3ec;
      border-left: 1px solid #e9e8e8;
      border-right: 1px solid #e9e8e8;
      padding: 32px 40px;
    }

    .intro {
      font-size: 13px;
      font-weight: 300;
      color: #555;
      line-height: 1.7;
      margin-bottom: 28px;
    }

    /* Total visitors hero */
    .visitors-hero {
      background: #fff;
      border: 1px solid #e9e8e8;
      border-radius: 12px;
      padding: 24px 28px;
      display: flex;
      align-items: center;
      gap: 20px;
      margin-bottom: 24px;
      box-shadow: 0 2px 12px rgba(0,0,0,0.04);
      justify-content: center;
    }

    .visitors-label {
      font-size: 11px;
      font-weight: 500;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #999;
      margin-bottom: 4px;
    }

    .visitors-number {
      font-family: 'Fraunces', serif;
      font-size: 36px;
      font-weight: 600;
      color: #111;
      line-height: 1;
    }

    /* Section title */
    .section-title {
      font-size: 10px;
      font-weight: 500;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: #aaa;
      margin-bottom: 10px;
    }

    /* Stats table */
    table.stats {
      width: 100%;
      border-collapse: collapse;
      background: #fff;
      border: 1px solid #e9e8e8;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 2px 12px rgba(0,0,0,0.04);
      margin-bottom: 20px;
    }

    table.stats thead tr {
      background: #f4f4f4;
      border-bottom: 1px solid #e9e8e8;
    }

    table.stats thead th {
      font-size: 10px;
      font-weight: 500;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #aaa;
      padding: 11px 18px;
      text-align: left;
    }

    table.stats thead th:last-child {
      text-align: right;
    }

    table.stats tbody tr {
      border-bottom: 1px solid #f0f0f0;
      transition: background 0.15s;
    }

    table.stats tbody tr:last-child {
      border-bottom: none;
    }

    table.stats tbody td {
      padding: 13px 18px;
      font-size: 13px;
      font-weight: 300;
      color: #333;
      vertical-align: middle;
    }

    table.stats tbody td.rank {
      font-family: 'Fraunces', serif;
      font-size: 18px;
      font-weight: 600;
      color: #ccc;
      width: 40px;
    }

    table.stats tbody td.place {
      font-weight: 400;
      color: #111;
    }

    /* Divider between sections */
    .section-gap {
      margin-bottom: 20px;
    }

    /* Footer */
    .footer {
      background: rgba(255,255,255,0.5);
      border: 1px solid #e9e8e8;
      border-top: none;
      border-radius: 0 0 16px 16px;
      padding: 22px 40px;
      text-align: center;
    }

    .footer p {
      font-size: 11px;
      color: #bbb;
      font-weight: 300;
      line-height: 1.7;
    }

    .footer strong {
      font-weight: 500;
      color: #999;
    }

    .dot {
      display: inline-block;
      width: 4px;
      height: 4px;
      background: #ddd;
      border-radius: 50%;
      vertical-align: middle;
      margin: 0 8px;
    }
  </style>
</head>
<body>
  <div class="wrapper">

    <!-- Header -->
    <div class="header">
      <p class="header-eyebrow">Portafolio 2025</p>
      <h1>Tu resumen<br><em>de visitas</em></h1>
    </div>

    <!-- Body -->
    <div class="body">
      <p class="intro">Hola, aquí tienes tus estadísticas personales del período más reciente. Estos datos reflejan el alcance de tu portafolio en distintas ubicaciones.</p>

      <!-- Total visitors -->
      <div class="visitors-hero">
        <div style="text-align: center;">
          <p class="visitors-label">Visitantes totales</p>
          <p class="visitors-number">${visitors}</p>
        </div>
      </div>

      <!-- Cities -->
      <div class="section-gap">
        <p class="section-title">📍 Ciudades principales</p>
        <table class="stats">
          <thead>
            <tr>
              <th>#</th>
              <th>Ciudad</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="rank">1</td>
              <td class="place">${cities[0].name || 'N/A'}</td>
              <td class="place">${cities[0].count || 'N/A'}</td>
            </tr>
            <tr>
              <td class="rank">2</td>
              <td class="place">${cities[1].name || 'N/A'}</td>
              <td class="place">${cities[1].count || 'N/A'}</td>
            </tr>
            <tr>
              <td class="rank">3</td>
              <td class="place">${cities[2].name || 'N/A'}</td>
              <td class="place">${cities[2].count || 'N/A'}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Countries -->
      <div>
        <p class="section-title">🌍 Países principales</p>
        <table class="stats">
          <thead>
            <tr>
              <th>#</th>
              <th>País</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="rank">1</td>
              <td class="place">${countries[0].name || 'N/A'}</td>
              <td class="place">${countries[0].count || 'N/A'}</td>
            </tr>
            <tr>
              <td class="rank">2</td>
              <td class="place">${countries[1].name || 'N/A'}</td>
              <td class="place">${countries[1].count || 'N/A'}</td>
            </tr>
            <tr>
              <td class="rank">3</td>
              <td class="place">${countries[2].name || 'N/A'}</td>
              <td class="place">${countries[2].count || 'N/A'}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

     <div class="visitors-hero">
        <div style="text-align: center;">
          <p class="visitors-label">Visitantes totales</p>
          <p style="font-size: 10px">Última visita ${lastVisitTemp.city}, ${lastVisitTemp.country} el ${lastVisitTemp.createdAt}</p>
        </div>
      </div>

    <!-- Footer -->
    <div class="footer">
      <p>
        <strong>Portafolio 2025</strong>
        <span class="dot"></span>
        Reporte automático de visitas
        <span class="dot"></span>
        No responder este correo
      </p>
    </div>

  </div>
</body>
</html>
`
