const pons = async (word, subpage = "translate") => {
	const translateBody = {
		"dictionaryHint":	"defr",
		"language1": "fr",
		"language2": "de",
		"query": word,
		"locale": "de"
	}

	const conjugationBody = {
		"headword": word,
		"language": "fr",
		"locale": "de"
	}

	const exampleSentenceBody = {
		"dictionary": "defr",
		"language1": "fr",
		"language2": "de",
		"locale": "de",
		"query": word,
		"sourceLanguage": "fr"
	}

	const bodies = {
		"translate": translateBody,
		"conjugation-table": conjugationBody,
		"example-sentences": exampleSentenceBody
	}

	const response = await fetch("https://api-ng.pons.com/pons-mf-resultpage/api/" + subpage, {
		"credentials": "omit",
		"headers": {
			"Accept": "application/json, text/plain, */*",
			"Content-Type": "application/json",
			"Sec-Fetch-Mode": "cors",
			"Sec-Fetch-Site": "same-site"
		},
		"referrer": "https://de.pons.com/",
		"body": JSON.stringify(bodies[subpage]),
		"method": "POST",
		"mode": "cors"
	});
	const body = await response.json()
	return body
}

const getEverything = async (word) => {
	const subpages = ["translate", "conjugation-table", "example-sentences"]

	const promises = await Promise.all(subpages.map(subpage => pons(word, subpage)))
	// const body = await Promise.all(promises.map(promise => promise.json()))
	console.log(promises)
}

await getEverything("tenir")
