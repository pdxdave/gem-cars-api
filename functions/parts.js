require('dotenv').config()
const Airtable = require('airtable-node')

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base('app0g2WHXJpZIqJx7')
  .table('parts')

  exports.handler = async(event, context) => {
    try {
        const {records} = await airtable.list()
        const parts = records.map((part) => {
            const {id} = part 
            const {name, desc, price, images, mfg, part_type } = part.fields
            const url = images[0].url 
            return {name, desc, price, images, mfg, part_type, url, id}
        })
        return {
            headers: {
                'Access-Control-Allow-Origin' : '*'
            },
            statusCode: 200,
            body: JSON.stringify(parts)
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: 'There was a server error'
        }
    }
}