'use strict';

const bulkRecipient = require('../message/bulkRecipient');
const toMergeData = require('../helpers/toMergeData');

/**
 * Convert an object to an bulkRecipient
 */
class ToBulkRecipient {
    
    /**
     * Convert an object to an bulkRecipient
     * @param  {object} value - value to convert to an bulkRecipient
     * @returns {bulkRecipient} bulkRecipient Type
     */
    static convert(value) {
        if (typeof value === 'undefined' || !value) {
            return;
        }
        else if (value.constructor === bulkRecipient) {
            checkForDuplicateMergeKeys(value);
            return value;
        }
        else if (typeof value === 'string') {
            return new bulkRecipient(value);
        }
        else if (typeof value === 'object') {
            var e = null,f = null,m = null;            
            if('emailAddress' in value) {
                e = value.emailAddress;
            }
            if('friendlyName' in value) {
                f = value.friendlyName;
            }
            if('mergeData' in value) {
                checkForDuplicateMergeKeys(value);
                m = [];
                value.mergeData.forEach(element => {
                    m.push(toMergeData.convert(element));
                });
            }            
            return new bulkRecipient(e, { friendlyName: f, mergeData: m });
        }
        else {
            throw new Error("Invalid bulk recipient, the bulk recipient was not submitted in an expected format!");
        }
    }


}

function checkForDuplicateMergeKeys(bulkRecipient){
    var keys = bulkRecipient.mergeData.map((mdata) => mdata.key.toLowerCase());
    var duplicateKeys = keys.reduce((acc, curr, i, arr) => {
        if(arr.indexOf(curr) !== i && acc.indexOf(curr) < 0){
            acc.push(curr);
        }
        return acc;
    }, []);
    if(duplicateKeys.length > 0) {
        throw new Error(`Invalid bulk recipient, the bulk recipient contained merge data items with duplicate keys: ${duplicateKeys}.`);
    }
}

module.exports = ToBulkRecipient;