const axios = require("axios");
const qs = require("querystring");

const TRANSLATE_METHODS = {
  nmt: "nmt",
};

class Papago {
  constructor(config) {
    this.config = config;
  }

  async lookup(term, { method }) {
    if (this.config == null) {
      throw new Error(
        "Papago instance should be initialized with config first"
      );
    }
    if (term == null) {
      throw new Error("Search term should be provided as lookup arguments");
    }

    const url =
      method === TRANSLATE_METHODS.smt ? "language/translate" : "papago/n2mt";

    const params = qs.stringify({
      source: "en",
      target: "ko",
      text: term,
    });

    const config = {
      baseURL: "https://openapi.naver.com/v1/",
      headers: {
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "x-naver-client-id": this.config.NAVER_CLIENT_ID,
        "x-naver-client-secret": this.config.NAVER_CLIENT_SECRET,
      },
    };

    const response = await axios.post(url, params, config);

    return response.data.message.result.translatedText;
  }
}

async function main() {
  // NOTE: populate with your own Client id/secret from https://developers.naver.com/apps
  const papago = new Papago({
    NAVER_CLIENT_ID: "f5H3GCQi7n8fhe7Z4voI",
    NAVER_CLIENT_SECRET: "_uol1psyrI",
  });

  const nmtResult = await papago.lookup("i was a car.", {
    method: "nmt",
  });
  console.log("[nmt]", nmtResult);
}

main();
