new Vue({
    el: '#app',
    data: {
        minute: 25,
        second: 00,
        setBreak: 05,
        setSession: 25,
        lastMin: 25,
        lastSec: 00,
        counting: false,
        fase: 'Session',
        timerT: '',
        soundUrl: 'http://soundbible.com/mp3/analog-watch-alarm_daniel-simion.mp3'
    },
    methods: {
        reset() {
            this.minute = this.setSession;
            this.second = 00;
            this.lastMin = this.minute;
            this.lastSec = this.second;
            this.counting = false;
            this.fase = "Session";
            clearInterval(this.timerT);
        },
        playPause() {
            if (this.counting) {
                this.counting = false;
                this.lastMin = this.minute;
                this.lastSec = this.second;
                clearInterval(this.timerT);
            } else {
                this.counting = true;
                this.minute = this.lastMin;
                this.second = this.lastSec;
                this.timerT = setInterval(() => {
                    if (this.second > 0)
                        this.second--;
                    else {
                        this.second = 59;
                        this.minute--;
                    }
                    if (this.second == 0 && this.minute == 0) {
                        var audio = new Audio(this.soundUrl);
                        audio.play();
                        if (this.fase == 'Session') {
                            this.fase = 'Break';
                            this.minute = this.setBreak;
                            this.second = 00;
                        } else {
                            this.fase = 'Session';
                            this.minute = this.setSession;
                            this.second = 00;
                        }
                    }
                }, 1000)
            }
        },
        sUp() {
            if (!this.counting) {
                this.setSession++;
                this.lastMin = this.setSession;
                this.minute = this.setSession;
                this.second = 00;
                this.lastSec = 00;
            }
        },
        sDown() {
            if (!this.counting) {
                this.setSession--;
                this.lastMin = this.setSession;
                this.minute = this.setSession;
                this.second = 00;
                this.lastSec = 00;
            }
        },
    },
});
