const calendarJson = require('../acme-search/calendar.json');
const contactsJson = require('../acme-search/contacts.json');
const dropboxJson = require('../acme-search/dropbox.json');
const slackJson = require('../acme-search/slack.json');
const tweetJson = require('../acme-search/tweet.json');
const calendar = calendarJson.calendar;
const contacts = contactsJson.contacts;
const dropbox = dropboxJson.dropbox;
const slack = slackJson.slack;
const tweet = tweetJson.tweet;

interface Result {
    [key: string]: Array<object>,
}

interface Provider {
    matching_terms: string[],
    isTag: boolean,
    isPin: boolean,
    timestamp?: string,
    created?: string,
    last_contact?: string,
    date?: string,
    Origin: string
}

const jsonArray = (result: Result, arr:Array<Provider>, keyword: string, key: string) => {
    for(let i = 0; i < arr.length; i++) {
        let str: Array<string> = arr[i].matching_terms;
        if(arr[i]['timestamp']) {
            arr[i]['date'] = arr[i]['timestamp'];
            delete arr[i]['timestamp'];
        } else if (arr[i]['created']) {
            arr[i]['date'] = arr[i]['created'];
            delete arr[i]['created'];
        } else if (arr[i]['last_contact']) {
            arr[i]['date'] = arr[i]['last_contact'];
            delete arr[i]['last_contact'];
        }

        arr[i].isTag = false;
        arr[i].isPin = false;
        if(str.some(w => w.toLowerCase().startsWith(keyword))) {
            result[key].push(arr[i]);
        }
        arr[i]['Origin'] = key;
    }
    return result;
}


const handleJsonFile = (keyword: string) => {
    let result: Result = { 
        Calendar: [], 
        Contacts: [], 
        Dropbox: [], 
        Slack: [], 
        Tweet: [] 
    }
    jsonArray(result, calendar, keyword, 'Calendar');
    jsonArray(result, contacts, keyword,'Contacts');
    jsonArray(result, dropbox, keyword, 'Dropbox');
    jsonArray(result, slack, keyword, 'Slack');
    jsonArray(result, tweet, keyword, 'Tweet');
    let resultarray: Array<any> = []
    for(let [key, value] of Object.entries(result)) {
        if (value.length === 0) {
            delete result[key]
        } else {
            resultarray.push(value)
        }
    }
    let resultArray = [].concat.apply([], resultarray);
    return resultArray;
};

export default handleJsonFile;