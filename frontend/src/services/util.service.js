export const utilService = {
    makeId,
    makeLorem,
    getRandomIntInclusive,
    delay,
    timeSince,
    getRandomColor,
    getLabelColors
}

function makeId(length = 6) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return txt;
}

function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn'];
    var txt = '';
    while (size > 0) {
        size--;
        txt += words[Math.floor(Math.random() * words.length)] + ' ';
    }
    return txt;
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

function delay(ms = 1500) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}

function getRandomColor() {
    var lum = -0.25;
    var hex = String('#' + Math.random().toString(16).slice(2, 8).toUpperCase()).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    var rgb = "#",
        c, i;
    for (i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i * 2, 2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        rgb += ("00" + c).substr(c.length);
    }
    return rgb;
}

function timeSince(date) {

    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
        return Math.floor(interval) + ' years';
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + ' months';
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + 'd';
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + 'h';
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + 'm';
    }
    return Math.floor(seconds) + 's';
}

function getLabelColors(){
    return [
        {
          idx: 1,
          bgColor: "rgb(255, 21, 138)",
        },
        {
          idx: 2,
          bgColor: "rgb(187, 51, 84)",
        },
        {
          idx: 3,
          bgColor: "rgb(127, 83, 71)",
        },
        {
          idx: 4,
          bgColor: "rgb(255, 100, 46)",
        },
        {
          idx: 5,
          bgColor: "rgb(255, 203, 0)",
        },
        {
          idx: 6,
          bgColor: "rgb(202, 182, 65)",
        },
        {
          idx: 7,
          bgColor: "rgb(156, 211, 38)",
        },
        {
          idx: 8,
          bgColor: "rgb(0, 200, 117)",
        },
        {
          idx: 9,
          bgColor: "rgb(0, 134, 192)",
        },
        {
          idx: 10,
          bgColor: "rgb(87, 155, 252)",
        },
        {
          idx: 11,
          bgColor: "rgb(102, 204, 255)",
        },
        {
          idx: 12,
          bgColor: "rgb(162, 93, 220)",
        },
        {
          idx: 13,
          bgColor: "rgb(120, 75, 209)",
        },
        {
          idx: 14,
          bgColor: "rgb(128, 128, 128)",
        },
        {
          idx: 15,
          bgColor: "rgb(51, 51, 51)",
        },
        {
          idx: 16,
          bgColor: "rgb(255, 117, 117)",
        },
        {
          idx: 17,
          bgColor: "rgb(250, 161, 241)",
        },
        {
          idx: 18,
          bgColor: "rgb(255, 173, 173)",
        },
        {
          idx: 19,
          bgColor: "rgb(126, 59, 138)",
        },
        {
          idx: 20,
          bgColor: "rgb(154, 173, 189)",
        },
        {
          idx: 21,
          bgColor: "rgb(104, 161, 189)",
        },
        {
          idx: 22,
          bgColor: "rgb(34, 80, 145)",
        },
        {
          idx: 23,
          bgColor: "rgb(78, 204, 198)",
        },
        {
          idx: 24,
          bgColor: "rgb(85, 89, 223)",
        },
        {
          idx: 25,
          bgColor: "rgb(64, 22, 148)",
        },
        {
          idx: 26,
          bgColor: "rgb(86, 62, 62)",
        },
        {
          idx: 27,
          bgColor: "rgb(189, 168, 249)",
        },
        {
          idx: 28,
          bgColor: "rgb(43, 118, 229)",
        },
        {
          idx: 29,
          bgColor: "rgb(169, 190, 232)",
        },
        {
          idx: 30,
          bgColor: "rgb(217, 116, 176)",
        },
        {
          idx: 31,
          bgColor: "rgb(157, 153, 185)",
        },
        {
          idx: 32,
          bgColor: "rgb(173, 150, 122)",
        },
        {
          idx: 33,
          bgColor: "rgb(161, 227, 246)",
        },
        {
          idx: 34,
          bgColor: "rgb(189, 129, 110)",
        },
        {
          idx: 35,
          bgColor: "rgb(23, 90, 99)",
        }
      ];
}
