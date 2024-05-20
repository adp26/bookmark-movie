export function convertGenre(genres, data) {
  if (typeof data[0] === "string") {
    return data.map((genre) => genres.find((val) => val.name === genre).id);
  }
  return data.map((id) => genres.find((val) => val.id === id).name);
}

export function convertLanguage(languages, data) {
  if (data.length == 0) return;
  if (data.length == 2) {
    return languages.find((val) => val.iso_639_1 === data).english_name;
  }
  return languages.find((val) => val.english_name === data).iso_639_1;
}
