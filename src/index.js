import { promises as fs } from "node:fs";
import { PLACEHOLDERS } from "./constants.js";
import fetch from "node-fetch";
import { EmailTemplate } from "./email/template.js";
import nodemailer from "nodemailer";
import { supabase } from "./supabase/client.js";
import { timeAgo } from "./utils/timeAgo.js";
import { formatDate } from "./utils/formatDate.js";
import { getCountryFromTimeZone } from "./utils/getCountry.js";

const getData = async () => {
  try {
    const { data, error } = await supabase
      .from(process.env.DB_TABLE)
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const objectPlaceholders = Object.keys(PLACEHOLDERS).map(
  (key) => PLACEHOLDERS[key],
);

const replaceAllPlaceholders = (template, placeholders, updatedContent) => {
  let result = template;
  for (let i = 0; i < placeholders.length; i += 1) {
    result = result.replaceAll(placeholders[i], updatedContent[i]);
  }
  return result;
};

(async () => {
  try {
    const data = await getData();

    const visitorsCount = data[0]?.visits_count ?? 0;
    const lastVisit = data[0] ?? {};
    const lastVisit_2 = data[1] ?? {};
    const lastVisit_3 = data[2] ?? {};
    const allCities = data.map((d) => d.city_name).filter(Boolean);
    const allCountries = data.map((d) => d.country_name).filter(Boolean);
    const allCountriesEmojiFlag = data.map((d) => d.emoji_flag).filter(Boolean);
    const allOs = data.map((d) => d.so).filter(Boolean);

    const countBy = (arr) =>
      arr.reduce((acc, item) => {
        const key = String(item).trim();
        if (!key) return acc;
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      }, {});

    const cityCounts = countBy(allCities);
    const countryCounts = countBy(allCountries);
    const countryEmojisCounts = countBy(allCountriesEmojiFlag);
    const osCounts = countBy(allOs);

    const toSortedArray = (counts) =>
      Object.entries(counts)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count);

    const cityResult = toSortedArray(cityCounts);
    const countryResult = toSortedArray(countryCounts);
    const countryEmojisResult = toSortedArray(countryEmojisCounts);
    const osResult = toSortedArray(osCounts);

    const [templateMD] = await Promise.all([
      fs.readFile("README.md.tpl", { encoding: "utf-8" }),
    ]);

    const mostFrequentCity = cityResult[0]?.name ?? "N/A";
    const mostFrequentCityCount = cityResult[0]?.count ?? 0;
    const secondFrequentCity = cityResult[1]?.name ?? "N/A";
    const secondCityCount = cityResult[1]?.count ?? 0;
    const thirdFrequentCity = cityResult[2]?.name ?? "N/A";
    const thirdCityCount = cityResult[2]?.count ?? 0;
    const fourthFrequentCity = cityResult[3]?.name ?? "N/A";
    const fourthCityCount = cityResult[3]?.count ?? 0;
    const fifthFrequentCity = cityResult[4]?.name ?? "N/A";
    const fifthCityCount = cityResult[4]?.count ?? 0;

    const mostFrequentCountry = countryEmojisResult[0]?.name ?? "N/A";
    const mostFrequentCountryCount = countryEmojisResult[0]?.count ?? 0;
    const secondFrequentCountry = countryEmojisResult[1]?.name ?? "N/A";
    const secondCountryCount = countryEmojisResult[1]?.count ?? 0;
    const thirdFrequentCountry = countryEmojisResult[2]?.name ?? "N/A";
    const thirdCountryCount = countryEmojisResult[2]?.count ?? 0;
    const fourthFrequentCountry = countryEmojisResult[3]?.name ?? "N/A";
    const fourthCountryCount = countryEmojisResult[3]?.count ?? 0;
    const fifthFrequentCountry = countryEmojisResult[2]?.name ?? "N/A";
    const fifthCountryCount = countryEmojisResult[2]?.count ?? 0;

    const mostFrequentOs = osResult[0]?.name ?? "N/A";

    const contentArray = [
      formatDate(new Date()),
      visitorsCount,

      mostFrequentCity,
      mostFrequentCityCount,
      secondFrequentCity,
      secondCityCount,
      thirdFrequentCity,
      thirdCityCount,
      fourthFrequentCity,
      fourthCityCount,
      fifthFrequentCity,
      fifthCityCount,

      mostFrequentCountry,
      mostFrequentCountryCount,
      secondFrequentCountry,
      secondCountryCount,
      thirdFrequentCountry,
      thirdCountryCount,
      fourthFrequentCountry,
      fourthCountryCount,
      fifthFrequentCountry,
      fifthCountryCount,

      mostFrequentOs,
      lastVisit.city_name,
      lastVisit.country_name,
      timeAgo(lastVisit.created_at),
      formatDate(lastVisit.created_at),
      new Date().getFullYear(),
    ];

    const email = "calcagni.gabriel86@gmail.com";
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: email, pass: process.env.GMAIL_USER_PASSWORD },
    });

    const lastVisitTemp = [
      {
        city: lastVisit.city_name,
        country: lastVisit.country_name,
        createdAt: formatDate(lastVisit.created_at),
      },
      {
        city: lastVisit_2.city_name,
        country: lastVisit_2.country_name,
        createdAt: formatDate(lastVisit_2.created_at),
      },
      {
        city: lastVisit_3.city_name,
        country: lastVisit_3.country_name,
        createdAt: formatDate(lastVisit_3.created_at),
      },
    ];

    await transporter.sendMail({
      from: email,
      to: "tutosneotecs@gmail.com",
      subject: "Reporte de visitas del portafolio • " + formatDate(new Date()),
      html: EmailTemplate({
        visitors: visitorsCount,
        cities: cityResult,
        countries: countryEmojisResult,
        lastVisitTemp,
      }),
    });

    const replacedItems = replaceAllPlaceholders(
      templateMD,
      objectPlaceholders,
      contentArray,
    );

    await fs.writeFile("README.md", replacedItems, { encoding: "utf-8" });
    console.log("💾 Datos actualizados, email enviado.");
  } catch (error) {
    console.log(error);
  }
})().catch((err) => console.log(err));
