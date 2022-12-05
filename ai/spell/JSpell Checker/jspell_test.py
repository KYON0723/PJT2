import requests

url = "https://jspell-checker.p.rapidapi.com/check"

payload = {
	"language": "enUS",
	"fieldvalues": "thiss is intresting",
	"config": {
		"forceUpperCase": False,
		"ignoreIrregularCaps": False,
		"ignoreFirstCaps": True,
		"ignoreNumbers": True,
		"ignoreUpper": False,
		"ignoreDouble": False,
		"ignoreWordsWithNumbers": True
	}
}
headers = {
	"content-type": "application/json",
	"X-RapidAPI-Key": "9cc1aeb10dmshc74e65d87eb4390p19a618jsnb7388c6cb687",
	"X-RapidAPI-Host": "jspell-checker.p.rapidapi.com"
}

response = requests.request("POST", url, json=payload, headers=headers)

print(response[0])