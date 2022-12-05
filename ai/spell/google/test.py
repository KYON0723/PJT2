from serpapi import GoogleSearch

params = {
  "q": "Coffeee",
  "hl": "en",
  "gl": "us",
  "api_key": "9fc9adf661710cc2173174e92787774b00cb3d9735a74b0ba99918eefd212134"
}

search = GoogleSearch(params)
results = search.get_dict()
search_information = results["search_information"]

print(results)