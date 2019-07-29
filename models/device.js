let mongoose = require('mongoose');

let deviceSchema = mongoose.Schema({
    GUID:{
        type: String,
        required: false
    },
    pcname:{
        type: String,
        required: true
    },
    ipaddress:{

        type: String,
        required: true
    },
    macaddress:{

        type: String,
        required: true
    },
    status:{

        type: String,
        required: true
    },
    timestamp:{
        type: String,
        required: false
    },
    company:{
        type: String,
        required: false
    },
    
    site:{
        type: String,
        required: false
    },
    deviceinfo: {
        windowsversion: {type: String, default: 'Unknown'},
        cpu: {type: String, default: 'Unknown'},
        availablememory: {type: String, default: 'Unknown'},
        exipaddress: {type: String, default: 'Unknown'},
        antivirus: {type: String, default: 'Unknown'},
        deviceuptime: {type: String, default: 'Unknown'},
        lastupdated: {type: String, default: 'Unknown'},
      },
      supportticket: {
        ticketref: String,
      },
      harddrivespace: {
          totalspace: {type: String, default: '0'},
          freespace: {type: String, default: '0'},
          usedspace: {type: String, default: '0'},

      },
      devicestatus: {
        cpu: {type: String, default: '0'},
        memory: {type: String, default: '0'},
        network: {type: String, default: '0'},

    },
    deviceSettings:{
        fileTransfer:{
            type: {type: String},
            path: {type: String, default: 'Disabled'},
            ftStatus: {type: Boolean,  default: false},
        },
    },
    ocslogfile:[String]

    
});

let Device = module.exports = mongoose.model('device', deviceSchema);