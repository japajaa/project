const fetch = require('node-fetch');

const getDepartures = async () => {

    try {
        const response = await fetch('https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql', {
            method: 'post',
            body: JSON.stringify({ 'query': '{stop(id: "HSL:1040129") {id name}}'}),
            headers: { 'Content-Type': 'application/json'  }
          })
        return response.json()
    } catch (e) {
        console.log(e)
        return {error: e}
    }
}

exports.getDepartures = getDepartures;