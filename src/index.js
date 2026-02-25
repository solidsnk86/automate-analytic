import { promises as fs } from 'node:fs'
import { PLACEHOLDERS } from './constants.js'
import fetch from 'node-fetch'
import { EmailTemplate } from './email/template.js'
import nodemailer from 'nodemailer'

const getData = async () => {
  const res = await fetch(process.env.BACK_URL)
  const data = await res.json()
  return data.allViews
}

const objectPlaceholders = Object.keys(PLACEHOLDERS).map((key) => PLACEHOLDERS[key])

const replaceAllPlaceholders = (template, placeholders, updatedContent) => {
  let result = template
  for (let i = 0; i < placeholders.length; i += 1) {
    result = result.replaceAll(placeholders[i], updatedContent[i])
  }
  return result
}

export const formatDate = (str) => {
  return new Date(str).toLocaleDateString('es-AR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'America/Argentina/Buenos_Aires'
  })
}

(async () => {
  try {
    const data = await getData()

    const visitorsCount = data[0]?.visits_count ?? 0
    const lastVisit = data[0] ?? {}
    const allCities = data.map((d) => d.city_name).filter(Boolean)
    const allCountries = data.map((d) => d.country_name).filter(Boolean)
    const allOs = data.map((d) => d.so).filter(Boolean)

    const countBy = (arr) =>
      arr.reduce((acc, item) => {
        const key = String(item).trim()
        if (!key) return acc
        acc[key] = (acc[key] || 0) + 1
        return acc
      }, {})

    const cityCounts = countBy(allCities)
    const countryCounts = countBy(allCountries)
    const osCounts = countBy(allOs)

    const toSortedArray = (counts) =>
      Object.entries(counts)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)

    const cityResult = toSortedArray(cityCounts)
    const countryResult = toSortedArray(countryCounts)
    const osResult = toSortedArray(osCounts)

    const [templateMD] = await Promise.all([
      fs.readFile('README.md.tpl', { encoding: 'utf-8' })
    ])

    const mostFrequentCity = cityResult[0]?.name ?? 'N/A'
    const mostFrequentCityCount = cityResult[0]?.count ?? 0
    const secondFrequentCity = cityResult[1]?.name ?? 'N/A'
    const secondCityCount = cityResult[1]?.count ?? 0
    const thirdFrequentCity = cityResult[2]?.name ?? 'N/A'
    const thirdCityCount = cityResult[2]?.count ?? 0

    const mostFrequentCountry = countryResult[0]?.name ?? 'N/A'
    const mostFrequentCountryCount = countryResult[0]?.count ?? 0
    const secondFrequentCountry = countryResult[1]?.name ?? 'N/A'
    const secondCountryCount = countryResult[1]?.count ?? 0
    const thirdFrequentCountry = countryResult[2]?.name ?? 'N/A'
    const thirdCountryCount = countryResult[2]?.count ?? 0

    const mostFrequentOs = osResult[0]?.name ?? 'N/A'

    const contentArray = [
      formatDate(new Date()),
      visitorsCount,

      mostFrequentCity,
      mostFrequentCityCount,
      secondFrequentCity,
      secondCityCount,
      thirdFrequentCity,
      thirdCityCount,

      mostFrequentCountry,
      mostFrequentCountryCount,
      secondFrequentCountry,
      secondCountryCount,
      thirdFrequentCountry,
      thirdCountryCount,

      mostFrequentOs,
      lastVisit.city_name,
      lastVisit.country_name,
      formatDate(lastVisit.created_at),
      new Date().getFullYear()
    ]

    const email = 'tutosneotecs86@gmail.com'
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: email, pass: process.env.GMAIL_PASS }
    })

    const lastVisitTemp = { city: lastVisit.city_name, country: lastVisit.country_name, createdAt: formatDate(lastVisit.created_at) }

    await transporter.sendMail({
      from: email,
      to: 'calcagni.gabriel86@gmail.com',
      subject: 'Visitas del portafolio 💼 • ' + new Date().getFullYear(),
      html: EmailTemplate({ visitors: visitorsCount, cities: cityResult, countries: countryResult, lastVisitTemp })
    })

    const replacedItems = replaceAllPlaceholders(templateMD, objectPlaceholders, contentArray)

    await fs.writeFile('README.md', replacedItems, { encoding: 'utf-8' })
    console.log('💾 Datos actualizados, email enviado.')
  } catch (error) {
    console.log(error)
  }
})().catch((err) => console.log(err))
